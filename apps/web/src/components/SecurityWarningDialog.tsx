import React from 'react';

interface SecurityWarningDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SecurityWarningDialog: React.FC<SecurityWarningDialogProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* 对话框 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* 标题栏 */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <div className="flex items-center">
              {/* 警告图标 */}
              <svg className="w-6 h-6 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">安全警告</h3>
            </div>
          </div>
          
          {/* 内容区域 */}
          <div className="p-6">
            {/* 警告提示 */}
            <div className="alert-warning mb-4">
              检测到文档中包含身份证号码等敏感信息
            </div>
            
            <p className="text-gray-700 mb-4">
              为了确保数据安全，系统已自动拦截此文档的下载操作。
            </p>
            
            <p className="text-sm text-gray-600">
              请确认您有权限处理此类敏感文档，并确保遵守相关数据保护法规。
            </p>
          </div>
          
          {/* 按钮区域 */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="btn-secondary"
            >
              取消下载
            </button>
            <button
              onClick={onConfirm}
              className="btn-warning"
            >
              确认下载
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
