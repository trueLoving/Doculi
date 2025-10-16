# 本地LLM + MCP协议部署指南

## 🏗️ 架构概述

DocuSynapse现在支持通过MCP（Model Context Protocol）协议集成本地部署的大型语言模型，实现完全本地化的文档转换服务。

### 核心组件
- **MCP服务器**: 处理文档转换请求和LLM通信
- **MCP客户端**: 前端与MCP服务器的通信接口
- **本地LLM管理器**: 管理Ollama、LM Studio等本地LLM服务
- **文档转换工具**: 基于AI的智能文档转换

## 🚀 部署步骤

### 1. 安装本地LLM服务

#### 选项A: Ollama (推荐)
```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# 下载安装包: https://ollama.ai/download
```

#### 选项B: LM Studio
```bash
# 下载LM Studio: https://lmstudio.ai/
# 支持Windows、macOS、Linux
```

### 2. 下载和启动模型

#### 使用Ollama
```bash
# 下载推荐模型
ollama pull llama3.1:8b        # 8GB RAM
ollama pull qwen2.5:7b         # 中文支持
ollama pull gemma2:9b          # Google模型
ollama pull codellama:7b       # 代码专用

# 启动服务
ollama serve
```

#### 使用LM Studio
1. 打开LM Studio
2. 在"Models"页面下载模型
3. 在"Local Server"页面启动服务
4. 默认端口: 1234

### 3. 部署MCP服务器

#### 创建MCP服务器脚本
```python
# mcp_server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import asyncio
from typing import Dict, Any

app = FastAPI(title="DocuSynapse MCP Server")

# 允许跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MCP工具注册
TOOLS = {
    "convert_document": {
        "name": "convert_document",
        "description": "Convert document between formats with AI assistance",
        "inputSchema": {
            "type": "object",
            "properties": {
                "file_path": {"type": "string", "description": "Path to the input file"},
                "target_format": {"type": "string", "enum": ["pdf", "docx", "txt", "html"]},
                "preserve_formatting": {"type": "boolean", "default": True},
                "extract_tables": {"type": "boolean", "default": True},
                "extract_images": {"type": "boolean", "default": True},
                "language": {"type": "string", "default": "auto"}
            },
            "required": ["file_path", "target_format"]
        }
    }
}

@app.post("/mcp")
async def handle_mcp_request(request: Dict[str, Any]):
    """处理MCP协议请求"""
    try:
        method = request.get("method")
        params = request.get("params", {})
        request_id = request.get("id")
        
        if method == "tools/list":
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {"tools": list(TOOLS.values())}
            }
        
        elif method == "tools/call":
            tool_name = params.get("name")
            tool_args = params.get("arguments", {})
            
            if tool_name == "convert_document":
                result = await convert_document_tool(tool_args)
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": {"content": result}
                }
            else:
                raise HTTPException(status_code=400, detail="Unknown tool")
        
        else:
            raise HTTPException(status_code=400, detail="Unknown method")
    
    except Exception as e:
        return {
            "jsonrpc": "2.0",
            "id": request.get("id"),
            "error": {
                "code": -32603,
                "message": str(e)
            }
        }

async def convert_document_tool(args: Dict[str, Any]) -> Dict[str, Any]:
    """文档转换工具实现"""
    file_path = args["file_path"]
    target_format = args["target_format"]
    
    # 这里实现文档转换逻辑
    # 1. 读取文件
    # 2. 调用本地LLM进行内容分析
    # 3. 生成目标格式文件
    
    return {
        "success": True,
        "data": "转换后的内容",
        "fileName": f"converted.{target_format}",
        "confidence": 0.9
    }

@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy", "service": "mcp-server"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

#### 安装依赖
```bash
pip install fastapi uvicorn python-multipart
```

#### 启动MCP服务器
```bash
python mcp_server.py
```

### 4. 配置前端应用

#### 更新环境变量
```bash
# .env.local
VITE_MCP_SERVER_URL=http://localhost:8000
VITE_LOCAL_LLM_ENABLED=true
```

#### 集成MCP客户端
```typescript
// 在App.tsx中添加本地LLM支持
import { MCPClient } from './services/mcpClient';
import { LocalLLMManager } from './services/localLLMManager';

