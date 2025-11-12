import Link from 'next/link';

export default function TechPage() {
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
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
                  className="text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
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
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            技术文档
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            DocuSynapse的技术架构、开发计划和实现方案
          </p>
        </div>

        {/* MVP开发计划 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            MVP开发计划
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">MVP核心原则</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  技术亮点优先
                </h4>
                <p className="text-gray-600 dark:text-gray-300">突出 WASM/安全/AI 能力</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  闭环场景
                </h4>
                <p className="text-gray-600 dark:text-gray-300">完成「上传→处理→下载」完整流程</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  开发可行性
                </h4>
                <p className="text-gray-600 dark:text-gray-300">7天内可交付演示版</p>
              </div>
            </div>
          </div>

          {/* 功能清单 */}
          <div className="space-y-8">
            {/* 核心转换引擎 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                1. 核心转换引擎（必做）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        功能
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        实现方案
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        耗时
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        交付物
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">PDF → DOCX 转换</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        pdf-lib.js + WASM文本提取
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        1天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">可编辑DOCX文件</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">DOCX → PDF 转换</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        docx-pdf (基于Puppeteer Core WASM)
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        1天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        带基础水印的PDF
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        扫描件OCR (JPG→可搜PDF)
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        Tesseract.js WASM版 + 自动纠偏
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        1.5天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        可复制文本的PDF
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 安全增强模块 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                2. 安全增强模块（关键技术亮点）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        功能
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        实现方案
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        耗时
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        交付物
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">基础文字水印</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        pdf-lib文本图层叠加
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.5天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        "Confidential"字样水印
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">身份证号检测熔断</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        正则匹配(/\d{17}[\dX]/) + 弹窗警告
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.5天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        风险文档拦截功能
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 效能基础 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                3. 效能基础（保证可用性）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        功能
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        实现方案
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        耗时
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        交付物
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        Web Workers多线程处理
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        Comlink封装耗时操作
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        1天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">界面不卡顿</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">进度可视化</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        环形进度条 + 文件大小估算
                      </td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.5天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        用户感知等待时间
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 极简交互界面 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                4. 极简交互界面（可演示）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        功能
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        实现方案
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        耗时
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        交付物
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">文件拖拽上传区</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">react-dropzone</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.5天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">拖拽上传体验</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">格式选择下拉框</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">MUI Select组件</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.2天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">PDF/DOCX切换</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">水印文字输入</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">受控输入框</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.3天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">自定义水印文本</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">下载按钮</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">带状态禁用逻辑</td>
                      <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        0.2天
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">结果文件下载</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 技术栈 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            技术栈精简方案
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  React 18
                </h3>
                <p className="text-gray-600 dark:text-gray-300">现代化前端框架</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vite</h3>
                <p className="text-gray-600 dark:text-gray-300">快速构建工具</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
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
                  WASM模块
                </h3>
                <p className="text-gray-600 dark:text-gray-300">高性能计算</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Web Workers
                </h3>
                <p className="text-gray-600 dark:text-gray-300">多线程处理</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                WASM模块组件
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                    tesseract.js-wasm
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">OCR文字识别</p>
                </div>
                <div className="text-center">
                  <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                    pdf-lib
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">PDF处理</p>
                </div>
                <div className="text-center">
                  <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                    docx-pdf-wasm
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">文档转换</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 每日开发计划 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            每日开发计划
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      日期
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      核心任务
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      里程碑
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day1
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">PDF→DOCX转换引擎</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      完成5页测试PDF转换
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day2
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">DOCX→PDF+水印基础</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      生成带水印的PDF文档
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day3
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">扫描件OCR集成</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">图片转可搜索PDF</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day4
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      Web Workers多线程架构
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      处理百页PDF时不冻结界面
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day5
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      安全模块(身份证检测+水印)
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      触发熔断时阻止下载
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day6
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">前端界面开发</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">完成完整交互流程</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                      Day7
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">联调测试+性能优化</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">MVP演示版部署</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MVP版本限制说明 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            MVP版本限制说明
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                不支持的功能
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 生物特征水印（简化为基础文字水印）</li>
                <li>• 多文件批量处理（单文件优先）</li>
                <li>• 复杂格式转换（如LaTeX/EPUB）</li>
                <li>• 高级压缩算法（后续迭代）</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                保留的核心价值
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 浏览器端全本地处理（无服务器！）</li>
                <li>• OCR+水印+安全熔断技术闭环</li>
                <li>• WASM+Web Workers性能展示</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 演示场景设计 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            演示场景设计
          </h2>

          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. 合规场景</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                上传包含身份证的合同.docx → 添加水印 → 触发熔断警告 → 人工审核后下载
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  展示安全熔断机制如何保护敏感信息
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. 扫描件场景
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                上传发票照片.jpg → 转换为可搜索PDF → 复制发票编号
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  展示OCR技术的强大识别能力
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">开始使用DocuSynapse</h2>
            <p className="text-xl text-indigo-100 mb-8">体验我们的智能文档处理技术</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/web"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                立即体验
              </Link>
              <Link
                href="/product"
                className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                查看产品介绍
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
