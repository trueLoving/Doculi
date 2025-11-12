import Link from 'next/link';

export default function SitemapPage() {
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
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            站点地图
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            探索DocuSynapse官网的所有页面和功能
          </p>
        </div>

        {/* 主要页面 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            主要页面
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Link
                  href="/"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  首页
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DocuSynapse官网首页，展示产品核心价值和主要功能特性
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Hero区域和产品介绍</li>
                <li>• 功能特性展示</li>
                <li>• 适用场景介绍</li>
                <li>• 行动号召区域</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Link
                  href="/product"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  产品介绍
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                深入了解DocuSynapse的核心功能模块和技术亮点
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 神经元格式转换引擎</li>
                <li>• 安全增强模块</li>
                <li>• 效能突破模块</li>
                <li>• AI协作模块</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6">
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Link
                  href="/features"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  功能特性
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                详细的功能特性说明和支持的文件格式清单
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 支持文件格式清单</li>
                <li>• 转换关系矩阵</li>
                <li>• 独家转换场景示例</li>
                <li>• 扩展格式说明</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Link
                  href="/tech"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  技术文档
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                技术架构、开发计划和技术实现方案
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• MVP开发计划</li>
                <li>• 技术栈说明</li>
                <li>• 每日开发计划</li>
                <li>• 版本限制说明</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <Link
                  href="/apps/web"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  在线体验
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                直接体验DocuSynapse的文档处理功能
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 文档上传和转换</li>
                <li>• 实时处理预览</li>
                <li>• 结果文件下载</li>
                <li>• 功能演示</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 快速导航 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            快速导航
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">产品相关</h3>
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    → 首页 - 产品概览
                  </Link>
                  <Link
                    href="/product"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    → 产品介绍 - 核心功能模块
                  </Link>
                  <Link
                    href="/features"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    → 功能特性 - 支持格式和转换能力
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">技术相关</h3>
                <div className="space-y-2">
                  <Link
                    href="/tech"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    → 技术文档 - 开发计划和技术栈
                  </Link>
                  <Link
                    href="/apps/web"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    → 在线体验 - 直接使用产品
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">开始使用DocuSynapse</h2>
            <p className="text-xl text-indigo-100 mb-8">探索我们的智能文档处理平台</p>
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
                了解产品
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
