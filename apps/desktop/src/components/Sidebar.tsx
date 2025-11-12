import React from 'react';
import { Home, FileText, Eye, Lock, Shield, Settings, Zap, ChevronLeft } from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'home',
  onItemClick,
  isCollapsed = false,
  onToggle,
}) => {
  const menuItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'conversion', label: '文档转换', icon: FileText },
    { id: 'ocr', label: 'OCR识别', icon: Eye },
    { id: 'watermark', label: '水印管理', icon: Lock },
    { id: 'security', label: '安全检测', icon: Shield },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  const quickActions = [
    { id: 'quick-convert', label: '快速转换', icon: Zap },
    { id: 'quick-ocr', label: 'OCR识别', icon: Eye },
  ];

  return (
    <div
      className={`h-full bg-gray-50 flex flex-col border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo区域 */}
      <div className={`${isCollapsed ? 'px-3' : 'px-6'} py-5 border-b border-gray-200`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <img src="/logo.svg" alt="Doculi Logo" className="w-9 h-9 flex-shrink-0" />
          {!isCollapsed && (
            <h1 className="text-lg font-semibold text-gray-900 flex-1 transition-opacity duration-300">
              Doculi
            </h1>
          )}
        </div>
      </div>

      {/* 主导航 */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-full ${isCollapsed ? 'px-0 justify-center' : 'px-6'} py-2.5 ${isCollapsed ? 'text-center' : 'text-left'} flex items-center ${isCollapsed ? '' : 'space-x-3'} transition-all duration-150 relative group ${
              activeItem === item.id
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            {!isCollapsed && activeItem === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600"></div>
            )}
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''} ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500'}`}
            />
            {!isCollapsed && (
              <span className="text-sm transition-opacity duration-300">{item.label}</span>
            )}
            {/* 折叠时的工具提示 */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* 快捷操作 */}
      <div className="border-t border-gray-200 pt-3 pb-3">
        {!isCollapsed && (
          <div className="px-6 mb-2 transition-opacity duration-300">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              快捷操作
            </h3>
          </div>
        )}
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onItemClick?.(action.id)}
            className={`w-full ${isCollapsed ? 'px-0 justify-center' : 'px-6'} py-2 ${isCollapsed ? 'text-center' : 'text-left'} flex items-center ${isCollapsed ? '' : 'space-x-3'} transition-all duration-150 relative group ${
              activeItem === action.id
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={isCollapsed ? action.label : undefined}
          >
            <action.icon
              className={`w-4 h-4 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''} ${activeItem === action.id ? 'text-blue-600' : 'text-gray-500'}`}
            />
            {!isCollapsed && (
              <span className="text-sm transition-opacity duration-300">{action.label}</span>
            )}
            {/* 折叠时的工具提示 */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {action.label}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 折叠按钮 - 移到底部 */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={onToggle}
          className={`w-full ${isCollapsed ? 'px-0 justify-center' : 'px-6'} py-2.5 flex items-center ${isCollapsed ? '' : 'space-x-3'} text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 group`}
          title={isCollapsed ? '展开菜单' : '折叠菜单'}
        >
          <div
            className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''} flex items-center justify-center transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </div>
          {!isCollapsed && (
            <span className="text-sm transition-opacity duration-300">折叠菜单</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
