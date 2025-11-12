import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeItem, setActiveItem] = useState<string>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);

  const handleItemClick = (item: string) => {
    if (item === activeItem) return;

    setIsPageTransitioning(true);
    setTimeout(() => {
      setActiveItem(item);
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 50);
    }, 200);
  };

  const handleActionClick = (action: string) => {
    console.log('执行操作:', action);
    // 这里可以添加具体的操作逻辑
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <div className="flex-1 relative overflow-hidden">
        {activeItem === 'home' && (
          <div
            className={`absolute inset-0 transition-all duration-300 ease-in-out ${isPageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <Dashboard onActionClick={handleActionClick} />
          </div>
        )}
        {activeItem !== 'home' && (
          <div
            className={`absolute inset-0 bg-white flex items-center justify-center transition-all duration-300 ease-in-out ${isPageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {activeItem === 'conversion' && '文档转换'}
                {activeItem === 'ocr' && 'OCR识别'}
                {activeItem === 'watermark' && '水印管理'}
                {activeItem === 'security' && '安全检测'}
                {activeItem === 'settings' && '系统设置'}
              </h2>
              <p className="text-gray-500">功能开发中...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
