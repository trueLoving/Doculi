# Document Converter for AI-powered document conversion
import os
import json
import logging
from typing import Dict, Any, Optional
from pathlib import Path
import aiofiles
from config import DOCUMENT_CONFIG, MCP_CONFIG

logger = logging.getLogger(__name__)

class DocumentConverter:
    """AI-powered document converter"""
    
    def __init__(self):
        self.llm_client = None  # Will be injected
        self.supported_formats = DOCUMENT_CONFIG["supported_formats"]
    
    def set_llm_client(self, llm_client):
        """Set the LLM client"""
        self.llm_client = llm_client
    
    async def convert_document(
        self,
        file_path: str,
        target_format: str,
        preserve_formatting: bool = True,
        extract_tables: bool = True,
        extract_images: bool = True,
        language: str = "auto"
    ) -> Dict[str, Any]:
        """Convert document to target format"""
        try:
            if not self.llm_client:
                raise Exception("LLM client not initialized")
            
            # Validate target format
            if target_format not in self.supported_formats:
                raise ValueError(f"Unsupported target format: {target_format}")
            
            # Read file content
            file_content = await self._read_file(file_path)
            file_name = Path(file_path).name
            file_extension = Path(file_path).suffix.lower()
            
            # Build conversion prompt
            prompt = self._build_conversion_prompt(
                file_content=file_content,
                file_name=file_name,
                file_extension=file_extension,
                target_format=target_format,
                preserve_formatting=preserve_formatting,
                extract_tables=extract_tables,
                extract_images=extract_images,
                language=language
            )
            
            # Call LLM for conversion
            ai_response = await self.llm_client.generate_text(prompt)
            
            # Parse AI response
            result = self._parse_conversion_response(
                ai_response, file_name, target_format
            )
            
            logger.info(f"Document converted successfully: {file_name} -> {target_format}")
            return result
            
        except Exception as e:
            logger.error(f"Document conversion failed: {e}")
            raise
    
    async def ocr_document(
        self,
        file_path: str,
        language: str = "eng"
    ) -> Dict[str, Any]:
        """Extract text from scanned document using OCR"""
        try:
            if not self.llm_client:
                raise Exception("LLM client not initialized")
            
            # For now, we'll use a simple approach
            # In a real implementation, you'd use OCR libraries like Tesseract
            
            file_content = await self._read_file(file_path)
            file_name = Path(file_path).name
            
            prompt = f"""请从以下图像/PDF文件中提取文本内容。
            
文件: {file_name}
语言: {language}

请提取所有可见的文本，保持原有的格式和结构。
如果遇到表格，请用表格格式表示。
如果遇到列表，请用列表格式表示。

提取的文本内容："""
            
            # Call LLM for OCR
            extracted_text = await self.llm_client.generate_text(prompt)
            
            return {
                "success": True,
                "extracted_text": extracted_text,
                "file_name": file_name,
                "language": language,
                "confidence": 0.8
            }
            
        except Exception as e:
            logger.error(f"OCR failed: {e}")
            raise
    
    async def analyze_document(
        self,
        file_path: str,
        analysis_type: str = "all"
    ) -> Dict[str, Any]:
        """Analyze document structure and content"""
        try:
            if not self.llm_client:
                raise Exception("LLM client not initialized")
            
            file_content = await self._read_file(file_path)
            file_name = Path(file_path).name
            
            # Use LLM client's analysis method
            analysis_result = await self.llm_client.analyze_document_content(
                file_content, analysis_type
            )
            
            return {
                "success": True,
                "file_name": file_name,
                "analysis_type": analysis_type,
                "result": analysis_result
            }
            
        except Exception as e:
            logger.error(f"Document analysis failed: {e}")
            raise
    
    async def _read_file(self, file_path: str) -> str:
        """Read file content"""
        try:
            async with aiofiles.open(file_path, 'rb') as f:
                content = await f.read()
                
            # For text files, decode as UTF-8
            if file_path.endswith(('.txt', '.md', '.json', '.html', '.xml')):
                return content.decode('utf-8')
            else:
                # For binary files, encode as base64
                import base64
                return base64.b64encode(content).decode('utf-8')
                
        except Exception as e:
            logger.error(f"Error reading file {file_path}: {e}")
            raise
    
    def _build_conversion_prompt(
        self,
        file_content: str,
        file_name: str,
        file_extension: str,
        target_format: str,
        preserve_formatting: bool,
        extract_tables: bool,
        extract_images: bool,
        language: str
    ) -> str:
        """Build prompt for document conversion"""
        
        prompt = f"""请将以下{file_extension}文件转换为{target_format}格式。

文件名称: {file_name}
目标格式: {target_format}

转换要求:
1. 格式保留: {"保留原始字体样式、段落结构、缩进和标题层级" if preserve_formatting else "保持基本结构"}
2. 内容提取: {"识别并保留表格结构" if extract_tables else ""} {"识别图片位置和描述" if extract_images else ""}
3. 语言处理: {"主要语言为" + language if language != "auto" else "保持中英文混排的正确性"}

文件内容:
{file_content}

请确保转换后的内容准确、完整，格式规范。

请以JSON格式返回结果，包含以下字段:
- content: 转换后的内容
- metadata: 文档元数据
- tables: 提取的表格数据(如果有)
- images: 图片描述(如果有)
- confidence: 转换置信度(0-1)
"""
        
        return prompt
    
    def _parse_conversion_response(
        self,
        response: str,
        file_name: str,
        target_format: str
    ) -> Dict[str, Any]:
        """Parse AI conversion response"""
        try:
            # Try to parse JSON response
            parsed = json.loads(response)
            
            if "content" in parsed:
                return {
                    "success": True,
                    "data": self._convert_content_to_format(parsed["content"], target_format),
                    "file_name": self._generate_output_filename(file_name, target_format),
                    "confidence": parsed.get("confidence", 0.9),
                    "extracted_elements": {
                        "tables": parsed.get("tables", []),
                        "images": parsed.get("images", []),
                        "headers": parsed.get("headers", []),
                        "lists": parsed.get("lists", [])
                    }
                }
            else:
                # If no content field, use the whole response
                return {
                    "success": True,
                    "data": self._convert_content_to_format(response, target_format),
                    "file_name": self._generate_output_filename(file_name, target_format),
                    "confidence": 0.7
                }
                
        except json.JSONDecodeError:
            # If not JSON, treat as plain text
            return {
                "success": True,
                "data": self._convert_content_to_format(response, target_format),
                "file_name": self._generate_output_filename(file_name, target_format),
                "confidence": 0.7
            }
    
    def _convert_content_to_format(self, content: str, target_format: str) -> bytes:
        """Convert content to target format bytes"""
        if target_format == "txt":
            return content.encode('utf-8')
        elif target_format == "html":
            # Convert to HTML format
            html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Converted Document</title>
</head>
<body>
    <pre>{content}</pre>
</body>
</html>"""
            return html_content.encode('utf-8')
        else:
            # For other formats, return as text for now
            return content.encode('utf-8')
    
    def _generate_output_filename(self, original_name: str, target_format: str) -> str:
        """Generate output filename"""
        base_name = Path(original_name).stem
        return f"{base_name}_converted.{target_format}"
