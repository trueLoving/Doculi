import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled = false }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 text-center rounded-lg border-2 border-dashed transition-all duration-200
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <input {...getInputProps()} />

      {/* 上传图标 */}
      <div className="mb-4">
        <svg
          className={`w-12 h-12 mx-auto ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      {/* 标题 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {isDragActive ? '释放文件到此处' : '拖拽文件到此处或点击选择'}
      </h3>

      {/* 描述 */}
      <p className="text-sm text-gray-500">支持 PDF、DOCX、JPG、PNG 格式</p>
    </div>
  );
};
