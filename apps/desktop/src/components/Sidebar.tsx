import React from 'react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'home', onItemClick }) => {
  const menuItems = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'conversion', label: '文档转换', icon: '📄' },
    { id: 'ocr', label: 'OCR识别', icon: '👁️' },
    { id: 'watermark', label: '水印管理', icon: '🔒' },
    { id: 'security', label: '安全检测', icon: '🛡️' },
    { id: 'settings', label: '系统设置', icon: '⚙️' },
  ];

  const quickActions = [
    { id: 'quick-convert', label: '快速转换', icon: '⚡' },
    { id: 'quick-ocr', label: 'OCR识别', icon: '📷' },
  ];

  return (
    <div className="w-64 h-full bg-gray-100 flex flex-col">
      {/* Logo区域 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Doculi</h1>
        </div>
      </div>

      {/* 主导航 */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-full px-6 py-3 text-left flex items-center space-x-3 transition-colors ${
              activeItem === item.id
                ? 'bg-gray-200 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 快捷操作 */}
      <div className="border-t border-gray-200 pt-4 pb-4">
        <div className="px-6 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">快捷操作</h3>
        </div>
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onItemClick?.(action.id)}
            className={`w-full px-6 py-2 text-left flex items-center space-x-3 transition-colors ${
              activeItem === action.id
                ? 'bg-gray-200 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-base">{action.icon}</span>
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

