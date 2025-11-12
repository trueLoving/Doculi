# Doculi Web 端

> Doculi 的 Web 端应用 - 基于 WASM + AI 的智能文档转换平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)
[![WIP](<https://img.shields.io/badge/Status-WIP%20(Work%20In%20Progress)-orange.svg>)](https://github.com/starsky/Doculi)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online%20App-green)](https://doculi-web.vercel.app/)

## ⚠️ 开发状态

**🚧 应用正在积极开发中 (WIP - Work In Progress)**

- 📝 **功能状态**: 所有功能都处于开发阶段，可能不稳定
- 🐛 **已知问题**: 可能存在 bug 和性能问题
- 🔄 **频繁更新**: 代码和功能会频繁变更
- ⚠️ **生产环境**: 不建议在生产环境中使用
- 🧪 **测试目的**: 当前版本仅用于测试和演示目的

## 🚀 项目简介

Doculi Web 端是 Doculi 智能文档处理平台的 Web 应用，提供基于浏览器的文档转换、OCR 识别和安全处理功能。采用 WASM 技术实现高性能本地处理，保护用户数据隐私。

> **注意**: 这是一个实验性应用，功能仍在开发中，可能存在不稳定的情况。

### ✨ 核心特性 (开发中)

- 🔄 **多格式转换**: PDF ↔ DOCX 双向转换 _(部分功能可用)_
- 👁️ **智能 OCR**: 扫描件图片转可搜索 PDF _(实验性功能)_
- 🔒 **安全水印**: 文档水印和敏感信息检测 _(开发中)_
- ⚡ **高性能处理**: 基于 WASM 的本地化处理 _(优化中)_
- 🧵 **多线程支持**: Web Workers 保障界面流畅 _(测试中)_
- 🔒 **隐私保护**: 所有处理在浏览器中完成，数据不上传 _(已实现)_

## 🏗️ 技术架构

### 前端技术栈

**核心框架**

- **React 18** + TypeScript - 现代化前端框架
- **Vite 7** - 快速构建工具和开发服务器
- **Tailwind CSS 4** - 实用优先的 CSS 框架

**文档处理**

- **pdf-lib** - PDF 文档操作和生成
- **pdfjs-dist** - PDF 文本提取和渲染
- **docx** - Word 文档处理
- **mammoth** - DOCX 到 HTML 转换
- **tesseract.js** - OCR 文字识别

**性能优化**

- **Web Workers** - 多线程处理，避免界面阻塞
- **WASM 模块** - 高性能本地计算
- **Comlink** - Web Worker 通信封装

**状态管理**

- **React Hooks** - 函数式状态管理
- **useCallback/useMemo** - 性能优化

## 🌐 在线体验

### 立即试用

**🚀 在线演示**: [https://doculi-web.vercel.app/](https://doculi-web.vercel.app/)

无需安装，直接在浏览器中体验：

- PDF ↔ DOCX 双向转换 _(部分功能)_
- 扫描件 OCR 识别 _(实验性)_
- 智能水印添加 _(开发中)_
- 敏感信息检测 _(测试中)_
- 实时进度显示 _(基础功能)_

> **⚠️ 重要提醒**: 在线演示仅用于测试目的，功能可能不稳定，请勿用于重要文档处理。

## 🚀 快速开始

### 环境要求

- Node.js >= 22.0.0
- pnpm >= 8.0.0
- 现代浏览器（支持 Web Workers 和 WASM）

### 安装依赖

```bash
# 进入 web 应用目录
cd apps/web

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 访问应用
# http://localhost:3000
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### Docker 部署

```bash
# 使用 Docker Compose 启动全栈服务
cd ../../
docker-compose up -d

# 访问应用
# 前端: http://localhost:3000
# 后端API: http://localhost:8000
```

## 📖 使用指南

### 基本操作流程

1. **📁 上传文件**: 拖拽或点击选择 PDF、DOCX、JPG、PNG 文件
2. **🎯 选择格式**: 自动根据文件类型推荐目标格式
3. **🔒 设置水印**: 转换为 PDF 时可添加自定义水印文字
4. **⚡ 开始转换**: 点击按钮开始处理，支持实时进度显示
5. **🛡️ 安全检测**: 如检测到身份证等敏感信息会弹出警告
6. **💾 下载结果**: 转换完成后自动下载结果文件

### 支持的文件格式 (开发中)

| 输入格式 | 输出格式 | 功能描述                   | 状态        |
| -------- | -------- | -------------------------- | ----------- |
| PDF      | DOCX     | 智能文本提取，保持格式结构 | 🟡 部分可用 |
| DOCX     | PDF      | 文档转换，支持水印添加     | 🟡 部分可用 |
| JPG/PNG  | PDF      | OCR 识别，生成可搜索 PDF   | 🔴 实验性   |

### 高级功能 (开发中)

- **智能格式识别**: 自动识别文档结构（标题、段落、列表） _(开发中)_
- **内容理解**: 保持语义结构和逻辑顺序 _(测试中)_
- **质量提升**: 格式保留率优化中 _(不稳定)_
- **敏感信息检测**: 身份证号检测熔断机制 _(测试中)_
- **风险文档拦截**: 自动识别并阻止下载 _(开发中)_

## 🎯 应用场景 (计划中)

> **⚠️ 注意**: 以下应用场景为计划功能，当前版本可能无法完全支持。

### 企业合规场景 (计划中)

**合同文档处理**

- 上传包含身份证的合同.docx → 添加水印 → 触发熔断警告 → 人工审核后下载 _(开发中)_
- 适用于法律、金融等对数据安全要求较高的行业

### 办公自动化场景 (计划中)

**扫描件数字化**

- 上传发票照片.jpg → OCR 识别 → 转换为可搜索 PDF → 提取关键信息 _(实验性)_
- 适用于财务、行政等需要处理大量纸质文档的场景

### 教育培训场景 (计划中)

**教学资料转换**

- PDF 课件 → 转换为 Word 格式 → 便于编辑和标注 _(开发中)_
- 适用于教师、培训师等需要修改教学材料的场景

## 📁 项目结构

```
apps/web/
├── public/                    # 静态资源
│   ├── vite.svg              # 网站图标
│   └── pdf.worker.min.js     # PDF.js Worker
├── src/
│   ├── components/           # React 组件
│   │   ├── FileUpload.tsx    # 文件上传组件
│   │   ├── FilePreview.tsx   # 文件预览组件
│   │   ├── ProgressBar.tsx   # 进度条组件
│   │   ├── SecurityWarningDialog.tsx # 安全警告对话框
│   │   └── LocalLLMConfigDialog.tsx # 本地LLM配置对话框
│   ├── services/             # 服务层
│   │   ├── conversionService.ts # 文档转换服务
│   │   ├── mcpClient.ts      # MCP 客户端
│   │   ├── mcpServer.ts      # MCP 服务器
│   │   └── workerManager.ts  # Web Worker 管理
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── tsconfig.json            # TypeScript 配置
```

## 🌐 浏览器兼容性

| 浏览器  | 最低版本 | 支持状态    |
| ------- | -------- | ----------- |
| Chrome  | 88+      | ✅ 完全支持 |
| Firefox | 85+      | ✅ 完全支持 |
| Safari  | 14+      | ✅ 完全支持 |
| Edge    | 88+      | ✅ 完全支持 |

**技术要求**:

- 支持 Web Workers
- 支持 WebAssembly (WASM)
- 支持 ES2020+ 语法

## 🔧 开发指南

### 添加新功能

1. 在 `src/components/` 中创建新组件
2. 在 `src/services/` 中添加相关服务
3. 更新类型定义和接口
4. 编写测试用例
5. 更新文档

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式写法 + Hooks
- 使用 Tailwind CSS 进行样式设计
- 提交信息遵循 Conventional Commits

### 性能优化

- 使用 `React.memo` 优化组件渲染
- 使用 `useCallback` 和 `useMemo` 优化计算
- Web Workers 处理耗时操作
- 懒加载大型依赖库

## 🐛 故障排除

### 常见问题

1. **构建失败**

   ```bash
   # 清理依赖重新安装
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **OCR 功能不可用**
   - 检查浏览器是否支持 WebAssembly
   - 确认 tesseract.js 依赖已正确安装

3. **文件上传失败**
   - 检查文件大小限制
   - 确认文件格式是否支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](../../LICENSE) 文件了解详情。

## 🤝 贡献

> **🚧 应用处于早期开发阶段，欢迎贡献但请注意功能可能不稳定**

欢迎贡献代码！请查看 [CONTRIBUTING.md](../../CONTRIBUTING.md) 了解贡献指南。

### 贡献前须知

- 📝 **功能不稳定**: 代码和功能会频繁变更
- 🐛 **存在 Bug**: 可能遇到各种问题
- 🔄 **快速迭代**: 开发节奏较快
- ⚠️ **测试环境**: 建议在测试环境中使用

## 📞 支持

- **项目地址**: https://github.com/starsky/Doculi
- **问题反馈**: https://github.com/starsky/Doculi/issues
- **在线演示**: [https://doculi-web.vercel.app/](https://doculi-web.vercel.app/) _(测试版本)_
- **产品文档**: [https://doculi-docs.vercel.app/](https://doculi-docs.vercel.app/) _(开发中)_

---

## ⚠️ 重要声明

**🚧 应用状态**: 这是一个 Work In Progress (WIP) 应用，所有功能都处于开发阶段。

**📝 使用建议**:

- 仅用于测试和演示目的
- 不建议用于生产环境
- 功能可能不稳定，存在 bug
- 代码和功能会频繁变更

**🔍 反馈欢迎**: 欢迎报告问题、提出建议或贡献代码！

⭐ 如果这个应用对您有帮助，请给我们一个 Star！
