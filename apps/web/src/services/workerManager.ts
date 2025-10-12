// 简化的Worker Manager - 暂时禁用Web Workers以避免导入问题
export interface WorkerTask {
  id: string;
  type: 'CONVERT_FILE' | 'OCR_RECOGNIZE' | 'DETECT_SENSITIVE';
  data: any;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

class WorkerManager {
  // 暂时禁用Web Workers，直接使用主线程
  async executeTask(type: WorkerTask['type'], data: any): Promise<any> {
    // 直接在主线程中执行，避免Web Worker的复杂性
    const { conversionService } = await import('./conversionService');
    
    switch (type) {
      case 'CONVERT_FILE':
        return await conversionService.convertFile(data.file, data.options);
      case 'OCR_RECOGNIZE':
        return await conversionService.imageToPdf(data.imageFile);
      case 'DETECT_SENSITIVE':
        return { hasSensitive: await conversionService.detectSensitiveContent(data.text) };
      default:
        throw new Error('Unknown operation type');
    }
  }

  async convertFile(file: File, options: any): Promise<any> {
    return this.executeTask('CONVERT_FILE', { file, options });
  }

  async ocrRecognize(imageFile: File): Promise<any> {
    return this.executeTask('OCR_RECOGNIZE', { imageFile });
  }

  async detectSensitiveContent(text: string): Promise<any> {
    return this.executeTask('DETECT_SENSITIVE', { text });
  }

  terminate() {
    // 暂时不需要清理
  }
}

export const workerManager = new WorkerManager();
