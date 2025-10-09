# DocuSynapse MVP

智能文档转换平台 - 支持PDF、DOCX、扫描件互转

## 功能特性

- 🔄 **多格式转换**: PDF ↔ DOCX (OCR功能暂时禁用)
- 🔒 **本地处理**: 数据不上传服务器，保护隐私
- 🚀 **WASM技术**: 高性能浏览器端处理
- 🛡️ **安全检测**: 智能识别敏感信息并熔断
- 💧 **水印功能**: 支持自定义文字水印
- 📊 **进度可视化**: 实时显示处理进度

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式框架
- 主线程处理（避免Web Worker模块加载问题）
- pdf-lib (PDF处理)
- pdfjs-dist (PDF文本提取)
- ~~tesseract.js (OCR识别)~~ - 暂时禁用
- docx (Word文档处理)

## 快速开始

### 安装依赖

```bash
cd apps/web
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 使用说明

1. **上传文件**: 拖拽或点击选择PDF、DOCX、JPG、PNG文件
2. **选择格式**: 自动根据文件类型推荐目标格式
3. **设置水印**: 转换为PDF时可添加自定义水印文字
4. **开始转换**: 点击按钮开始处理，支持进度显示
5. **安全检测**: 如检测到身份证等敏感信息会弹出警告
6. **下载结果**: 转换完成后自动下载结果文件

## 演示场景

### 合规场景
上传包含身份证的合同.docx → 添加水印 → 触发熔断警告 → 人工审核后下载

### 扫描件场景  
上传发票照片.jpg → 转换为可搜索PDF → 复制发票编号

## 项目结构

```
src/
├── components/          # UI组件
│   ├── FileUpload.tsx   # 文件上传组件
│   ├── ProgressBar.tsx  # 进度条组件
│   └── SecurityWarningDialog.tsx # 安全警告对话框
├── services/            # 服务层
│   └── conversionService.ts # 转换服务
├── workers/             # Web Workers
│   └── conversionWorker.ts # 转换工作线程
└── App.tsx             # 主应用组件
```

## 浏览器兼容性

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

需要支持 Web Workers 和 WASM 的现代浏览器。