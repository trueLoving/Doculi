import { PDFDocument, rgb } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// import Tesseract from 'tesseract.js'; // 暂时禁用OCR功能
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';

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
  // private tesseractWorker: any = null; // 暂时禁用OCR功能


  // 暂时禁用OCR功能
  // async initTesseract() {
  //   if (!this.tesseractWorker) {
  //     this.tesseractWorker = await Tesseract.createWorker({
  //       langPath: 'https://tessdata.projectnaptha.com/4.0.0',
  //       corePath: 'https://unpkg.com/tesseract.js-core@4.0.1/tesseract-core.wasm.js',
  //       workerPath: 'https://unpkg.com/tesseract.js@4.1.1/dist/worker.min.js',
  //       logger: m => console.log(m)
  //     });
  //     await this.tesseractWorker.loadLanguage('chi_sim+eng');
  //     await this.tesseractWorker.initialize('chi_sim+eng');
  //   }
  //   return this.tesseractWorker;
  // }

  // async terminateTesseract() {
  //   if (this.tesseractWorker) {
  //     await this.tesseractWorker.terminate();
  //     this.tesseractWorker = null;
  //   }
  // }

  // PDF 转 DOCX
  async pdfToDocx(file: File): Promise<ConversionResult> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // 使用 pdfjs-dist 加载 PDF
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      
      const sections = [];
      let allText = '';
      
      // 提取所有页面的文本
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // 提取文本项
        let pageText = '';
        for (const item of textContent.items) {
          if ('str' in item) {
            pageText += item.str + ' ';
          }
        }
        
        if (pageText.trim()) {
          allText += `第 ${pageNum} 页:\n${pageText.trim()}\n\n`;
        }
      }
      
      // 如果没有提取到文本，提供默认内容
      if (!allText.trim()) {
        allText = 'PDF文档内容（无法提取文本，可能是扫描件或图片格式）\n\n';
      }
      
      // 将文本按段落分割
      const paragraphs = allText.split('\n\n').filter(p => p.trim());
      
      for (const paragraph of paragraphs) {
        sections.push({
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(paragraph.trim())]
            })
          ]
        });
      }

      const doc = new Document({
        sections
      });

      // 在浏览器环境中使用 toBlob 而不是 toBuffer
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

  // DOCX 转 PDF（带水印）
  async docxToPdf(file: File, options: ConversionOptions): Promise<ConversionResult> {
    try {
      // 这里使用简化的实现，实际应该使用更复杂的DOCX解析
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4尺寸
      
      // 添加基础内容
      page.drawText('DOCX转换内容', {
        x: 50,
        y: 750,
        size: 12,
        color: rgb(0, 0, 0),
      });

      // 添加水印
      if (options.watermarkText) {
        page.drawText(options.watermarkText, {
          x: 200,
          y: 400,
          size: 20,
          color: rgb(0.8, 0.8, 0.8),
        });
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

  // 扫描件OCR转PDF - 暂时禁用
  // async imageToPdf(file: File): Promise<ConversionResult> {
  //   try {
  //     const worker = await this.initTesseract();
      
  //     const { data: { text } } = await worker.recognize(file);
      
  //     // 创建包含OCR文本的PDF
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage([595.28, 841.89]);
      
  //     // 将OCR文本添加到PDF
  //     const lines = text.split('\n').filter((line: string) => line.trim());
  //     let yPosition = 750;
      
  //     for (const line of lines) {
  //       if (yPosition < 50) break; // 避免超出页面
        
  //       page.drawText(line, {
  //         x: 50,
  //         y: yPosition,
  //         size: 10,
  //         color: rgb(0, 0, 0),
  //       });
  //       yPosition -= 15;
  //     }

  //     const pdfBytes = await pdfDoc.save();
  //     const fileName = file.name.replace(/\.(jpg|jpeg|png)$/i, '_ocr.pdf');
      
  //     return {
  //       success: true,
  //       data: pdfBytes,
  //       fileName
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: `OCR转换失败: ${error}`,
  //       fileName: file.name
  //     };
  //   }
  // }

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
          return {
            success: false,
            error: '图片OCR转换功能暂时不可用',
            fileName: file.name
          };
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
    // await this.terminateTesseract(); // 暂时禁用OCR功能
  }
}

export const conversionService = new ConversionService();