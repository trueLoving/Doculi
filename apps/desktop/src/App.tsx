import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeItem, setActiveItem] = useState<string>('home');

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    console.log('导航到:', item);
  };

  const handleActionClick = (action: string) => {
    console.log('执行操作:', action);
    // 这里可以添加具体的操作逻辑
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      {activeItem === 'home' && <Dashboard onActionClick={handleActionClick} />}
      {activeItem !== 'home' && (
        <div className="flex-1 bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-2">
              {activeItem === 'conversion' && '文档转换'}
              {activeItem === 'ocr' && 'OCR识别'}
              {activeItem === 'watermark' && '水印管理'}
              {activeItem === 'security' && '安全检测'}
              {activeItem === 'settings' && '系统设置'}
            </h2>
            <p className="text-white/80">功能开发中...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
