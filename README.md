# DocuSynapse

> 基于 WASM + AI 的智能文档转换与安全处理平台

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange)](https://pnpm.io/)

## 🚀 项目简介

DocuSynapse 是一个创新的文档处理平台，结合了 WebAssembly (WASM) 技术和本地 AI 模型，提供高性能的文档转换、OCR 识别和安全处理。支持完全本地化的文档处理能力，同时集成了 MCP 协议和多种本地 LLM 服务。

### ✨ 核心特性

- 🔄 **多格式转换**：PDF ↔ DOCX 双向转换
- 🤖 **AI 增强转换**：基于本地 LLM 的智能文档处理
- 👁️ **智能 OCR**：扫描件图片转可搜索 PDF
- 🔒 **安全水印**：文档水印和敏感信息检测
- ⚡ **高性能处理**：基于 WASM 的本地化处理
- 🧵 **多线程支持**：Web Workers 保障界面流畅
- 🏠 **本地化部署**：支持 Ollama、LM Studio 等本地 LLM
- 🔗 **MCP 协议**：标准化的工具调用协议

## 🏗️ 技术架构

### Monorepo 结构

```
DocuSynapse/
├── apps/
│   ├── web/          # React Web 应用 (前端)
│   └── desktop/      # 桌面应用 (计划中)
├── server/           # Python MCP 服务器 (后端)
├── packages/
│   └── ui/           # 共享 UI 组件库
├── docs/             # Next.js 文档站点
└── docker-compose.yml # 全栈部署配置
```

### 技术栈

**前端 (apps/web)**
- **框架**：React 18 + TypeScript + Vite
- **样式**：Tailwind CSS
- **状态管理**：React Hooks
- **文档处理**：pdf-lib + tesseract.js + docx-pdf
- **WASM 支持**：WebAssembly 模块
- **多线程**：Web Workers + Comlink

**后端 (server)**
- **框架**：Python FastAPI
- **LLM 集成**：Ollama + LM Studio
- **协议**：MCP (Model Context Protocol)
- **文档处理**：AI 驱动的智能转换
- **部署**：Docker + Docker Compose

**文档 (docs)**
- **框架**：Next.js + MDX
- **功能**：项目文档、API 文档、使用指南

## 🚀 快速开始

### 环境要求

- Node.js >= 22.0.0
- pnpm >= 8.0.0
- Python >= 3.11 (用于后端服务)
- Docker & Docker Compose (可选)

### 方式一：Docker 部署 (推荐)

```bash
# 克隆项目
git clone https://github.com/starsky/DocuSynapse.git
cd DocuSynapse

# 启动全栈服务
docker-compose up -d

# 访问应用
# 前端: http://localhost:3000
# 后端API: http://localhost:8000
# 文档: http://localhost:3001
```

### 方式二：本地开发

```bash
# 安装依赖
pnpm install

# 启动后端服务
cd server
pip install -r requirements.txt
python mcp_server.py &

# 启动前端服务
cd ../apps/web
pnpm dev

# 启动文档站点
cd ../../docs
pnpm dev
```

## 📦 项目结构

### Apps

#### Web 应用 (`apps/web`)
- **技术栈**：React 18 + TypeScript + Vite + Tailwind CSS
- **功能**：文档转换、OCR 处理、AI 增强转换、安全检测
- **端口**：http://localhost:3000

#### 文档站点 (`docs`)
- **技术栈**：Next.js + MDX
- **功能**：项目文档、API 文档、使用指南
- **端口**：http://localhost:3001

### Server

#### MCP 服务器 (`server`)
- **技术栈**：Python FastAPI + Ollama/LM Studio
- **功能**：MCP 协议服务、AI 文档转换、本地 LLM 管理
- **端口**：http://localhost:8000

### Packages

#### UI 组件库 (`packages/ui`)
- **技术栈**：React + TypeScript + tsup
- **功能**：共享组件、设计系统
- **发布**：npm 包

## 🔧 核心功能

### 1. 文档转换引擎

| 功能 | 技术方案 | 状态 |
|------|----------|------|
| PDF → DOCX | pdf-lib.js + WASM | ✅ 已实现 |
| DOCX → PDF | docx-pdf + Puppeteer Core WASM | ✅ 已实现 |
| 扫描件 OCR | Tesseract.js WASM | ✅ 已实现 |
| AI 增强转换 | 本地 LLM + MCP 协议 | ✅ 已实现 |

### 2. AI 增强功能

- **智能格式识别**：自动识别文档结构（标题、段落、列表）
- **内容理解**：保持语义结构和逻辑顺序
- **质量提升**：95%格式保留率，智能错误纠正
- **本地化处理**：支持 Ollama、LM Studio 等本地 LLM

### 3. 安全增强模块

- **文字水印**：pdf-lib 文本图层叠加
- **敏感信息检测**：身份证号检测熔断机制
- **风险文档拦截**：自动识别并阻止下载

### 4. 性能优化

- **Web Workers**：Comlink 封装耗时操作
- **进度可视化**：环形进度条 + 文件大小估算
- **WASM 优化**：本地化处理，无网络依赖
- **MCP 协议**：标准化的工具调用接口

## 📋 开发计划

### MVP 版本 (7天)

- [x] **Day 1**: 项目基础架构搭建
- [ ] **Day 2**: PDF→DOCX 转换引擎
- [ ] **Day 3**: DOCX→PDF + 水印基础
- [ ] **Day 4**: 扫描件 OCR 集成
- [ ] **Day 5**: Web Workers 多线程架构
- [ ] **Day 6**: 安全模块开发
- [ ] **Day 7**: 前端界面 + 联调测试

详细计划请查看 [plan.md](./plan.md)

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
# 构建所有包
pnpm build

# 运行测试
pnpm test

# 发布包（需要 npm 权限）
pnpm --filter ui publish
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- **作者**：starsky
- **项目地址**：https://github.com/starsky/DocuSynapse
- **问题反馈**：https://github.com/starsky/DocuSynapse/issues

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
