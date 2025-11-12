import { EventEmitter } from 'events';

// MCP客户端配置
export interface MCPClientConfig {
  serverUrl: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

// MCP工具调用结果
export interface MCPToolResult {
  success: boolean;
  data?: any;
  error?: string;
  confidence?: number;
  extractedElements?: {
    tables: any[];
    images: any[];
    headers: any[];
    lists: any[];
  };
}

// 本地LLM状态
export interface LocalLLMStatus {
  isConnected: boolean;
  model: string;
  provider: string;
  endpoint: string;
  availableModels: string[];
  lastError?: string;
}

class MCPClient extends EventEmitter {
  private config: MCPClientConfig;
  private isConnected: boolean = false;
  private messageId: number = 0;
  private pendingRequests: Map<string | number, { resolve: Function; reject: Function }> =
    new Map();

  constructor(config: MCPClientConfig) {
    super();
    this.config = config;
  }

  // 连接到MCP服务器
  async connect(): Promise<void> {
    try {
      // 测试连接
      await this.ping();
      this.isConnected = true;
      this.emit('connected');
      console.log('MCP客户端已连接到服务器');
    } catch (error) {
      this.isConnected = false;
      this.emit('error', error);
      throw new Error(`无法连接到MCP服务器: ${error}`);
    }
  }

  // 断开连接
  async disconnect(): Promise<void> {
    this.isConnected = false;
    this.emit('disconnected');
    console.log('MCP客户端已断开连接');
  }

  // 测试连接
  private async ping(): Promise<void> {
    const response = await this.sendRequest('ping', {});
    if (!response) {
      throw new Error('服务器无响应');
    }
  }

  // 发送MCP请求
  private async sendRequest(method: string, params: any): Promise<any> {
    const id = ++this.messageId;
    const message = {
      jsonrpc: '2.0' as const,
      id,
      method,
      params,
    };

    return new Promise((resolve, reject) => {
      // 设置超时
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id);
        reject(new Error('请求超时'));
      }, this.config.timeout || 30000);

      // 存储请求
      this.pendingRequests.set(id, {
        resolve: (result: any) => {
          clearTimeout(timeout);
          resolve(result);
        },
        reject: (error: any) => {
          clearTimeout(timeout);
          reject(error);
        },
      });

      // 发送请求到MCP服务器
      this.sendToServer(message);
    });
  }

  // 发送消息到服务器
  private async sendToServer(message: any): Promise<void> {
    try {
      // 连接到server文件夹中的MCP服务器
      const response = await fetch(`${this.config.serverUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
        signal: AbortSignal.timeout(this.config.timeout || 30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.statusText}`);
      }

      const result = await response.json();
      this.handleResponse(result);
    } catch (error) {
      // 处理网络错误，尝试重试
      await this.handleRetry(message, error);
    }
  }

  // 处理服务器响应
  private handleResponse(response: any): void {
    const { id, result, error } = response;
    const pendingRequest = this.pendingRequests.get(id);

    if (pendingRequest) {
      this.pendingRequests.delete(id);

      if (error) {
        pendingRequest.reject(new Error(error.message || '服务器错误'));
      } else {
        pendingRequest.resolve(result);
      }
    }
  }

  // 处理重试逻辑
  private async handleRetry(message: any, error: any): Promise<void> {
    const retryAttempts = this.config.retryAttempts || 3;
    const retryDelay = this.config.retryDelay || 1000;

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
        await this.sendToServer(message);
        return;
      } catch (retryError) {
        if (attempt === retryAttempts) {
          const pendingRequest = this.pendingRequests.get(message.id);
          if (pendingRequest) {
            this.pendingRequests.delete(message.id);
            pendingRequest.reject(error);
          }
        }
      }
    }
  }

  // 获取可用工具列表
  async getAvailableTools(): Promise<any[]> {
    const response = await this.sendRequest('tools/list', {});
    return response?.tools || [];
  }

  // 调用工具
  async callTool(toolName: string, args: any): Promise<MCPToolResult> {
    try {
      const response = await this.sendRequest('tools/call', {
        name: toolName,
        arguments: args,
      });

      return {
        success: true,
        data: response?.content,
        confidence: response?.confidence,
        extractedElements: response?.extractedElements,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  // 文档转换工具调用 - 直接调用server API
  async convertDocument(
    file: File,
    options: {
      targetFormat: 'pdf' | 'docx' | 'txt' | 'html';
      preserveFormatting?: boolean;
      extractTables?: boolean;
      extractImages?: boolean;
      language?: string;
    }
  ): Promise<MCPToolResult> {
    try {
      // 使用FormData直接上传文件到server
      const formData = new FormData();
      formData.append('file', file);
      formData.append('target_format', options.targetFormat);
      formData.append('preserve_formatting', String(options.preserveFormatting ?? true));
      formData.append('extract_tables', String(options.extractTables ?? true));
      formData.append('extract_images', String(options.extractImages ?? true));
      formData.append('language', options.language || 'auto');

      const response = await fetch(`${this.config.serverUrl}/api/convert`, {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(this.config.timeout || 30000),
      });

      if (!response.ok) {
        throw new Error(`转换失败: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result.data,
        confidence: result.confidence,
        extractedElements: result.extractedElements,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '文档转换失败',
      };
    }
  }

  // 获取本地LLM状态 - 直接调用server API
  async getLocalLLMStatus(): Promise<LocalLLMStatus> {
    try {
      const response = await fetch(`${this.config.serverUrl}/api/status`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`状态获取失败: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        isConnected: data.llm?.available || false,
        model: data.llm?.current_model || 'unknown',
        provider: data.llm?.provider || 'unknown',
        endpoint: data.llm?.endpoint || '',
        availableModels: await this.getAvailableModels(),
        lastError: undefined,
      };
    } catch (error) {
      return {
        isConnected: false,
        model: 'unknown',
        provider: 'unknown',
        endpoint: '',
        availableModels: [],
        lastError: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  // 获取可用模型列表
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.config.serverUrl}/api/models`, {
        method: 'GET',
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`模型列表获取失败: ${response.statusText}`);
      }

      const data = await response.json();
      return data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      console.error('获取模型列表失败:', error);
      return [];
    }
  }

  // 检查连接状态
  isServerConnected(): boolean {
    return this.isConnected;
  }

  // 获取客户端状态
  getStatus(): { isConnected: boolean; pendingRequests: number } {
    return {
      isConnected: this.isConnected,
      pendingRequests: this.pendingRequests.size,
    };
  }
}

export { MCPClient };
