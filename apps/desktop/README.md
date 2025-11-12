# Doculi Desktop

> 📄 智能文档转换桌面应用 - 基于 WASM + AI 的文档格式转换、OCR 识别、安全水印处理

Doculi Desktop 是 Doculi 项目的桌面端应用，提供本地化的智能文档处理能力，支持多种文档格式转换、OCR 识别和安全水印功能。

## ✨ 核心特性

- 🔄 **多格式转换**：PDF ↔ DOCX 双向转换
- 🤖 **AI 增强转换**：基于本地 LLM 的智能文档处理
- 👁️ **智能 OCR**：扫描件图片转可搜索 PDF
- 🔒 **安全水印**：文档水印和敏感信息检测
- ⚡ **高性能处理**：基于 WASM 的本地化处理
- 🖥️ **桌面原生**：Electron 跨平台桌面应用
- 🏠 **本地化部署**：支持 Ollama、LM Studio 等本地 LLM
- 🔗 **MCP 协议**：标准化的工具调用协议

## 🏗️ 技术架构

### 桌面应用技术栈

- **框架**：Electron + React 18 + TypeScript
- **构建工具**：Vite + Electron Builder
- **样式框架**：Tailwind CSS
- **文档处理**：pdf-lib + tesseract.js + docx-pdf
- **WASM 支持**：WebAssembly 模块
- **多线程**：Web Workers + Comlink
- **打包分发**：Electron Builder

### 应用架构

```
┌─────────────────────────────────────┐
│           Electron Main Process     │
├─────────────────────────────────────┤
│  • 窗口管理                         │
│  • 文件系统访问                     │
│  • 系统集成                         │
│  • 自动更新                         │
└─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│         Electron Renderer Process   │
├─────────────────────────────────────┤
│  • React UI 界面                    │
│  • 文档转换逻辑                     │
│  • Web Workers                      │
│  • WASM 模块                        │
└─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│           MCP Server                │
├─────────────────────────────────────┤
│  • 本地 LLM 集成                    │
│  • AI 增强转换                      │
│  • 智能分析                         │
└─────────────────────────────────────┘
```

## 🚀 快速开始

### 环境要求

- Node.js >= 22.0.0
- pnpm >= 8.0.0
- Python >= 3.11 (用于 MCP 服务器)
- Git

### 安装依赖

```bash
# 安装项目依赖
pnpm install

# 安装桌面应用依赖
cd apps/desktop
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 或者分别启动
pnpm dev:electron    # 启动 Electron 主进程
pnpm dev:renderer   # 启动渲染进程开发服务器
```

### 构建应用

```bash
# 构建生产版本
pnpm build

# 构建并打包分发版本
pnpm dist
```

## 📦 项目结构

```
apps/desktop/
├── src/
│   ├── main/              # Electron 主进程
│   │   ├── index.ts       # 主进程入口
│   │   ├── preload.ts     # 预加载脚本
│   │   └── window.ts      # 窗口管理
│   ├── renderer/          # 渲染进程 (React)
│   │   ├── components/    # UI 组件
│   │   ├── services/      # 服务层
│   │   ├── utils/         # 工具函数
│   │   └── App.tsx        # 主应用组件
│   └── shared/            # 共享代码
├── dist/                  # 构建输出
├── dist-electron/         # Electron 构建输出
├── build/                 # 打包输出
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
├── electron-builder.json  # Electron Builder 配置
└── README.md              # 项目文档
```

## 🔧 核心功能

### 1. 文档转换引擎

| 功能        | 技术方案                       | 状态      |
| ----------- | ------------------------------ | --------- |
| PDF → DOCX  | pdf-lib.js + WASM              | ✅ 已实现 |
| DOCX → PDF  | docx-pdf + Puppeteer Core WASM | ✅ 已实现 |
| 扫描件 OCR  | Tesseract.js WASM              | ✅ 已实现 |
| AI 增强转换 | 本地 LLM + MCP 协议            | ✅ 已实现 |

### 2. 桌面应用特性

- **原生文件拖拽**：支持从文件管理器直接拖拽文件
- **系统托盘集成**：最小化到系统托盘
- **全局快捷键**：支持全局快捷键操作
- **自动更新**：内置自动更新机制
- **多窗口支持**：支持多文档同时处理
- **深色模式**：支持系统主题跟随

### 3. 安全增强模块

- **文字水印**：pdf-lib 文本图层叠加
- **敏感信息检测**：身份证号检测熔断机制
- **风险文档拦截**：自动识别并阻止下载
- **本地处理**：所有数据在本地处理，不上传服务器

## 🛠️ 开发指南

### 添加新功能

1. 在 `src/renderer` 中创建新组件
2. 在 `src/main` 中添加 Electron API 支持
3. 更新 `preload.ts` 暴露必要的 API
4. 编写测试用例
5. 更新文档

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 编写单元测试覆盖核心功能
- 提交信息遵循 Conventional Commits

### 调试技巧

```bash
# 启用 Electron 开发者工具
ELECTRON_ENABLE_LOGGING=1 pnpm dev

# 查看主进程日志
ELECTRON_LOG_LEVEL=debug pnpm dev

# 调试渲染进程
# 在浏览器中打开 http://localhost:5173
```

## 📱 平台支持

### 支持的操作系统

- ✅ **Windows** 10/11 (x64)
- ✅ **macOS** 10.15+ (Intel/Apple Silicon)
- ✅ **Linux** Ubuntu 18.04+ / CentOS 7+

### 打包配置

```json
{
  "build": {
    "appId": "com.doculi.desktop",
    "productName": "Doculi",
    "directories": {
      "output": "build"
    },
    "files": ["dist/**/*", "dist-electron/**/*"],
    "mac": {
      "category": "public.app-category.productivity"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

## 🔒 安全考虑

1. **数据隐私**
   - 所有文档处理在本地完成
   - 不向外部服务发送数据
   - 临时文件自动清理

2. **系统安全**
   - 最小权限原则
   - 沙箱化渲染进程
   - 安全的 IPC 通信

3. **文件安全**
   - 文件类型验证
   - 文件大小限制
   - 恶意文件检测

## 📊 性能优化

### 内存管理

- Web Workers 处理耗时操作
- 及时释放大文件内存
- 智能缓存策略

### 启动优化

- 延迟加载非关键模块
- 预加载常用资源
- 优化打包体积

### 处理性能

- WASM 本地化处理
- 多线程并行处理
- 进度可视化反馈

## 🚀 部署

### 开发环境

```bash
# 克隆项目
git clone https://github.com/starsky/Doculi.git
cd Doculi/apps/desktop

# 安装依赖
pnpm install

# 启动开发
pnpm dev
```

### 生产环境

```bash
# 构建应用
pnpm build

# 打包分发
pnpm dist

# 输出文件在 build/ 目录
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](../../LICENSE) 文件了解详情。

## 📞 联系我们

- **项目地址**：https://github.com/starsky/Doculi
- **问题反馈**：https://github.com/starsky/Doculi/issues
- **文档站点**：https://doculi.com

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
