import React, { useState, useEffect } from 'react';

// 本地LLM配置类型
interface LocalLLMConfig {
  provider: string;
  model: string;
  endpoint: string;
  apiKey?: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
  autoStart: boolean;
}

// LLM提供商类型
interface LocalLLMProvider {
  name: string;
  type: 'ollama' | 'lmstudio' | 'custom';
  endpoint: string;
  apiKey?: string;
  defaultModel: string;
  supportedModels: string[];
  description: string;
  requirements: {
    minRAM: string;
    minVRAM?: string;
    cpuCores: number;
  };
}

// LLM模型类型
interface LLMModel {
  name: string;
  size: string;
  parameters: string;
  description: string;
  downloadUrl?: string;
  isDownloaded: boolean;
  isRunning: boolean;
}

interface LocalLLMConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (config: LocalLLMConfig) => void;
  currentConfig?: LocalLLMConfig;
}

export const LocalLLMConfigDialog: React.FC<LocalLLMConfigDialogProps> = ({
  open,
  onClose,
  onSave,
  currentConfig,
}) => {
  const [providers, setProviders] = useState<LocalLLMProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [availableModels, setAvailableModels] = useState<LLMModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [config, setConfig] = useState<LocalLLMConfig>({
    provider: 'ollama',
    model: 'llama3.1:8b',
    endpoint: 'http://localhost:11434',
    maxTokens: 4000,
    temperature: 0.1,
    timeout: 30000,
    autoStart: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [systemResources, setSystemResources] = useState<any>(null);
  const [requirementsCheck, setRequirementsCheck] = useState<any>(null);

  useEffect(() => {
    if (open) {
      loadProviders();
      if (currentConfig) {
        setConfig(currentConfig);
        setSelectedProvider(currentConfig.provider);
        setSelectedModel(currentConfig.model);
      }
    }
  }, [open, currentConfig]);

  const loadProviders = async () => {
    try {
      // 模拟提供商列表
      const providerList: LocalLLMProvider[] = [
        {
          name: 'Ollama',
          type: 'ollama',
          endpoint: 'http://localhost:11434',
          defaultModel: 'llama3.1:8b',
          supportedModels: ['llama3.1:8b', 'qwen2.5:7b', 'gemma2:9b'],
          description: 'Ollama是一个本地LLM运行工具，支持多种开源模型',
          requirements: {
            minRAM: '8GB',
            cpuCores: 4,
          },
        },
      ];
      setProviders(providerList);

      // 模拟系统资源
      setSystemResources({
        ram: '16GB',
        vram: '8GB',
        cpuCores: 8,
        availableRAM: '12GB',
      });
    } catch (error) {
      setError(`加载提供商失败: ${error}`);
    }
  };

  const handleProviderChange = async (providerName: string) => {
    setSelectedProvider(providerName);
    setConfig((prev: LocalLLMConfig) => ({ ...prev, provider: providerName }));

    const provider = providers.find((p) => p.name === providerName);
    if (provider) {
      setConfig((prev: LocalLLMConfig) => ({ ...prev, endpoint: provider.endpoint }));

      // 模拟系统要求检查
      setRequirementsCheck({
        meetsRequirements: true,
        issues: [],
      });

      // 模拟加载可用模型
      try {
        setIsLoading(true);
        const models: LLMModel[] = [
          {
            name: 'llama3.1:8b',
            size: '4.7GB',
            parameters: '8B',
            description: 'Meta的Llama 3.1模型，强大的通用语言模型',
            isDownloaded: true,
            isRunning: false,
          },
        ];
        setAvailableModels(models);

        if (models.length > 0) {
          setSelectedModel(models[0].name);
          setConfig((prev: LocalLLMConfig) => ({ ...prev, model: models[0].name }));
        }
      } catch (error) {
        setError(`加载模型失败: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setConfig((prev: LocalLLMConfig) => ({ ...prev, model: modelName }));
  };

  const handleTestConnection = async () => {
    try {
      setIsLoading(true);
      setError('');

      // 模拟连接测试
      const isAvailable = true; // 模拟连接成功
      if (!isAvailable) {
        setError('无法连接到本地LLM服务，请确保服务正在运行');
        return;
      }

      const testResult = true; // 模拟测试成功
      if (testResult) {
        setError('');
        alert('连接测试成功！');
      } else {
        setError('连接测试失败，请检查配置');
      }
    } catch (error) {
      setError(`测试失败: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!selectedProvider || !selectedModel) {
      setError('请选择提供商和模型');
      return;
    }

    onSave(config);
    onClose();
  };

  const getProviderInfo = (provider: LocalLLMProvider) => {
    return {
      name: provider.name,
      description: provider.description,
      requirements: provider.requirements,
      endpoint: provider.endpoint,
    };
  };

  if (!open) return null;

  const selectedProviderInfo = providers.find((p) => p.name === selectedProvider);
  const providerInfo = selectedProviderInfo ? getProviderInfo(selectedProviderInfo) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">本地LLM配置</h2>
            <p className="text-sm text-gray-500">配置本地部署的大型语言模型</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* 系统资源信息 */}
            {systemResources && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">系统资源</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">RAM:</span>
                    <span className="ml-1 text-blue-600">{systemResources.ram}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">VRAM:</span>
                    <span className="ml-1 text-blue-600">{systemResources.vram || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">CPU核心:</span>
                    <span className="ml-1 text-blue-600">{systemResources.cpuCores}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">可用RAM:</span>
                    <span className="ml-1 text-blue-600">{systemResources.availableRAM}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 提供商选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">选择LLM提供商</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedProvider === provider.name
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleProviderChange(provider.name)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {provider.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{provider.description}</div>
                      <div className="text-xs text-gray-400">
                        最小要求: {provider.requirements.minRAM} RAM,{' '}
                        {provider.requirements.cpuCores} CPU核心
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 系统要求检查 */}
            {requirementsCheck && (
              <div
                className={`p-4 rounded-lg ${
                  requirementsCheck.meetsRequirements
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <h3
                  className={`font-medium mb-2 ${
                    requirementsCheck.meetsRequirements ? 'text-green-900' : 'text-red-900'
                  }`}
                >
                  系统要求检查
                </h3>
                {requirementsCheck.meetsRequirements ? (
                  <p className="text-green-700 text-sm">✓ 系统满足所有要求</p>
                ) : (
                  <div>
                    <p className="text-red-700 text-sm mb-2">⚠ 系统不满足以下要求:</p>
                    <ul className="text-red-600 text-sm list-disc list-inside">
                      {requirementsCheck.issues.map((issue: string, index: number) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 模型选择 */}
            {selectedProvider && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择模型</label>
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">加载模型中...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableModels.map((model) => (
                      <div
                        key={model.name}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedModel === model.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleModelChange(model.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{model.name}</div>
                            <div className="text-xs text-gray-500">{model.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-600">{model.size}</div>
                            <div className="text-xs text-gray-500">{model.parameters}</div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              model.isDownloaded
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {model.isDownloaded ? '已下载' : '未下载'}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              model.isRunning
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {model.isRunning ? '运行中' : '未运行'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 高级设置 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">高级设置</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">服务端点</label>
                  <input
                    type="text"
                    value={config.endpoint}
                    onChange={(e) =>
                      setConfig((prev: LocalLLMConfig) => ({ ...prev, endpoint: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="http://localhost:11434"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大Token数
                  </label>
                  <input
                    type="number"
                    value={config.maxTokens}
                    onChange={(e) =>
                      setConfig((prev: LocalLLMConfig) => ({
                        ...prev,
                        maxTokens: parseInt(e.target.value),
                      }))
                    }
                    min="100"
                    max="8000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    温度 (Temperature)
                  </label>
                  <input
                    type="number"
                    value={config.temperature}
                    onChange={(e) =>
                      setConfig((prev: LocalLLMConfig) => ({
                        ...prev,
                        temperature: parseFloat(e.target.value),
                      }))
                    }
                    min="0"
                    max="2"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    超时时间 (毫秒)
                  </label>
                  <input
                    type="number"
                    value={config.timeout}
                    onChange={(e) =>
                      setConfig((prev: LocalLLMConfig) => ({
                        ...prev,
                        timeout: parseInt(e.target.value),
                      }))
                    }
                    min="5000"
                    max="120000"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.autoStart}
                    onChange={(e) =>
                      setConfig((prev: LocalLLMConfig) => ({
                        ...prev,
                        autoStart: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">自动启动模型</span>
                </label>
              </div>
            </div>

            {/* 错误信息 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-red-800 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* 提供商信息 */}
            {providerInfo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{providerInfo.name} 信息</h4>
                <p className="text-sm text-gray-600 mb-2">{providerInfo.description}</p>
                <p className="text-xs text-gray-500 mb-2">服务端点: {providerInfo.endpoint}</p>
                <p className="text-xs text-gray-500">
                  最小要求: {providerInfo.requirements.minRAM} RAM,{' '}
                  {providerInfo.requirements.cpuCores} CPU核心
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleTestConnection}
            disabled={isLoading || !selectedProvider || !selectedModel}
            className="px-4 py-2 text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '测试中...' : '测试连接'}
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedProvider || !selectedModel}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              保存配置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
