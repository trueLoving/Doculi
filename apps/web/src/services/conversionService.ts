import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import Tesseract from 'tesseract.js';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import * as mammoth from 'mammoth';

// 配置 pdfjs-dist - 使用本地 worker 文件
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export interface ConversionOptions {
  watermarkText?: string;
  targetFormat: 'pdf' | 'docx';
}

export interface ConversionResult {
  success: boolean;
  data?: Uint8Array;
  error?: string;
  fileName: string;
}

class ConversionService {
  private tesseractWorker: any = null;

  async initTesseract() {
    if (!this.tesseractWorker) {
      this.tesseractWorker = await Tesseract.createWorker();
    }
    return this.tesseractWorker;
  }

  async terminateTesseract() {
    if (this.tesseractWorker) {
      await this.tesseractWorker.terminate();
      this.tesseractWorker = null;
    }
  }

  // PDF 转 DOCX - 增强版
  async pdfToDocx(file: File): Promise<ConversionResult> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // 使用 pdfjs-dist 加载 PDF
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      
      const sections = [];
      
      // 提取所有页面的文本，保持结构
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        console.log(`页面 ${pageNum} 文本内容:`, textContent.items.length, '个文本项');
        
        // 按行组织文本，保持格式和字体信息
        const textBlocks: Array<{
          text: string;
          fontSize: number;
          fontName: string;
          isBold: boolean;
          isItalic: boolean;
          y: number;
          x: number;
        }> = [];
        
        for (const item of textContent.items) {
          if ('str' in item && 'transform' in item && 'fontName' in item) {
            const transform = item.transform as number[];
            const x = transform[4];
            const y = transform[5];
            const fontSize = Math.abs(transform[0]);
            const fontName = item.fontName as string;
            
            textBlocks.push({
              text: item.str,
              fontSize,
              fontName,
              isBold: fontName.toLowerCase().includes('bold'),
              isItalic: fontName.toLowerCase().includes('italic'),
              y,
              x
            });
          }
        }
        
        // 按Y坐标分组，形成行
        const lines: Array<{
          text: string;
          fontSize: number;
          fontName: string;
          isBold: boolean;
          isItalic: boolean;
          y: number;
          x: number;
        }>[] = [];
        
        // 按Y坐标排序并分组
        textBlocks.sort((a, b) => b.y - a.y); // 从上到下排序
        
        let currentLine: typeof textBlocks = [];
        let lastY = textBlocks[0]?.y || 0;
        
        for (const block of textBlocks) {
          if (Math.abs(block.y - lastY) > 3) {
            if (currentLine.length > 0) {
              lines.push(currentLine);
            }
            currentLine = [block];
          } else {
            currentLine.push(block);
          }
          lastY = block.y;
        }
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        
        console.log(`页面 ${pageNum} 提取到 ${lines.length} 行文本`);
        
