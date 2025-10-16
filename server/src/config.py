# MCP Server Configuration
MCP_CONFIG = {
    "host": "0.0.0.0",
    "port": 8000,
    "llm_endpoint": "http://localhost:11434",  # Ollama default
    "lmstudio_endpoint": "http://localhost:1234",  # LM Studio default
    "timeout": 30,
    "max_file_size": "100MB",
    "upload_dir": "./uploads",
    "temp_dir": "./temp",
    "log_dir": "./logs",
    "cors_origins": ["*"],  # Configure for production
    "api_key": None,  # Set API key for production
}

# LLM Model Configuration
LLM_MODELS = {
    "ollama": {
        "default_model": "llama3.1:8b",
        "supported_models": [
            "llama3.1:8b",
            "llama3.1:70b", 
            "qwen2.5:7b",
            "qwen2.5:14b",
            "gemma2:9b",
            "codellama:7b",
            "mistral:7b",
            "phi3:3.8b"
        ]
    },
    "lmstudio": {
        "default_model": "llama-3.1-8b-instruct",
        "supported_models": [
            "llama-3.1-8b-instruct",
            "llama-3.1-70b-instruct",
            "qwen2.5-7b-instruct",
            "qwen2.5-14b-instruct",
            "gemma-2-9b-it",
            "codellama-7b-instruct",
            "mistral-7b-instruct",
            "phi-3-mini-4k-instruct"
        ]
    }
}

# Document Conversion Settings
DOCUMENT_CONFIG = {
    "supported_formats": ["pdf", "docx", "txt", "html"],
    "max_pages": 100,
    "ocr_enabled": True,
    "table_extraction": True,
    "image_extraction": True,
    "preserve_formatting": True
}
