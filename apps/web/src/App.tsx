import { useState, useCallback, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProgressBar } from './components/ProgressBar';
import { SecurityWarningDialog } from './components/SecurityWarningDialog';
import { conversionService, type ConversionOptions } from './services/conversionService';
import { workerManager } from './services/workerManager';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'pdf' | 'docx'>('pdf');
  const [watermarkText, setWatermarkText] = useState('Confidential');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{data: Uint8Array, fileName: string} | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
    setSuccess(null);
    
    // 根据文件类型自动设置目标格式
    const extension = file.name.toLowerCase().split('.').pop();
    if (extension === 'pdf') {
      setTargetFormat('docx');
    } else if (extension === 'docx') {
      setTargetFormat('pdf');
    } else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
      setTargetFormat('pdf');
    }
  }, []);

  const simulateProgress = useCallback(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 200);
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setSuccess(null);
    
    // 开始进度模拟
    simulateProgress();
    setProgressMessage('正在处理文件...');

    try {
      const options: ConversionOptions = {
        targetFormat,
        watermarkText: targetFormat === 'pdf' ? watermarkText : undefined
      };

      // 使用Web Worker进行转换
      const result = await workerManager.convertFile(selectedFile, options);

      if (result.success && result.data) {
        // 检查是否包含敏感信息
        const hasSensitiveContent = await workerManager.detectSensitiveContent(
          selectedFile.name + ' ' + watermarkText
        );

        if (hasSensitiveContent.hasSensitive) {
          setPendingDownload({ data: result.data, fileName: result.fileName });
          setShowSecurityDialog(true);
        } else {
          conversionService.downloadFile(result.data, result.fileName);
          setSuccess(`文件转换成功！已下载 ${result.fileName}`);
        }
      } else {
        setError(result.error || '转换失败');
      }
    } catch (err) {
      setError(`转换过程中发生错误: ${err}`);
    } finally {
      setIsProcessing(false);
      setProgress(100);
      setProgressMessage('处理完成');
    }
  }, [selectedFile, targetFormat, watermarkText, simulateProgress]);

  const handleSecurityConfirm = useCallback(() => {
    if (pendingDownload) {
      conversionService.downloadFile(pendingDownload.data, pendingDownload.fileName);
      setSuccess(`文件转换成功！已下载 ${pendingDownload.fileName}`);
      setPendingDownload(null);
    }
    setShowSecurityDialog(false);
  }, [pendingDownload]);

  const handleSecurityCancel = useCallback(() => {
    setShowSecurityDialog(false);
    setPendingDownload(null);
    setError('下载已取消：检测到敏感信息');
  }, []);

  const getFileTypeDescription = () => {
    if (!selectedFile) return '';
    const extension = selectedFile.name.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'PDF文档';
      case 'docx':
        return 'Word文档';
      case 'jpg':
      case 'jpeg':
        return 'JPEG图片';
      case 'png':
        return 'PNG图片';
      default:
        return '未知格式';
    }
  };

  // 清理资源
  useEffect(() => {
    return () => {
      workerManager.terminate();
      conversionService.cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="card p-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">
              DocuSynapse
            </h1>
            <p className="text-lg text-gray-600">
              智能文档转换平台 - 支持PDF、DOCX、扫描件互转
            </p>
          </div>

          {/* 文件上传区域 */}
          <div className="mb-8">
            <FileUpload 
              onFileSelect={handleFileSelect} 
              disabled={isProcessing}
            />
          </div>

          {/* 文件信息卡片 */}
          {selectedFile && (
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                文件信息
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">文件名:</span> {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">文件类型:</span> {getFileTypeDescription()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">文件大小:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* 转换选项 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                目标格式
              </label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value as 'pdf' | 'docx')}
                disabled={isProcessing}
                className="select-field"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
              </select>
            </div>

            {targetFormat === 'pdf' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  水印文字
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  disabled={isProcessing}
                  className="input-field"
                  placeholder="输入水印文字"
                />
              </div>
            )}
          </div>

          {/* 进度条 */}
          {isProcessing && (
            <div className="mb-6">
              <ProgressBar 
                progress={progress} 
                message={progressMessage}
                variant="linear"
              />
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="alert-error mb-6">
              {error}
            </div>
          )}

          {/* 成功提示 */}
          {success && (
            <div className="alert-success mb-6">
              {success}
            </div>
          )}

          {/* 转换按钮 */}
          <div className="text-center">
            <button
              onClick={handleConvert}
              disabled={!selectedFile || isProcessing}
              className="btn-primary text-lg px-8 py-3"
            >
              {isProcessing ? '转换中...' : '开始转换'}
            </button>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-200 my-8" />

          {/* 特性说明 */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              🔒 本地处理，数据不上传服务器 | 🚀 WASM技术，高性能转换 | 🛡️ 智能安全检测
            </p>
          </div>
        </div>

        {/* 安全警告对话框 */}
        <SecurityWarningDialog
          open={showSecurityDialog}
          onClose={() => setShowSecurityDialog(false)}
          onConfirm={handleSecurityConfirm}
          onCancel={handleSecurityCancel}
        />
      </div>
    </div>
  );
}

export default App;
