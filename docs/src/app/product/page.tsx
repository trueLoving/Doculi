import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* 导航栏 */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  DocuSynapse
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  首页
                </Link>
                <Link
                  href="/product"
                  className="text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  产品介绍
                </Link>
                <Link
                  href="/features"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  功能特性
                </Link>
                <Link
                  href="/tech"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  技术文档
                </Link>
                <Link
                  href="/apps/web"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  立即体验
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 产品标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            DocuSynapse
            <span className="text-indigo-600 dark:text-indigo-400 block">文档神经中枢</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            像神经系统般智能连接文档处理全流程，实现毫秒级精准处理
          </p>
        </div>

        {/* 产品核心理念 */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              产品核心理念
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  智能连接
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  像神经突触般智能连接文档处理全流程
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  毫秒级处理
                </h3>
                <p className="text-gray-600 dark:text-gray-300">实现毫秒级精准处理，提升工作效率</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  智能分析
                </h3>
                <p className="text-gray-600 dark:text-gray-300">利用AI技术进行深度分析和处理</p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能模块 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            智能处理核心模块
          </h2>

          <div className="space-y-8">
            {/* 神经元格式转换引擎 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  神经元格式转换引擎
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    扫描件OCR
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>技术实现：</strong>WASM版Tesseract.js + 自适应噪声过滤算法
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    <strong>独家优势：</strong>唯一支持手写体识别（中文/英文混合精度92%）
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    多格式互转
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>技术实现：</strong>基于AST的文档结构分析引擎
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    <strong>独家优势：</strong>EPUB章节结构保留转换（目录/脚注/插图位置100%还原）
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    表格数据提取
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>技术实现：</strong>TensorFlow.js表格识别模型 + CSV/Excel自动映射
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    <strong>独家优势：</strong>复杂合并单元格解析准确率98.7%（业界平均85%）
                  </p>
                </div>
              </div>
            </div>

            {/* 安全增强模块 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  🔒 安全增强模块
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    动态DNA水印系统
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>生物特征水印：</strong>WebAudio API捕获击键节奏 +
                      WebGL渲染个性化噪点纹理
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      水印携带设备指纹+操作者ID，司法级溯源认证
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>抗物理攻击水印：</strong>DCT频域分层嵌入 + QR码冗余备份
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      支持打印件/拍照件/截图的三级溯源（解码成功率100%）
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    合规性熔断机制
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>法律条款实时匹配：</strong>压缩版BERT法律模型 + 正则规则集群
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      覆盖GDPR/HIPAA/网络安全法等23国合规体系
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>敏感信息熔断：</strong>实体识别模型 + 动态脱敏引擎
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      检测到风险自动冻结下载通道并生成审计日志
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 效能突破模块 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ⚡️ 效能突破模块
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    量子压缩算法
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>矢量文档压缩：</strong>WASM移植Lepton算法 + WebGL纹理压缩
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      PDF体积缩减82%（业界平均40%）
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>图像智能优化：</strong>基于内容感知的WebP转换
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      50页图文混排PDF处理&lt;3秒（传统工具&gt;1分钟）
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    跨文档血缘分析
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>修改链路溯源：</strong>Merkle Tree版本树 + CRDT协同记录
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      可视化展示文档演化图谱（支持拖拽式对比）
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>内容抄袭检测：</strong>SimHash算法 + 跨文档语义匹配
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      自动识别90%+相似度内容并标红
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI协作模块 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">🤖 AI协作模块</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    智能条款提取器
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>合同要素抽取：</strong>BiLSTM-CRF命名实体识别
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      支持中日英三语合同混合解析
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>风险提示系统：</strong>法律知识图谱推理引擎
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      自动生成修正建议（如"违约金超过法定上限30%"）
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    多模态批处理
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>智能流水线配置：</strong>拖拽式工作流构建器 + DSL编译器
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      自定义格式转换→水印→压缩→加密链式操作
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>断点续传处理：</strong>File API分片上传 + Service Worker任务持久化
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      网络中断后可续传处理（进度保持）
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术亮点统计 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            技术亮点统计
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      技术领域
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      创新点数量
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      性能突破
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      竞争优势周期
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">WASM优化</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      7项
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      处理速度提升3-8倍
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">18-24个月</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">浏览器AI推理</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      5项
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">模型体积缩小92%</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">12-18个月</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">零知识安全架构</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      4项
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">密钥零出浏览器</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">永久优势</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">分布式文档处理</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      3项
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">并发能力提升10倍</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">12个月</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">体验DocuSynapse的强大功能</h2>
            <p className="text-xl text-indigo-100 mb-8">立即开始使用我们的智能文档处理平台</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/web"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                免费开始使用
              </Link>
              <Link
                href="/tech"
                className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                查看技术文档
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