        // 将行转换为段落，保留格式
        if (lines.length > 0) {
          // 添加页面标题
          sections.push({
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(`第 ${pageNum} 页`)],
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER
              })
            ]
          });
          
          // 添加内容段落，保留格式
          for (const line of lines) {
            if (line.length > 0) {
              // 按X坐标排序，保持水平顺序
              line.sort((a, b) => a.x - b.x);
              
              // 创建文本运行，保留格式
              const textRuns = line.map(block => {
                const runOptions: any = {
                  text: block.text
                };
                
                // 设置字体大小（转换为Word的点数）
                if (block.fontSize > 0) {
                  runOptions.size = Math.round(block.fontSize * 0.75); // PDF单位转Word点数
                }
                
                // 设置粗体
                if (block.isBold) {
                  runOptions.bold = true;
                }
                
                // 设置斜体
                if (block.isItalic) {
                  runOptions.italics = true;
                }
                
                return new TextRun(runOptions);
              });
              
              // 检测是否为标题（基于字体大小和位置）
              const avgFontSize = line.reduce((sum, block) => sum + block.fontSize, 0) / line.length;
              const isHeading = avgFontSize > 14 || line.some(block => block.isBold);
              
              sections.push({
                properties: {},
                children: [
                  new Paragraph({
                    children: textRuns,
                    alignment: AlignmentType.LEFT,
                    heading: isHeading ? HeadingLevel.HEADING_3 : undefined
                  })
                ]
              });
            }
          }
          
          // 添加页面分隔
          sections.push({
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun('')]
              })
            ]
          });
        }
      }
      
      // 如果没有提取到文本，提供默认内容
      if (sections.length === 0) {
        sections.push({
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun('PDF文档内容（无法提取文本，可能是扫描件或图片格式）')],
              alignment: AlignmentType.CENTER
            })
          ]
        });
      }

      const doc = new Document({
        sections,
        creator: "DocuSynapse",
        title: file.name.replace(/\.pdf$/i, ''),
        description: "由DocuSynapse智能转换生成"
      });

      // 在浏览器环境中使用 toBlob
      const docBlob = await Packer.toBlob(doc);
      const docArrayBuffer = await docBlob.arrayBuffer();
      const fileName = file.name.replace(/\.pdf$/i, '.docx');
      
      return {
        success: true,
        data: new Uint8Array(docArrayBuffer),
        fileName
      };
    } catch (error) {
      return {
        success: false,
        error: `PDF转DOCX失败: ${error}`,
        fileName: file.name
      };
    }
  }

  // DOCX 转 PDF（带水印）- 增强版
  async docxToPdf(file: File, options: ConversionOptions): Promise<ConversionResult> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // 使用 mammoth 解析 DOCX 文件
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;
      
      // 创建 PDF 文档
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // 解析 HTML 内容并转换为 PDF
      const lines = htmlContent
        .replace(/<[^>]*>/g, '') // 移除 HTML 标签
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.trim());
      
      let currentPage = pdfDoc.addPage([595.28, 841.89]); // A4尺寸
      let yPosition = 750;
      const lineHeight = 15;
      const pageHeight = 750;
      const margin = 50;
      
      for (const line of lines) {
        // 检查是否需要新页面
        if (yPosition < margin) {
          currentPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = pageHeight;
        }
        
        // 添加文本到当前页面
        currentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
        
        yPosition -= lineHeight;
      }
      
      // 为所有页面添加水印
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        if (options.watermarkText) {
          const { width, height } = page.getSize();
          
          // 添加半透明水印
          page.drawText(options.watermarkText, {
            x: width / 2 - (options.watermarkText.length * 6),
            y: height / 2,
            size: 20,
            font: boldFont,
            color: rgb(0.8, 0.8, 0.8),
          });
          
          // 添加页脚水印
          page.drawText(`DocuSynapse - ${options.watermarkText}`, {
            x: margin,
            y: 30,
            size: 8,
            font: font,
            color: rgb(0.6, 0.6, 0.6),
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const fileName = file.name.replace(/\.docx$/i, '.pdf');
      
      return {
        success: true,
        data: pdfBytes,
        fileName
      };
    } catch (error) {
      return {
        success: false,
        error: `DOCX转PDF失败: ${error}`,
        fileName: file.name
      };
    }
  }

  // 扫描件OCR转PDF
  async imageToPdf(file: File): Promise<ConversionResult> {
    try {
      const worker = await this.initTesseract();
      
      const { data: { text } } = await worker.recognize(file);
      
      // 创建包含OCR文本的PDF
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      let currentPage = pdfDoc.addPage([595.28, 841.89]);
      let yPosition = 750;
      const lineHeight = 15;
      const pageHeight = 750;
      const margin = 50;
      
      // 添加标题
      currentPage.drawText('OCR识别结果', {
        x: margin,
        y: yPosition,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      yPosition -= 30;
      
      // 添加原始文件名
      currentPage.drawText(`原始文件: ${file.name}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      });
      yPosition -= 20;
      
      // 将OCR文本添加到PDF
      const lines = text.split('\n').filter((line: string) => line.trim());
      
      for (const line of lines) {
        // 检查是否需要新页面
        if (yPosition < margin) {
          currentPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = pageHeight;
        }
        
        currentPage.drawText(line, {
          x: margin,
          y: yPosition,
          size: 10,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }
      
      // 添加页脚信息
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        page.drawText('DocuSynapse OCR转换', {
          x: margin,
          y: 30,
          size: 8,
          font: font,
          color: rgb(0.6, 0.6, 0.6),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const fileName = file.name.replace(/\.(jpg|jpeg|png)$/i, '_ocr.pdf');
      
      return {
        success: true,
        data: pdfBytes,
        fileName
      };
    } catch (error) {
      return {
        success: false,
        error: `OCR转换失败: ${error}`,
        fileName: file.name
      };
    }
  }

  // 检测身份证号
  detectIdCard(text: string): boolean {
    const idCardPattern = /\d{17}[\dX]/;
    return idCardPattern.test(text);
  }

  async convertFile(file: File, options: ConversionOptions): Promise<ConversionResult> {
    try {
      const fileExtension = file.name.toLowerCase().split('.').pop();
      
      switch (fileExtension) {
        case 'pdf':
          if (options.targetFormat === 'docx') {
            return await this.pdfToDocx(file);
          }
          break;
        case 'docx':
          if (options.targetFormat === 'pdf') {
            return await this.docxToPdf(file, options);
          }
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
          if (options.targetFormat === 'pdf') {
            return await this.imageToPdf(file);
          }
          break;
        default:
          return {
            success: false,
            error: `不支持的文件格式: ${fileExtension}`,
            fileName: file.name
          };
      }
      
      return {
        success: false,
        error: '不支持此转换类型',
        fileName: file.name
      };
    } catch (error) {
      return {
        success: false,
        error: `转换失败: ${error}`,
        fileName: file.name
      };
    }
  }

  async detectSensitiveContent(text: string): Promise<boolean> {
    return this.detectIdCard(text);
  }

  downloadFile(data: Uint8Array, fileName: string) {
    const buffer = data.buffer instanceof ArrayBuffer ? data.buffer : new ArrayBuffer(data.length);
    if (!(data.buffer instanceof ArrayBuffer)) {
      const view = new Uint8Array(buffer);
      view.set(data);
    }
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }

  async cleanup() {
    await this.terminateTesseract();
  }
}

export const conversionService = new ConversionService();