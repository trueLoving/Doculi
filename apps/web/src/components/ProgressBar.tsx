import React from 'react';

interface ProgressBarProps {
  progress: number;
  message?: string;
  variant?: 'circular' | 'linear';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  message = '处理中...', 
  variant = 'circular' 
}) => {
  if (variant === 'linear') {
    return (
      <div className="w-full mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 flex-1">
            {message}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      {/* 圆形进度条 */}
      <div className="relative inline-flex mb-4">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
          {/* 背景圆环 */}
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* 进度圆环 */}
          <path
            className="text-blue-600"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* 百分比文字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      
      {/* 消息文字 */}
      <p className="text-sm text-gray-600">
        {message}
      </p>
    </div>
  );
};
