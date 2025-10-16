import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';

// MCP协议消息类型
export interface MCPMessage {
  jsonrpc: '2.0';
  id?: string | number;
  method?: string;
  params?: any;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// MCP工具定义
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

// MCP资源定义
export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

// 本地LLM配置
export interface LocalLLMConfig {
  provider: 'ollama' | 'lmstudio' | 'custom';
  model: string;
  endpoint: string;
  apiKey?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

// 文档转换工具
export interface DocumentConversionTool {
  name: 'convert_document';
  description: 'Convert document between formats with AI assistance';
  inputSchema: {
    type: 'object';
    properties: {
      file_path: { type: 'string'; description: 'Path to the input file' };
      target_format: { type: 'string'; enum: ['pdf', 'docx', 'txt', 'html'] };
      preserve_formatting: { type: 'boolean'; default: true };
      extract_tables: { type: 'boolean'; default: true };
      extract_images: { type: 'boolean'; default: true };
      language: { type: 'string'; default: 'auto' };
    };
    required: ['file_path', 'target_format'];
  };
}

class MCPServer extends EventEmitter {
  private tools: Map<string, MCPTool> = new Map();
  private resources: Map<string, MCPResource> = new Map();
  private llmConfig: LocalLLMConfig;
  private isRunning: boolean = false;

  constructor(config: LocalLLMConfig) {
    super();
    this.llmConfig = config;
    this.registerDefaultTools();
  }

  // 注册默认工具
  private registerDefaultTools() {
    const documentTool: DocumentConversionTool = {
      name: 'convert_document',
      description: 'Convert document between formats with AI assistance',
      inputSchema: {
        type: 'object',
        properties: {
          file_path: { type: 'string', description: 'Path to the input file' },
          target_format: { type: 'string', enum: ['pdf', 'docx', 'txt', 'html'] },
          preserve_formatting: { type: 'boolean', default: true },
          extract_tables: { type: 'boolean', default: true },
          extract_images: { type: 'boolean', default: true },
          language: { type: 'string', default: 'auto' }
        },
        required: ['file_path', 'target_format']
      }
    };

    this.tools.set(documentTool.name, documentTool);
  }

