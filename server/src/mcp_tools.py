# MCP Tools Manager
import json
import logging
from typing import Dict, Any, List, Optional
from pathlib import Path

logger = logging.getLogger(__name__)

class MCPToolManager:
    """Manage MCP tools and resources"""
    
    def __init__(self):
        self.tools: Dict[str, Dict[str, Any]] = {}
        self.resources: Dict[str, Dict[str, Any]] = {}
    
    def register_default_tools(self):
        """Register default MCP tools"""
        # Document conversion tool
        self.tools["convert_document"] = {
            "name": "convert_document",
            "description": "Convert document between formats with AI assistance",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Path to the input file"
                    },
                    "target_format": {
                        "type": "string",
                        "enum": ["pdf", "docx", "txt", "html"],
                        "description": "Target format for conversion"
                    },
                    "preserve_formatting": {
                        "type": "boolean",
                        "default": True,
                        "description": "Whether to preserve original formatting"
                    },
                    "extract_tables": {
                        "type": "boolean",
                        "default": True,
                        "description": "Whether to extract and preserve tables"
                    },
                    "extract_images": {
                        "type": "boolean",
                        "default": True,
                        "description": "Whether to extract and preserve images"
                    },
                    "language": {
                        "type": "string",
                        "default": "auto",
                        "description": "Document language (auto-detect if 'auto')"
                    }
                },
                "required": ["file_path", "target_format"]
            }
        }
        
        # OCR tool
        self.tools["ocr_document"] = {
            "name": "ocr_document",
            "description": "Extract text from scanned documents using OCR",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Path to the image/PDF file"
                    },
                    "language": {
                        "type": "string",
                        "default": "eng",
                        "description": "OCR language code"
                    }
                },
                "required": ["file_path"]
            }
        }
        
        # Document analysis tool
        self.tools["analyze_document"] = {
            "name": "analyze_document",
            "description": "Analyze document structure and content",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "file_path": {
                        "type": "string",
                        "description": "Path to the document file"
                    },
                    "analysis_type": {
                        "type": "string",
                        "enum": ["structure", "content", "metadata", "all"],
                        "default": "all",
                        "description": "Type of analysis to perform"
                    }
                },
                "required": ["file_path"]
            }
        }
        
        logger.info(f"Registered {len(self.tools)} MCP tools")
    
    def register_tool(self, tool: Dict[str, Any]):
        """Register a new MCP tool"""
        tool_name = tool["name"]
        self.tools[tool_name] = tool
        logger.info(f"Registered tool: {tool_name}")
    
    def list_tools(self) -> List[Dict[str, Any]]:
        """List all registered tools"""
        return list(self.tools.values())
    
    def get_tool(self, tool_name: str) -> Optional[Dict[str, Any]]:
        """Get a specific tool by name"""
        return self.tools.get(tool_name)
    
    def get_tools_count(self) -> int:
        """Get the number of registered tools"""
        return len(self.tools)
    
    async def call_tool(self, tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        """Call a specific tool with arguments"""
        tool = self.get_tool(tool_name)
        if not tool:
            raise ValueError(f"Tool '{tool_name}' not found")
        
        logger.info(f"Calling tool: {tool_name}")
        
        # Import here to avoid circular imports
        from document_converter import DocumentConverter
        from llm_client import LLMClient
        
        converter = DocumentConverter()
        llm_client = LLMClient()
        
        try:
            if tool_name == "convert_document":
                return await converter.convert_document(**args)
            elif tool_name == "ocr_document":
                return await converter.ocr_document(**args)
            elif tool_name == "analyze_document":
                return await converter.analyze_document(**args)
            else:
                raise ValueError(f"Unknown tool: {tool_name}")
        except Exception as e:
            logger.error(f"Tool execution error: {e}")
            raise
    
    def register_resource(self, resource: Dict[str, Any]):
        """Register a new MCP resource"""
        resource_uri = resource["uri"]
        self.resources[resource_uri] = resource
        logger.info(f"Registered resource: {resource_uri}")
    
    def list_resources(self) -> List[Dict[str, Any]]:
        """List all registered resources"""
        return list(self.resources.values())
    
    async def read_resource(self, uri: str) -> List[Dict[str, Any]]:
        """Read a specific resource"""
        resource = self.resources.get(uri)
        if not resource:
            raise ValueError(f"Resource '{uri}' not found")
        
        # For now, return basic resource info
        # In a real implementation, this would read actual resource content
        return [{
            "uri": uri,
            "mimeType": resource.get("mimeType", "text/plain"),
            "text": f"Resource content for {uri}"
        }]
