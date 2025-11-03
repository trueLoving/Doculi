import React from 'react';
import MetricCard from './MetricCard';
import ActionCard from './ActionCard';
import FeatureCard from './FeatureCard';

interface DashboardProps {
  onActionClick?: (action: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onActionClick }) => {
  const metrics = [
    { title: '文档转换', value: 0, icon: '📄' },
    { title: '转换记录', value: 0, icon: '📋' },
    { title: 'OCR识别', value: 0, icon: '👁️' },
    { title: '处理任务', value: 0, icon: '⚙️' },
  ];

  const quickActions = [
    {
      title: 'PDF转DOCX',
      description: '将PDF文档转换为Word格式',
      icon: '📝',
      action: 'convert-pdf-to-docx',
    },
    {
      title: 'DOCX转PDF',
      description: '将Word文档转换为PDF格式',
      icon: '📄',
      action: 'convert-docx-to-pdf',
    },
    {
      title: 'OCR识别',
      description: '识别图片中的文字内容',
      icon: '👁️',
      action: 'ocr-recognize',
    },
    {
      title: '添加水印',
      description: '为文档添加文字水印',
      icon: '🔒',
      action: 'add-watermark',
    },
  ];

  const features = [
    {
      title: '多格式支持',
      description: '支持PDF、DOCX、DOC、图片等多种文档格式转换',
      icon: '🔗',
      iconColor: 'text-orange-500',
    },
    {
      title: '本地处理',
      description: '所有文档处理在本地完成，保护数据隐私安全',
      icon: '🔐',
      iconColor: 'text-pink-500',
    },
    {
      title: '高性能',
      description: '基于WASM技术，提供快速高效的文档处理能力',
      icon: '⚡',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-gray-50">
      <div className="p-8 min-h-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">欢迎使用 Doculi</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 text-sm">已连接</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            强大的文档处理平台，支持多格式转换、OCR识别、安全水印和智能处理
          </p>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={<span>{metric.icon}</span>}
            />
          ))}
        </div>

        {/* 快捷操作 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <ActionCard
                key={action.action}
                title={action.title}
                description={action.description}
                icon={<span>{action.icon}</span>}
                onClick={() => onActionClick?.(action.action)}
              />
            ))}
          </div>
        </div>

        {/* 核心功能 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">核心功能</h2>
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={<span>{feature.icon}</span>}
                iconColor={feature.iconColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

