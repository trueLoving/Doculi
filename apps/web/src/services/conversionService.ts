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
          width: number;
          height: number;
          color?: string;
        }> = [];
        
        for (const item of textContent.items) {
          if ('str' in item && 'transform' in item && 'fontName' in item) {
            const transform = item.transform as number[];
            const x = transform[4];
            const y = transform[5];
            const fontSize = Math.abs(transform[0]);
            const fontName = item.fontName as string;
            
            // 更准确的字体样式检测
            const isBold = this.detectBoldFont(fontName, fontSize);
            const isItalic = this.detectItalicFont(fontName);
            
            textBlocks.push({
              text: item.str,
              fontSize,
              fontName,
              isBold,
              isItalic,
              y,
              x,
              width: item.width || 0,
              height: item.height || fontSize,
              color: this.extractTextColor(item)
            });
          }
        }
        
        // 改进的行和段落识别算法
        const lines = this.groupTextIntoLines(textBlocks);
        const paragraphs = this.groupLinesIntoParagraphs(lines);
        
        console.log(`页面 ${pageNum} 提取到 ${lines.length} 行文本，${paragraphs.length} 个段落`);
        
        // 将段落转换为Word文档，保留格式
        if (paragraphs.length > 0) {
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
          
          // 处理每个段落
          for (const paragraph of paragraphs) {
            if (paragraph.length > 0) {
              // 检测是否为表格
              if (this.detectTableStructure(paragraph)) {
                // 创建表格段落（简化处理）
                const tableParagraph = this.createTableParagraph(paragraph);
                if (tableParagraph) {
                  sections.push({
                    properties: {},
                    children: [tableParagraph]
                  });
                }
              } else {
                // 创建普通段落
                const paragraphElement = this.createParagraphFromLines(paragraph);
                if (paragraphElement) {
                  sections.push({
                    properties: {},
                    children: [paragraphElement]
                  });
                }
              }
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
        creator: "Doculi",
        title: file.name.replace(/\.pdf$/i, ''),
        description: "由Doculi智能转换生成"
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
          page.drawText(`Doculi - ${options.watermarkText}`, {
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
        page.drawText('Doculi OCR转换', {
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

  // 检测粗体字体
  private detectBoldFont(fontName: string, fontSize: number): boolean {
    const name = fontName.toLowerCase();
    return name.includes('bold') || 
           name.includes('black') || 
           name.includes('heavy') ||
           name.includes('demibold') ||
           name.includes('semibold') ||
           (fontSize > 14 && name.includes('regular')); // 大字体可能是标题
  }

  // 检测斜体字体
  private detectItalicFont(fontName: string): boolean {
    const name = fontName.toLowerCase();
    return name.includes('italic') || 
           name.includes('oblique') ||
           name.includes('slanted');
  }

  // 提取文本颜色
  private extractTextColor(item: any): string | undefined {
    if (item.transform && item.transform.length >= 6) {
      // 检查是否有颜色信息
      const transform = item.transform;
      if (transform.length > 6) {
        // 如果有颜色信息，提取RGB值
        const r = Math.round(transform[6] * 255);
        const g = Math.round(transform[7] * 255);
        const b = Math.round(transform[8] * 255);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
    }
    return undefined;
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

  // 将文本块分组为行
  private groupTextIntoLines(textBlocks: any[]): any[][] {
    if (textBlocks.length === 0) return [];
    
    // 按Y坐标排序并分组
    textBlocks.sort((a, b) => b.y - a.y); // 从上到下排序
    
    const lines: any[][] = [];
    let currentLine: any[] = [];
    let lastY = textBlocks[0]?.y || 0;
    
    for (const block of textBlocks) {
      // 使用更智能的行间距检测
      const lineHeight = block.height || block.fontSize;
      const tolerance = Math.max(3, lineHeight * 0.3);
      
      if (Math.abs(block.y - lastY) > tolerance) {
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
    
    return lines;
  }

  // 将行分组为段落
  private groupLinesIntoParagraphs(lines: any[][]): any[][] {
    if (lines.length === 0) return [];
    
    const paragraphs: any[][] = [];
    let currentParagraph: any[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1];
      
      // 按X坐标排序，保持水平顺序
      line.sort((a, b) => a.x - b.x);
      
      currentParagraph.push(line);
      
      // 检测段落结束条件
      const isParagraphEnd = this.isParagraphEnd(line, nextLine);
      
      if (isParagraphEnd || i === lines.length - 1) {
        paragraphs.push([...currentParagraph]);
        currentParagraph = [];
      }
    }
    
    return paragraphs;
  }

  // 检测段落结束
  private isParagraphEnd(currentLine: any[], nextLine?: any[]): boolean {
    if (!nextLine || nextLine.length === 0) return true;
    
    // 检查缩进变化（新段落通常有不同缩进）
    const currentIndent = this.getLineIndent(currentLine);
    const nextIndent = this.getLineIndent(nextLine);
    
    // 检查字体大小变化（标题通常字体更大）
    const currentFontSize = this.getAverageFontSize(currentLine);
    const nextFontSize = this.getAverageFontSize(nextLine);
    
    // 检查是否为列表项
    const isCurrentListItem = this.isListItem(currentLine);
    const isNextListItem = this.isListItem(nextLine);
    
    // 段落结束条件
    return (
      Math.abs(currentIndent - nextIndent) > 20 || // 缩进变化大
      Math.abs(currentFontSize - nextFontSize) > 2 || // 字体大小变化大
      (isCurrentListItem && !isNextListItem) || // 列表项结束
      (!isCurrentListItem && isNextListItem) // 开始新的列表
    );
  }

  // 获取行缩进
  private getLineIndent(line: any[]): number {
    if (line.length === 0) return 0;
    return Math.min(...line.map(block => block.x));
  }

  // 获取平均字体大小
  private getAverageFontSize(line: any[]): number {
    if (line.length === 0) return 12;
    return line.reduce((sum, block) => sum + block.fontSize, 0) / line.length;
  }

  // 检测是否为列表项
  private isListItem(line: any[]): boolean {
    if (line.length === 0) return false;
    
    const firstBlock = line[0];
    const text = firstBlock.text.trim();
    
    // 检测列表标记
    const listPatterns = [
      /^[\d]+[\.\)]\s/, // 数字列表 1. 或 1)
      /^[a-zA-Z][\.\)]\s/, // 字母列表 a. 或 a)
      /^[•·▪▫]\s/, // 项目符号
      /^[-*+]\s/, // 破折号列表
      /^[\u2022\u2023\u25E6\u2043]\s/ // Unicode 项目符号
    ];
    
    return listPatterns.some(pattern => pattern.test(text));
  }

  // 从行创建段落
  private createParagraphFromLines(lines: any[][]): Paragraph | null {
    if (lines.length === 0) return null;
    
    const allTextRuns: TextRun[] = [];
    let paragraphIndent = 0;
    let paragraphAlignment = AlignmentType.LEFT;
    let paragraphHeading: typeof HeadingLevel[keyof typeof HeadingLevel] | undefined;
    
    for (const line of lines) {
      if (line.length === 0) continue;
      
      // 按X坐标排序，保持水平顺序
      line.sort((a, b) => a.x - b.x);
      
      // 计算段落缩进（使用第一行的缩进）
      if (paragraphIndent === 0) {
        paragraphIndent = this.getLineIndent(line);
      }
      
      // 创建文本运行，保留格式
      const lineTextRuns = line.map(block => {
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
        
        // 设置颜色
        if (block.color) {
          runOptions.color = block.color;
        }
        
        return new TextRun(runOptions);
      });
      
      allTextRuns.push(...lineTextRuns);
      
      // 如果不是最后一行，添加换行
      if (lines.indexOf(line) < lines.length - 1) {
        allTextRuns.push(new TextRun({ text: ' ', break: 1 }));
      }
    }
    
    // 检测段落类型和样式
    const firstLine = lines[0];
    const avgFontSize = this.getAverageFontSize(firstLine);
    const hasBoldText = firstLine.some(block => block.isBold);
    
    // 确定段落标题级别
    if (avgFontSize > 16 || (avgFontSize > 14 && hasBoldText)) {
      paragraphHeading = HeadingLevel.HEADING_1;
    } else if (avgFontSize > 14 || hasBoldText) {
      paragraphHeading = HeadingLevel.HEADING_2;
    } else if (avgFontSize > 12) {
      paragraphHeading = HeadingLevel.HEADING_3;
    }
    
    // 确定段落对齐方式
    const indent = this.getLineIndent(firstLine);
    if (indent > 50) {
      paragraphAlignment = AlignmentType.LEFT; // 缩进大的可能是引用或特殊段落
    }
    
    return new Paragraph({
      children: allTextRuns,
      alignment: paragraphAlignment,
      heading: paragraphHeading,
      indent: {
        left: Math.max(0, paragraphIndent * 0.75) // 转换为Word单位
      }
    });
  }

  // 检测表格结构
  private detectTableStructure(lines: any[][]): boolean {
    if (lines.length < 2) return false;
    
    // 检查是否有多个列对齐
    const columnPositions = new Set<number>();
    
    for (const line of lines) {
      for (const block of line) {
        // 收集X坐标，看是否有列对齐
        columnPositions.add(Math.round(block.x / 10) * 10); // 10像素容差
      }
    }
    
    // 如果有3个或更多列位置，可能是表格
    return columnPositions.size >= 3;
  }

  // 创建表格段落
  private createTableParagraph(lines: any[][]): Paragraph | null {
    if (lines.length === 0) return null;
    
    // 收集所有列位置
    const columnPositions = new Set<number>();
    for (const line of lines) {
      for (const block of line) {
        columnPositions.add(Math.round(block.x / 10) * 10);
      }
    }
    
    const sortedColumns = Array.from(columnPositions).sort((a, b) => a - b);
    
    // 为每行创建表格文本
    const tableRows: string[] = [];
    
    for (const line of lines) {
      const rowCells: string[] = [];
      
      // 按列位置分组文本
      for (const colPos of sortedColumns) {
        const cellTexts = line
          .filter(block => Math.abs(block.x - colPos) <= 10)
          .map(block => block.text)
          .join('');
        
        rowCells.push(cellTexts || ' ');
      }
      
      tableRows.push(rowCells.join(' | '));
    }
    
    // 创建表格样式的段落
    const tableText = tableRows.join('\n');
    
    return new Paragraph({
      children: [new TextRun({
        text: tableText,
        size: 10,
        font: 'Courier New' // 等宽字体更适合表格
      })],
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 200 // 表格后增加间距
      }
    });
  }

  async cleanup() {
    await this.terminateTesseract();
  }
}

export const conversionService = new ConversionService();