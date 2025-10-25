# Doculi

> 基于 WASM + AI 的智能文档转换与安全处理平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange)](https://pnpm.io/)
[![WIP](https://img.shields.io/badge/Status-WIP%20(Work%20In%20Progress)-orange.svg)](https://github.com/starsky/Doculi)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Web%20App-blue)](https://doculi-web.vercel.app/)
[![Documentation](https://img.shields.io/badge/Documentation-Docs%20Site-green)](https://doculi-docs.vercel.app/)

## ⚠️ 开发状态

**🚧 项目正在积极开发中 (WIP - Work In Progress)**

- 📝 **功能状态**: 所有功能都处于开发阶段，可能不稳定
- 🐛 **已知问题**: 可能存在 bug 和性能问题
- 🔄 **频繁更新**: 代码和功能会频繁变更
- ⚠️ **生产环境**: 不建议在生产环境中使用
- 🧪 **测试目的**: 当前版本仅用于测试和演示目的

## 🚀 项目简介

Doculi 是一个正在开发中的 Web 端文档处理平台，结合了 WebAssembly (WASM) 技术，旨在提供高性能的文档转换、OCR 识别和安全处理。所有处理都在浏览器中完成，保护用户数据隐私。

> **注意**: 这是一个实验性项目，功能仍在开发中，可能存在不稳定的情况。

### ✨ 核心特性 (开发中)

- 🔄 **多格式转换**：PDF ↔ DOCX 双向转换 *(部分功能可用)*
- 👁️ **智能 OCR**：扫描件图片转可搜索 PDF *(实验性功能)*
- 🔒 **安全水印**：文档水印和敏感信息检测 *(开发中)*
- ⚡ **高性能处理**：基于 WASM 的本地化处理 *(优化中)*
- 🧵 **多线程支持**：Web Workers 保障界面流畅 *(测试中)*
- 🔒 **隐私保护**：所有处理在浏览器中完成，数据不上传 *(已实现)*

## 🏗️ 技术架构

### 项目结构

```
Doculi/
├── apps/
│   └── web/          # React Web 应用
├── packages/
│   └── ui/           # 共享 UI 组件库
├── docs/             # Next.js 文档站点
└── README.md         # 项目说明
```

### 技术栈

**Web 应用**
- **框架**：React 18 + TypeScript + Vite
- **样式**：Tailwind CSS
- **状态管理**：React Hooks
- **文档处理**：pdf-lib + tesseract.js + docx
- **WASM 支持**：WebAssembly 模块
- **多线程**：Web Workers + Comlink

**文档站点**
- **框架**：Next.js + MDX
- **功能**：项目文档、API 文档、使用指南

## 🌐 在线体验

### 立即试用

- **🚀 Web 应用**: [https://doculi-web.vercel.app/](https://doculi-web.vercel.app/) - 在线文档转换平台
- **📚 文档站点**: [https://doculi-docs.vercel.app/](https://doculi-docs.vercel.app/) - 完整的产品文档和使用指南

### 功能演示

访问 [Web 应用](https://doculi-web.vercel.app/) 可以体验：
- PDF ↔ DOCX 双向转换 *(部分功能)*
- 扫描件 OCR 识别 *(实验性)*
- 智能水印添加 *(开发中)*
- 敏感信息检测 *(测试中)*
- 实时进度显示 *(基础功能)*

> **⚠️ 重要提醒**: 在线演示仅用于测试目的，功能可能不稳定，请勿用于重要文档处理。

## 🚀 快速开始

### 环境要求

- Node.js >= 22.0.0
- pnpm >= 8.0.0
- 现代浏览器（支持 Web Workers 和 WASM）

### 本地开发

```bash
# 克隆项目
git clone https://github.com/starsky/Doculi.git
cd Doculi

# 安装依赖
pnpm install

# 启动 Web 应用
cd apps/web
pnpm dev

# 启动文档站点
cd ../../docs
pnpm dev
```

## 📦 项目结构

### Web 应用 (`apps/web`)
- **技术栈**：React 18 + TypeScript + Vite + Tailwind CSS
- **功能**：文档转换、OCR 处理、安全检测
- **本地端口**：http://localhost:3000
- **在线演示**：[https://doculi-web.vercel.app/](https://doculi-web.vercel.app/)

### 文档站点 (`docs`)
- **技术栈**：Next.js + MDX
- **功能**：项目文档、API 文档、使用指南
- **本地端口**：http://localhost:3001
- **在线文档**：[https://doculi-docs.vercel.app/](https://doculi-docs.vercel.app/)

### UI 组件库 (`packages/ui`)
- **技术栈**：React + TypeScript + tsup
- **功能**：共享组件、设计系统
- **发布**：npm 包

## 🔧 核心功能

### 1. 文档转换引擎 (开发中)

| 功能 | 技术方案 | 状态 |
|------|----------|------|
| PDF → DOCX | pdf-lib.js + WASM | 🟡 部分可用 |
| DOCX → PDF | docx + WASM | 🟡 部分可用 |
| 扫描件 OCR | Tesseract.js WASM | 🔴 实验性 |

### 2. 智能处理功能 (开发中)

- **智能格式识别**：自动识别文档结构（标题、段落、列表） *(开发中)*
- **内容理解**：保持语义结构和逻辑顺序 *(测试中)*
- **质量提升**：格式保留率优化中 *(不稳定)*

### 3. 安全增强模块 (开发中)

- **文字水印**：pdf-lib 文本图层叠加 *(基础功能)*
- **敏感信息检测**：身份证号检测熔断机制 *(测试中)*
- **风险文档拦截**：自动识别并阻止下载 *(开发中)*

### 4. 性能优化 (进行中)

- **Web Workers**：Comlink 封装耗时操作 *(测试中)*
- **进度可视化**：环形进度条 + 文件大小估算 *(基础功能)*
- **WASM 优化**：本地化处理，无网络依赖 *(优化中)*

## 🎯 使用场景 (计划中)

> **⚠️ 注意**: 以下使用场景为计划功能，当前版本可能无法完全支持。

### 企业办公 (计划中)
- **合同文档处理**：PDF 合同转换为 Word 格式便于编辑 *(开发中)*
- **报告生成**：扫描件发票转换为可搜索 PDF *(实验性)*
- **文档安全**：添加水印保护敏感文档 *(基础功能)*

### 教育培训 (计划中)
- **教学资料转换**：PDF 课件转换为 Word 格式便于修改 *(开发中)*
- **作业处理**：扫描件作业转换为可编辑文档 *(实验性)*
- **资料整理**：批量处理教学文档 *(计划中)*

### 个人使用 (部分可用)
- **文档编辑**：PDF 文档转换为 Word 进行编辑 *(部分功能)*
- **扫描件处理**：照片转文字，提高工作效率 *(实验性)*
- **格式统一**：不同格式文档统一处理 *(开发中)*

## 🛠️ 开发指南

### 添加新功能

1. 在对应的工作区创建功能分支
2. 开发并测试功能
3. 更新相关文档
4. 提交 PR 进行代码审查

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 编写单元测试覆盖核心功能
- 提交信息遵循 Conventional Commits

### 发布流程

```bash
# 构建 Web 应用
cd apps/web
pnpm build

# 构建文档站点
cd ../../docs
pnpm build
```

## 🤝 贡献指南

> **🚧 项目处于早期开发阶段，欢迎贡献但请注意功能可能不稳定**

我们欢迎所有形式的贡献！由于项目处于 WIP 状态，请注意：

### 贡献前须知
- 📝 **功能不稳定**: 代码和功能会频繁变更
- 🐛 **存在 Bug**: 可能遇到各种问题
- 🔄 **快速迭代**: 开发节奏较快
- ⚠️ **测试环境**: 建议在测试环境中使用

### 贡献步骤
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 报告问题
- 🐛 **Bug 报告**: 欢迎报告任何问题
- 💡 **功能建议**: 欢迎提出改进建议
- 📖 **文档改进**: 欢迎改进文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **作者**：starsky
- **项目地址**：https://github.com/starsky/Doculi
- **问题反馈**：https://github.com/starsky/Doculi/issues
- **在线演示**：[https://doculi-web.vercel.app/](https://doculi-web.vercel.app/) *(测试版本)*
- **产品文档**：[https://doculi-docs.vercel.app/](https://doculi-docs.vercel.app/) *(开发中)*

---

## ⚠️ 重要声明

**🚧 项目状态**: 这是一个 Work In Progress (WIP) 项目，所有功能都处于开发阶段。

**📝 使用建议**: 
- 仅用于测试和演示目的
- 不建议用于生产环境
- 功能可能不稳定，存在 bug
- 代码和功能会频繁变更

**🔍 反馈欢迎**: 欢迎报告问题、提出建议或贡献代码！

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
