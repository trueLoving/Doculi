# DocuSynapse MCP Server
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import json
import asyncio
import os
import shutil
import tempfile
from typing import Dict, Any, Optional
from pathlib import Path
import logging
from datetime import datetime

from config import MCP_CONFIG, LLM_MODELS, DOCUMENT_CONFIG
from mcp_tools import MCPToolManager
from llm_client import LLMClient
from document_converter import DocumentConverter

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/mcp_server.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="DocuSynapse MCP Server",
    description="Model Context Protocol server for local LLM document conversion",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=MCP_CONFIG["cors_origins"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
tool_manager = MCPToolManager()
llm_client = LLMClient()
document_converter = DocumentConverter()

# Create necessary directories
for directory in [MCP_CONFIG["upload_dir"], MCP_CONFIG["temp_dir"], MCP_CONFIG["log_dir"]]:
    os.makedirs(directory, exist_ok=True)

@app.on_event("startup")
async def startup_event():
    """Initialize server on startup"""
    logger.info("Starting DocuSynapse MCP Server...")
    
    # Check LLM service availability
    try:
        await llm_client.check_availability()
        logger.info("LLM service is available")
    except Exception as e:
        logger.warning(f"LLM service not available: {e}")
    
    # Register default tools
    tool_manager.register_default_tools()
    logger.info("MCP Server started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down MCP Server...")
    # Cleanup temporary files
    await cleanup_temp_files()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "mcp-server",
        "timestamp": datetime.now().isoformat(),
        "llm_status": await llm_client.get_status()
    }

@app.get("/api/status")
async def get_status():
    """Get server status"""
    return {
        "server": "running",
        "tools": tool_manager.get_tools_count(),
        "llm": await llm_client.get_status(),
        "config": {
            "supported_formats": DOCUMENT_CONFIG["supported_formats"],
            "max_file_size": MCP_CONFIG["max_file_size"]
        }
    }

@app.post("/mcp")
async def handle_mcp_request(request: Dict[str, Any]):
    """Handle MCP protocol requests"""
    try:
        method = request.get("method")
        params = request.get("params", {})
        request_id = request.get("id")
        
        logger.info(f"Handling MCP request: {method}")
        
        if method == "tools/list":
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {"tools": tool_manager.list_tools()}
            }
        
        elif method == "tools/call":
            tool_name = params.get("name")
            tool_args = params.get("arguments", {})
            
            result = await tool_manager.call_tool(tool_name, tool_args)
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {"content": result}
            }
        
        elif method == "resources/list":
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {"resources": tool_manager.list_resources()}
            }
        
        elif method == "resources/read":
            uri = params.get("uri")
            content = await tool_manager.read_resource(uri)
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {"contents": content}
            }
        
        else:
            raise HTTPException(status_code=400, detail="Unknown method")
    
    except Exception as e:
        logger.error(f"MCP request error: {e}")
        return {
            "jsonrpc": "2.0",
            "id": request.get("id"),
            "error": {
                "code": -32603,
                "message": str(e)
            }
        }

@app.post("/api/convert")
async def convert_document(
    file: UploadFile = File(...),
    target_format: str = Form(...),
    preserve_formatting: bool = Form(True),
    extract_tables: bool = Form(True),
    extract_images: bool = Form(True),
    language: str = Form("auto")
):
    """Direct document conversion endpoint"""
    try:
        # Validate file format
        if target_format not in DOCUMENT_CONFIG["supported_formats"]:
            raise HTTPException(status_code=400, detail="Unsupported target format")
        
        # Save uploaded file
        temp_file_path = await save_uploaded_file(file)
        
        # Convert document
        result = await document_converter.convert_document(
            file_path=temp_file_path,
            target_format=target_format,
            preserve_formatting=preserve_formatting,
            extract_tables=extract_tables,
            extract_images=extract_images,
            language=language
        )
        
        # Cleanup temp file
        os.unlink(temp_file_path)
        
        return result
        
    except Exception as e:
        logger.error(f"Document conversion error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/models")
async def get_available_models():
    """Get available LLM models"""
    try:
        models = await llm_client.get_available_models()
        return {"models": models}
    except Exception as e:
        logger.error(f"Error getting models: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/models/{model_name}/download")
async def download_model(model_name: str):
    """Download a specific model"""
    try:
        result = await llm_client.download_model(model_name)
        return {"status": "success", "message": f"Model {model_name} download started"}
    except Exception as e:
        logger.error(f"Error downloading model {model_name}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

async def save_uploaded_file(file: UploadFile) -> str:
    """Save uploaded file to temporary location"""
    temp_dir = MCP_CONFIG["temp_dir"]
    temp_file_path = os.path.join(temp_dir, f"temp_{datetime.now().timestamp()}_{file.filename}")
    
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return temp_file_path

async def cleanup_temp_files():
    """Cleanup temporary files"""
    temp_dir = MCP_CONFIG["temp_dir"]
    if os.path.exists(temp_dir):
        for file in os.listdir(temp_dir):
            file_path = os.path.join(temp_dir, file)
            if os.path.isfile(file_path):
                try:
                    os.unlink(file_path)
                except Exception as e:
                    logger.warning(f"Could not delete temp file {file_path}: {e}")

if __name__ == "__main__":
    uvicorn.run(
        app,
        host=MCP_CONFIG["host"],
        port=MCP_CONFIG["port"],
        log_level="info"
    )
