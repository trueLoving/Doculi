# LLM Client for Local LLM Services
import json
import logging
import asyncio
from typing import Dict, Any, List, Optional
import aiohttp
from config import LLM_MODELS, MCP_CONFIG

logger = logging.getLogger(__name__)

class LLMClient:
    """Client for interacting with local LLM services"""
    
    def __init__(self):
        self.current_provider = "ollama"
        self.current_model = None
        self.endpoints = {
            "ollama": MCP_CONFIG["llm_endpoint"],
            "lmstudio": MCP_CONFIG["lmstudio_endpoint"]
        }
    
    async def check_availability(self) -> bool:
        """Check if LLM service is available"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.endpoints[self.current_provider]}/api/tags",
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    return response.status == 200
        except Exception as e:
            logger.warning(f"LLM service not available: {e}")
            return False
    
    async def get_status(self) -> Dict[str, Any]:
        """Get LLM service status"""
        try:
            is_available = await self.check_availability()
            models = await self.get_available_models() if is_available else []
            
            return {
                "available": is_available,
                "provider": self.current_provider,
                "endpoint": self.endpoints[self.current_provider],
                "current_model": self.current_model,
                "models_count": len(models)
            }
        except Exception as e:
            logger.error(f"Error getting LLM status: {e}")
            return {
                "available": False,
                "error": str(e)
            }
    
    async def get_available_models(self) -> List[Dict[str, Any]]:
        """Get list of available models"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.endpoints[self.current_provider]}/api/tags",
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        models = []
                        
                        for model in data.get("models", []):
                            models.append({
                                "name": model["name"],
                                "size": self._format_bytes(model.get("size", 0)),
                                "modified_at": model.get("modified_at"),
                                "details": model.get("details", {})
                            })
                        
                        return models
                    else:
                        logger.error(f"Failed to get models: {response.status}")
                        return []
        except Exception as e:
            logger.error(f"Error getting available models: {e}")
            return []
    
    async def download_model(self, model_name: str) -> Dict[str, Any]:
        """Download a model"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.endpoints[self.current_provider]}/api/pull",
                    json={"name": model_name},
                    timeout=aiohttp.ClientTimeout(total=300)  # 5 minutes
                ) as response:
                    if response.status == 200:
                        # Handle streaming response for download progress
                        async for line in response.content:
                            if line:
                                try:
                                    data = json.loads(line.decode())
                                    if data.get("status") == "success":
                                        return {"success": True, "message": f"Model {model_name} downloaded successfully"}
                                except json.JSONDecodeError:
                                    continue
                        
                        return {"success": True, "message": f"Model {model_name} download completed"}
                    else:
                        error_text = await response.text()
                        raise Exception(f"Download failed: {error_text}")
        except Exception as e:
            logger.error(f"Error downloading model {model_name}: {e}")
            raise
    
    async def generate_text(
        self,
        prompt: str,
        model: Optional[str] = None,
        max_tokens: int = 4000,
        temperature: float = 0.1,
        context: Optional[str] = None
    ) -> str:
        """Generate text using the LLM"""
        try:
            model_name = model or self.current_model or LLM_MODELS[self.current_provider]["default_model"]
            
            request_body = {
                "model": model_name,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": temperature,
                    "num_predict": max_tokens
                }
            }
            
            # Add context if provided
            if context:
                request_body["context"] = context
            
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.endpoints[self.current_provider]}/api/generate",
                    json=request_body,
                    timeout=aiohttp.ClientTimeout(total=MCP_CONFIG["timeout"])
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get("response", "")
                    else:
                        error_text = await response.text()
                        raise Exception(f"Generation failed: {error_text}")
        except Exception as e:
            logger.error(f"Error generating text: {e}")
            raise
    
    async def analyze_document_content(
        self,
        content: str,
        analysis_type: str = "all"
    ) -> Dict[str, Any]:
        """Analyze document content using LLM"""
        try:
            prompt = self._build_analysis_prompt(content, analysis_type)
            response = await self.generate_text(prompt)
            
            # Try to parse JSON response
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                # If not JSON, return as text analysis
                return {
                    "analysis_type": analysis_type,
                    "content": response,
                    "format": "text"
                }
        except Exception as e:
            logger.error(f"Error analyzing document: {e}")
            raise
    
    def _build_analysis_prompt(self, content: str, analysis_type: str) -> str:
        """Build prompt for document analysis"""
        base_prompt = f"请分析以下文档内容，分析类型：{analysis_type}\n\n文档内容：\n{content}\n\n"
        
        if analysis_type == "structure":
            base_prompt += "请分析文档结构，包括标题层级、段落组织、列表等。"
        elif analysis_type == "content":
            base_prompt += "请分析文档内容，包括主题、关键信息、摘要等。"
        elif analysis_type == "metadata":
            base_prompt += "请提取文档元数据，包括作者、创建时间、关键词等。"
        else:  # all
            base_prompt += "请进行全面分析，包括结构、内容、元数据等。"
        
        base_prompt += "\n\n请以JSON格式返回结果，包含以下字段：\n- structure: 文档结构分析\n- content: 内容分析\n- metadata: 元数据\n- summary: 摘要\n- confidence: 分析置信度(0-1)"
        
        return base_prompt
    
    def _format_bytes(self, bytes_size: int) -> str:
        """Format bytes to human readable string"""
        if bytes_size == 0:
            return "0 B"
        
        size_names = ["B", "KB", "MB", "GB", "TB"]
        i = 0
        while bytes_size >= 1024 and i < len(size_names) - 1:
            bytes_size /= 1024.0
            i += 1
        
        return f"{bytes_size:.2f} {size_names[i]}"
    
    def set_provider(self, provider: str):
        """Set the current LLM provider"""
        if provider in self.endpoints:
            self.current_provider = provider
            logger.info(f"Switched to provider: {provider}")
        else:
            raise ValueError(f"Unknown provider: {provider}")
    
    def set_model(self, model: str):
        """Set the current model"""
        self.current_model = model
        logger.info(f"Switched to model: {model}")
