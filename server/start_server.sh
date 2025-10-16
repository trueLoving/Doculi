#!/bin/bash

# DocuSynapse Server Startup Script

set -e

echo "Starting DocuSynapse Server..."

# Create necessary directories
mkdir -p logs uploads temp

# Check if Python dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Check if Ollama is available
if command -v ollama &> /dev/null; then
    echo "Ollama found, starting service..."
    ollama serve &
    OLLAMA_PID=$!
    
    # Wait for Ollama to be ready
    echo "Waiting for Ollama to be ready..."
    for i in {1..30}; do
        if curl -s http://localhost:11434/api/tags > /dev/null; then
            echo "Ollama is ready!"
            break
        fi
        echo "Waiting for Ollama... ($i/30)"
        sleep 2
    done
    
    # Download default model if not exists
    if ! ollama list | grep -q "llama3.1:8b"; then
        echo "Downloading default model llama3.1:8b..."
        ollama pull llama3.1:8b
    fi
else
    echo "Ollama not found, please install it first"
    echo "Visit: https://ollama.ai/"
fi

# Start MCP server
echo "Starting MCP server..."
python src/ssmcp_server.py &
MCP_PID=$!

# Wait for MCP server to be ready
echo "Waiting for MCP server to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:8000/health > /dev/null; then
        echo "MCP server is ready!"
        break
    fi
    echo "Waiting for MCP server... ($i/30)"
    sleep 2
done

echo "DocuSynapse Server is ready!"
echo "MCP Server: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/health"

# Keep script running
wait
