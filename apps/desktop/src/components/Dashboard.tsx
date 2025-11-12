import React from 'react';
import {
  FileText,
  ClipboardList,
  Eye,
  Settings,
  FileEdit,
  FileDown,
  Scan,
  Lock,
  Link2,
  Zap,
} from 'lucide-react';
import MetricCard from './MetricCard';
import ActionCard from './ActionCard';
import FeatureCard from './FeatureCard';

interface DashboardProps {
  onActionClick?: (action: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onActionClick }) => {
  const metrics = [
    { title: '文档转换', value: 0, icon: FileText },
    { title: '转换记录', value: 0, icon: ClipboardList },
    { title: 'OCR识别', value: 0, icon: Eye },
    { title: '处理任务', value: 0, icon: Settings },
  ];

  const quickActions = [
    {
      title: 'PDF转DOCX',
      description: '将PDF文档转换为Word格式',
      icon: FileEdit,
      action: 'convert-pdf-to-docx',
    },
    {
      title: 'DOCX转PDF',
      description: '将Word文档转换为PDF格式',
      icon: FileDown,
      action: 'convert-docx-to-pdf',
    },
    {
      title: 'OCR识别',
      description: '识别图片中的文字内容',
      icon: Scan,
      action: 'ocr-recognize',
    },
    {
      title: '添加水印',
      description: '为文档添加文字水印',
      icon: Lock,
      action: 'add-watermark',
    },
  ];

  const features = [
    {
      title: '多格式支持',
      description: '支持PDF、DOCX、DOC、图片等多种文档格式转换',
      icon: Link2,
    },
    {
      title: '本地处理',
      description: '所有文档处理在本地完成，保护数据隐私安全',
      icon: Lock,
    },
    {
      title: '高性能',
      description: '基于WASM技术，提供快速高效的文档处理能力',
      icon: Zap,
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto p-8 min-h-full">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-3xl font-bold text-gray-900">欢迎使用 Doculi</h1>
          </div>
          <p className="text-gray-600 text-base">
            强大的文档处理平台，支持多格式转换、OCR识别、安全水印和智能处理
          </p>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {metrics.map((metric, index) => (
            <MetricCard key={index} title={metric.title} value={metric.value} icon={metric.icon} />
          ))}
        </div>

        {/* 快捷操作 */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">快捷操作</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <ActionCard
                key={action.action}
                title={action.title}
                description={action.description}
                icon={action.icon}
                onClick={() => onActionClick?.(action.action)}
              />
            ))}
          </div>
        </div>

        {/* 核心功能 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-5">核心功能</h2>
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