  // 启动MCP服务器
  async start(): Promise<void> {
    if (this.isRunning) {
      throw new Error('MCP服务器已在运行');
    }

    try {
      // 检查本地LLM服务是否可用
      await this.checkLLMService();
      
      this.isRunning = true;
      this.emit('started');
      console.log('MCP服务器已启动');
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  // 检查本地LLM服务
  private async checkLLMService(): Promise<void> {
    try {
      const response = await fetch(`${this.llmConfig.endpoint}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.llmConfig.apiKey && { 'Authorization': `Bearer ${this.llmConfig.apiKey}` })
        },
        signal: AbortSignal.timeout(this.llmConfig.timeout || 5000)
      });

      if (!response.ok) {
        throw new Error(`LLM服务不可用: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('本地LLM服务可用，模型列表:', data.models?.map((m: any) => m.name) || []);
    } catch (error) {
      throw new Error(`无法连接到本地LLM服务: ${error}`);
    }
  }

  // 处理MCP消息
  async handleMessage(message: MCPMessage): Promise<MCPMessage> {
    try {
      switch (message.method) {
        case 'tools/list':
          return this.handleToolsList(message);
        case 'tools/call':
          return this.handleToolCall(message);
        case 'resources/list':
          return this.handleResourcesList(message);
        case 'resources/read':
          return this.handleResourceRead(message);
        default:
          return this.createErrorResponse(message.id, -32601, 'Method not found');
      }
    } catch (error) {
      return this.createErrorResponse(message.id, -32603, 'Internal error', error);
    }
  }

  // 处理工具列表请求
  private handleToolsList(message: MCPMessage): MCPMessage {
    const tools = Array.from(this.tools.values());
    return {
      jsonrpc: '2.0',
      id: message.id,
      result: { tools }
    };
  }

  // 处理工具调用
  private async handleToolCall(message: MCPMessage): Promise<MCPMessage> {
    const { name, arguments: args } = message.params;
    const tool = this.tools.get(name);

    if (!tool) {
      return this.createErrorResponse(message.id, -32601, 'Tool not found');
    }

    try {
      let result;
      switch (name) {
        case 'convert_document':
          result = await this.convertDocument(args);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        jsonrpc: '2.0',
        id: message.id,
        result: { content: result }
      };
    } catch (error) {
      return this.createErrorResponse(message.id, -32603, 'Tool execution failed', error);
    }
  }

  // 文档转换工具实现
  private async convertDocument(args: any): Promise<any> {
    const { file_path, target_format, preserve_formatting, extract_tables, extract_images, language } = args;

    try {
      // 读取文件
      const fileBuffer = fs.readFileSync(file_path);
      const fileName = path.basename(file_path);
      const fileExtension = path.extname(file_path).toLowerCase();

      // 构建AI提示词
      const prompt = this.buildDocumentConversionPrompt({
        fileName,
        fileExtension,
        targetFormat: target_format,
        preserveFormatting: preserve_formatting,
        extractTables: extract_tables,
        extractImages: extract_images,
        language
      });

      // 调用本地LLM
      const aiResponse = await this.callLocalLLM(prompt, fileBuffer);

      // 解析AI响应并生成结果
      const result = this.parseAIResponse(aiResponse, fileName, target_format);

      return {
        success: true,
        data: result.data,
        fileName: result.fileName,
        confidence: result.confidence,
        extractedElements: result.extractedElements
      };
    } catch (error) {
      throw new Error(`文档转换失败: ${error}`);
    }
  }

  // 构建文档转换提示词
  private buildDocumentConversionPrompt(options: {
    fileName: string;
    fileExtension: string;
    targetFormat: string;
    preserveFormatting: boolean;
    extractTables: boolean;
    extractImages: boolean;
    language: string;
  }): string {
    const { fileExtension, targetFormat, preserveFormatting, extractTables, extractImages, language } = options;

    return `请分析这个${fileExtension}文件并将其转换为${targetFormat}格式。

要求：
1. **格式保留**：${preserveFormatting ? '保留原始字体样式、段落结构、缩进和标题层级' : '保持基本结构'}
2. **内容提取**：${extractTables ? '识别并保留表格结构' : ''} ${extractImages ? '识别图片位置和描述' : ''}
3. **语言处理**：${language !== 'auto' ? `主要语言为${language}` : '保持中英文混排的正确性'}
4. **输出格式**：以JSON格式返回结果

请确保转换后的内容准确、完整，格式规范。`;
  }

  // 调用本地LLM
  private async callLocalLLM(prompt: string, fileBuffer?: Buffer): Promise<string> {
    const requestBody: any = {
      model: this.llmConfig.model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: this.llmConfig.temperature || 0.1,
        num_predict: this.llmConfig.maxTokens || 4000
      }
    };

    // 如果有文件内容，添加到请求中
    if (fileBuffer) {
      requestBody.context = fileBuffer.toString('base64');
    }

    const response = await fetch(`${this.llmConfig.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.llmConfig.apiKey && { 'Authorization': `Bearer ${this.llmConfig.apiKey}` })
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(this.llmConfig.timeout || 30000)
    });

    if (!response.ok) {
      throw new Error(`LLM调用失败: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || '';
  }

  // 解析AI响应
  private parseAIResponse(response: string, fileName: string, targetFormat: string): any {
    try {
      // 尝试解析JSON响应
      const parsed = JSON.parse(response);
      
      if (parsed.content) {
        return {
          data: this.convertContentToFormat(parsed.content),
          fileName: this.generateFileName(fileName, targetFormat),
          confidence: parsed.confidence || 0.9,
          extractedElements: {
            tables: parsed.tables || [],
            images: parsed.images || [],
            headers: parsed.headers || [],
            lists: parsed.lists || []
          }
        };
      }
    } catch (error) {
      // 如果不是JSON格式，使用原始响应
      return {
        data: this.convertContentToFormat(response),
        fileName: this.generateFileName(fileName, targetFormat),
        confidence: 0.7
      };
    }
  }

  // 转换内容为目标格式
  private convertContentToFormat(content: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(content);
  }

  // 生成文件名
  private generateFileName(originalName: string, targetFormat: string): string {
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    return `${baseName}_local_ai_converted.${targetFormat}`;
  }

  // 处理资源列表请求
  private handleResourcesList(message: MCPMessage): MCPMessage {
    const resources = Array.from(this.resources.values());
    return {
      jsonrpc: '2.0',
      id: message.id,
      result: { resources }
    };
  }

  // 处理资源读取请求
  private handleResourceRead(message: MCPMessage): MCPMessage {
    const { uri } = message.params;
    const resource = this.resources.get(uri);

    if (!resource) {
      return this.createErrorResponse(message.id, -32601, 'Resource not found');
    }

    return {
      jsonrpc: '2.0',
      id: message.id,
      result: { contents: [{ uri, mimeType: resource.mimeType || 'text/plain' }] }
    };
  }

  // 创建错误响应
  private createErrorResponse(id: string | number | undefined, code: number, message: string, data?: any): MCPMessage {
    return {
      jsonrpc: '2.0',
      id,
      error: { code, message, data }
    };
  }

  // 停止MCP服务器
  async stop(): Promise<void> {
    this.isRunning = false;
    this.emit('stopped');
    console.log('MCP服务器已停止');
  }

  // 添加自定义工具
  addTool(tool: MCPTool): void {
    this.tools.set(tool.name, tool);
  }

  // 添加资源
  addResource(resource: MCPResource): void {
    this.resources.set(resource.uri, resource);
  }

  // 获取服务器状态
  getStatus(): { isRunning: boolean; toolsCount: number; resourcesCount: number } {
    return {
      isRunning: this.isRunning,
      toolsCount: this.tools.size,
      resourcesCount: this.resources.size
    };
  }
}

export { MCPServer };
