# Doculi Server

Doculi的后端服务，基于MCP（Model Context Protocol）协议，提供本地LLM驱动的文档转换服务。

## 🏗️ 架构

```
Frontend (TypeScript) 
    ↓ HTTP/WebSocket
MCP Server (Python FastAPI)
    ↓ API调用
Local LLM (Ollama/LM Studio)
    ↓ 处理结果
MCP Server
    ↓ 响应
Frontend
```

## 🚀 快速开始

### 1. 本地开发

```bash
# 安装依赖
pip install -r requirements.txt

# 启动服务
python src/mcp_server.py

# 或使用启动脚本
./start_server.sh
```

### 2. Docker部署

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f mcp-server
```

### 3. 手动安装Ollama

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# 下载模型
ollama pull llama3.1:8b

# 启动Ollama
ollama serve
```

## 📁 项目结构

```
server/src/
├── mcp_server.py          # FastAPI主服务器
├── mcp_tools.py           # MCP工具管理
├── llm_client.py          # LLM客户端
├── document_converter.py  # 文档转换器
├── config.py              # 配置文件
├── requirements.txt        # Python依赖
├── Dockerfile             # Docker配置
├── docker-compose.yml     # Docker Compose配置
├── start_server.sh        # 启动脚本
└── README.md              # 说明文档

server/
├── requirements.txt        # Python依赖
├── Dockerfile             # Docker配置
├── docker-compose.yml     # Docker Compose配置
├── start_server.sh        # 启动脚本
└── README.md              # 说明文档
```

## 🔧 配置

### 环境变量

```bash
# MCP服务器配置
MCP_HOST=0.0.0.0
MCP_PORT=8000
OLLAMA_HOST=0.0.0.0
OLLAMA_PORT=11434

# 文件处理配置
MAX_FILE_SIZE=100MB
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
LOG_DIR=./logs
```

### 配置文件 (config.py)

```python
MCP_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "llm_endpoint": "http://localhost:11434",
    "timeout": 30,
    "max_file_size": "100MB"
}
```

## 📡 API接口

### 健康检查

```bash
GET /health
```

### 服务器状态

```bash
GET /api/status
```

### MCP协议接口

```bash
POST /mcp
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

### 文档转换

```bash
POST /api/convert
Content-Type: multipart/form-data

file: [文件]
target_format: pdf|docx|txt|html
preserve_formatting: true|false
extract_tables: true|false
extract_images: true|false
language: auto|zh|en
```

### 模型管理

```bash
# 获取可用模型
GET /api/models

# 下载模型
POST /api/models/{model_name}/download
```

## 🛠️ MCP工具

### 1. convert_document
文档格式转换工具

**参数:**
- `file_path`: 文件路径
- `target_format`: 目标格式 (pdf, docx, txt, html)
- `preserve_formatting`: 是否保留格式
- `extract_tables`: 是否提取表格
- `extract_images`: 是否提取图片
- `language`: 语言设置

### 2. ocr_document
OCR文本提取工具

**参数:**
- `file_path`: 文件路径
- `language`: OCR语言代码

### 3. analyze_document
文档分析工具

**参数:**
- `file_path`: 文件路径
- `analysis_type`: 分析类型 (structure, content, metadata, all)

## 🔍 日志

日志文件位置: `logs/mcp_server.log`

日志级别:
- INFO: 一般信息
- WARNING: 警告信息
- ERROR: 错误信息
- DEBUG: 调试信息

## 🐛 故障排除

### 常见问题

1. **Ollama服务无法启动**
   ```bash
   # 检查端口占用
   lsof -i :11434
   
   # 重启服务
   ollama serve
   ```

2. **模型下载失败**
   ```bash
   # 清理缓存
   ollama rm llama3.1:8b
   ollama pull llama3.1:8b
   ```

3. **MCP服务器连接失败**
   ```bash
   # 检查服务状态
   curl http://localhost:8000/health
   
   # 查看日志
   tail -f logs/mcp_server.log
   ```

### 性能优化

1. **Ollama优化**
   ```bash
   export OLLAMA_NUM_PARALLEL=2
   export OLLAMA_MAX_LOADED_MODELS=1
   export OLLAMA_FLASH_ATTENTION=1
   ```

2. **GPU加速**
   ```bash
   export CUDA_VISIBLE_DEVICES=0
   ```

## 🔒 安全考虑

1. **网络安全**
   - 服务器仅监听本地接口
   - 使用防火墙限制外部访问
   - 生产环境建议使用HTTPS

2. **数据隐私**
   - 所有处理在本地完成
   - 不向外部服务发送数据
   - 临时文件自动清理

3. **访问控制**
   - 可配置API密钥验证
   - 文件大小限制
   - 请求频率限制

## 📊 监控

### 健康检查

```bash
curl http://localhost:8000/health
```

### 状态监控

```bash
curl http://localhost:8000/api/status
```

### 日志监控

```bash
tail -f logs/mcp_server.log
```

## 🚀 部署

### 生产环境部署

1. **使用Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **使用systemd (Linux)**
   ```bash
   sudo systemctl enable docuSynapse-server
   sudo systemctl start docuSynapse-server
   ```

3. **使用PM2 (Node.js)**
   ```bash
   pm2 start mcp_server.py --name docuSynapse-server
   pm2 save
   pm2 startup
   ```

## 📈 扩展

### 添加新工具

1. 在 `mcp_tools.py` 中注册新工具
2. 在 `document_converter.py` 中实现工具逻辑
3. 更新API文档

### 支持新LLM提供商

1. 在 `config.py` 中添加新提供商配置
2. 在 `llm_client.py` 中实现新提供商接口
3. 更新文档

## 📝 开发

### 开发环境设置

```bash
# 安装开发依赖
pip install -r requirements-dev.txt

# 运行测试
pytest

# 代码格式化
black .

# 类型检查
mypy .
```

### 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 创建Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件