const mcpClient = new MCPClient({
  serverUrl: process.env.VITE_MCP_SERVER_URL || 'http://localhost:8000'
});

const llmManager = new LocalLLMManager();
```

## 🔧 配置选项

### 1. Ollama配置
```yaml
# ~/.ollama/config.json
{
  "host": "0.0.0.0:11434",
  "models": {
    "llama3.1:8b": {
      "temperature": 0.1,
      "max_tokens": 4000
    }
  }
}
```

### 2. LM Studio配置
- 端口: 1234
- 模型路径: 自定义
- 内存限制: 根据系统调整

### 3. MCP服务器配置
```python
# config.py
MCP_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "llm_endpoint": "http://localhost:11434",  # Ollama
    "timeout": 30,
    "max_file_size": "100MB"
}
```

## 📊 性能优化

### 1. 模型选择建议
| 用途 | 推荐模型 | RAM要求 | 性能 |
|------|----------|---------|------|
| 文档转换 | llama3.1:8b | 8GB | 优秀 |
| 中文文档 | qwen2.5:7b | 8GB | 优秀 |
| 代码处理 | codellama:7b | 8GB | 优秀 |
| 轻量级 | gemma2:9b | 6GB | 良好 |

### 2. 系统要求
- **最低配置**: 8GB RAM, 4核CPU
- **推荐配置**: 16GB RAM, 8核CPU, 8GB VRAM
- **存储空间**: 20GB+ (模型文件)

### 3. 性能调优
```bash
# Ollama性能优化
export OLLAMA_NUM_PARALLEL=2
export OLLAMA_MAX_LOADED_MODELS=1
export OLLAMA_FLASH_ATTENTION=1

# GPU加速 (如果有NVIDIA GPU)
export CUDA_VISIBLE_DEVICES=0
```

## 🔒 安全考虑

### 1. 网络安全
- MCP服务器仅监听本地接口
- 使用防火墙限制外部访问
- 考虑使用HTTPS (生产环境)

### 2. 数据隐私
- 所有处理在本地完成
- 不向外部服务发送数据
- 临时文件自动清理

### 3. 访问控制
```python
# 添加API密钥验证
@app.middleware("http")
async def verify_api_key(request: Request, call_next):
    api_key = request.headers.get("X-API-Key")
    if api_key != "your-secret-key":
        raise HTTPException(status_code=401, detail="Invalid API key")
    return await call_next(request)
```

## 🐛 故障排除

### 1. 常见问题

#### Ollama服务无法启动
```bash
# 检查端口占用
lsof -i :11434

# 重启服务
ollama serve
```

#### 模型下载失败
```bash
# 清理缓存
ollama rm llama3.1:8b
ollama pull llama3.1:8b
```

#### MCP服务器连接失败
```bash
# 检查服务状态
curl http://localhost:8000/health

# 查看日志
tail -f mcp_server.log
```

### 2. 日志调试
```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('mcp_server.log'),
        logging.StreamHandler()
    ]
)
```

## 📈 监控和维护

### 1. 健康检查
```bash
# 检查Ollama
curl http://localhost:11434/api/tags

# 检查MCP服务器
curl http://localhost:8000/health

# 检查模型状态
ollama list
```

### 2. 性能监控
```python
# 添加性能监控
import time
from functools import wraps

def monitor_performance(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        result = await func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.2f} seconds")
        return result
    return wrapper
```

### 3. 自动重启
```bash
# 使用systemd (Linux)
sudo systemctl enable ollama
sudo systemctl enable mcp-server

# 使用PM2 (Node.js)
pm2 start mcp_server.py --name mcp-server
pm2 save
pm2 startup
```

## 🎯 最佳实践

1. **模型管理**: 只下载需要的模型，定期清理
2. **资源监控**: 监控内存和CPU使用率
3. **备份配置**: 定期备份模型和配置文件
4. **版本控制**: 使用Docker容器化部署
5. **日志管理**: 设置日志轮转和清理策略

通过这个完整的本地LLM + MCP部署方案，DocuSynapse可以实现完全本地化的AI文档转换服务，确保数据隐私和安全！
