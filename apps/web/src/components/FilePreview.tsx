import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// 配置 pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface FilePreviewProps {
  file: File;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  const [previewType, setPreviewType] = useState<
    'loading' | 'pdf' | 'image' | 'docx' | 'unsupported'
  >('loading');
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    const fileExtension = file.name.toLowerCase().split('.').pop();

    switch (fileExtension) {
      case 'pdf':
        setPreviewType('pdf');
        loadPdfPreview();
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
        setPreviewType('image');
        loadImagePreview();
        break;
      case 'docx':
        setPreviewType('docx');
        break;
      default:
        setPreviewType('unsupported');
    }

    // 清理函数
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [file]);

  const loadPdfPreview = async () => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      const pages: string[] = [];

      // 渲染前几页作为预览（最多3页）
      const maxPreviewPages = Math.min(numPages, 3);

      for (let pageNum = 1; pageNum <= maxPreviewPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('无法获取canvas上下文');
        }
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          canvas: canvas,
          viewport: viewport,
        }).promise;

        pages.push(canvas.toDataURL());
      }

      setPdfPages(pages);
    } catch (err) {
      setError('PDF预览加载失败');
      console.error('PDF预览错误:', err);
    }
  };

  const loadImagePreview = () => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (previewType === 'pdf' && pdfPages.length > 1) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          setCurrentPage(Math.max(0, currentPage - 1));
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          setCurrentPage(Math.min(pdfPages.length - 1, currentPage + 1));
        }
      }

      if (previewType === 'image') {
        if (event.key === '+' || event.key === '=') {
          event.preventDefault();
          setImageScale((prev) => Math.min(prev + 0.2, 3));
        } else if (event.key === '-') {
          event.preventDefault();
          setImageScale((prev) => Math.max(prev - 0.2, 0.5));
        } else if (event.key === '0') {
          event.preventDefault();
          setImageScale(1);
        }
      }

      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewType, pdfPages.length, currentPage, onClose]);

  const renderPdfPreview = () => {
    if (pdfPages.length === 0) {
      return (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">正在加载PDF预览...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* PDF页面预览 */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <img
            src={pdfPages[currentPage]}
            alt={`PDF第${currentPage + 1}页`}
            className="max-w-full h-auto mx-auto shadow-sm rounded"
          />
        </div>

        {/* 页面导航 */}
        {pdfPages.length > 1 && (
          <div className="flex items-center justify-center space-x-4 bg-gray-50 p-3 rounded-lg">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>上一页</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                第 {currentPage + 1} 页，共 {pdfPages.length} 页
              </span>
              {pdfPages.length > 3 && <span className="text-xs text-gray-400">(预览前3页)</span>}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(pdfPages.length - 1, currentPage + 1))}
              disabled={currentPage === pdfPages.length - 1}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
            >
              <span>下一页</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* 键盘提示 */}
        {pdfPages.length > 1 && (
          <div className="text-center text-xs text-gray-400 mt-2">
            使用方向键或点击按钮切换页面，按 ESC 键关闭预览
          </div>
        )}
      </div>
    );
  };

  const renderImagePreview = () => {
    if (!imageUrl) {
      return (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">正在加载图片预览...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* 缩放控制 */}
        <div className="flex items-center justify-center space-x-4 bg-gray-50 p-3 rounded-lg">
          <button
            onClick={() => setImageScale((prev) => Math.max(prev - 0.2, 0.5))}
            disabled={imageScale <= 0.5}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            <span>缩小</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">缩放: {Math.round(imageScale * 100)}%</span>
            <button
              onClick={() => setImageScale(1)}
              className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-xs"
            >
              重置
            </button>
          </div>

          <button
            onClick={() => setImageScale((prev) => Math.min(prev + 0.2, 3))}
            disabled={imageScale >= 3}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <span>放大</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* 图片显示 */}
        <div className="bg-white rounded-lg shadow-sm border p-4 overflow-auto max-h-96">
          <img
            src={imageUrl}
            alt={file.name}
            className="mx-auto shadow-sm rounded transition-transform duration-200"
            style={{
              transform: `scale(${imageScale})`,
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* 键盘提示 */}
        <div className="text-center text-xs text-gray-400">
          使用 +/- 键缩放图片，按 0 重置缩放，按 ESC 键关闭预览
        </div>
      </div>
    );
  };

  const renderDocxPreview = () => {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Word文档预览</h3>
          <p className="text-gray-500 mb-4">DOCX文件暂不支持在线预览</p>
          <p className="text-sm text-gray-400">请下载文件后使用Microsoft Word或其他兼容软件打开</p>
        </div>
      </div>
    );
  };

  const renderUnsupportedPreview = () => {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">不支持的文件格式</h3>
          <p className="text-gray-500">此文件格式暂不支持预览</p>
        </div>
      </div>
    );
  };

  const renderPreviewContent = () => {
    if (error) {
      return (
        <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-400">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2M12,4.5L11.5,7.5L8.5,8L11.5,8.5L12,11.5L12.5,8.5L15.5,8L12.5,7.5L12,4.5Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">预览失败</h3>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      );
    }

    switch (previewType) {
      case 'pdf':
        return renderPdfPreview();
      case 'image':
        return renderImagePreview();
      case 'docx':
        return renderDocxPreview();
      case 'unsupported':
        return renderUnsupportedPreview();
      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">正在加载预览...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">文件预览</h2>
            <p className="text-sm text-gray-500">{file.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 预览内容 */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">{renderPreviewContent()}</div>

        {/* 底部信息 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">文件大小:</span> {(file.size / 1024 / 1024).toFixed(2)}{' '}
              MB
            </div>
            <div>
              <span className="font-medium">文件类型:</span> {file.type || '未知'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
