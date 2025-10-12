import Link from "next/link";

export default function FeaturesPage() {
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
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  首页
                </Link>
                <Link href="/product" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  产品介绍
                </Link>
                <Link href="/features" className="text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  功能特性
                </Link>
                <Link href="/tech" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  技术文档
                </Link>
                <Link href="/apps/web" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
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
            功能特性
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            探索DocuSynapse的强大功能，体验智能文档处理的无限可能
          </p>
        </div>

        {/* 支持文件格式 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            支持文件格式清单
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">类别</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">具体格式</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">独家支持能力</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">文档类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">DOCX/DOC, PDF, TXT, RTF</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ 加密PDF内容提取（密码绕过保护）</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">电子书类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">EPUB, MOBI</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ 保留EPUB原书目录结构 & 字体嵌入</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">排版类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">LaTeX, Markdown</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ LaTeX公式 ↔ Word双向转换（业界唯一）</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">表格类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">XLSX/CSV, ODS</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ 复杂合并单元格100%还原结构</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">图像类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">JPG/PNG, TIFF, WebP, SVG</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ 扫描件智能纠偏（倾斜校正精度0.1°）</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">演示文稿类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">PPTX, ODP</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ PPT动画效果无损迁移</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">归档类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">ZIP, RAR (加密包)</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">✅ 浏览器端解压+预览（无服务器依赖）</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">专业类</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">CAD草图（DWG↔SVG）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">🔧 独家支持浏览器端轻量化渲染</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-center">
                💡 注：所有格式处理均在浏览器本地完成，无需上传云端
              </p>
            </div>
          </div>
        </section>

        {/* 转换关系矩阵 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            转换关系矩阵
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">源格式</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">目标格式</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">转换能力说明</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">技术稀缺性</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">PDF</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ DOCX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">保留超链接/书签/页眉页脚</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ EPUB</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">自动分章（基于语义分析）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ Markdown</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">表格/公式智能转换</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★★</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ JPG</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">每页独立输出 & 添加溯源水印</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">DOCX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ LaTeX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">双向转换保留公式编号</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ PDF</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">添加抗打印DNA水印</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ PPTX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">文档结构自动分页为幻灯片</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">EPUB</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ PDF</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">保持响应式布局（适配手机/平板）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ MOBI</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Kindle专版优化（封面元数据处理）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">JPG/PNG</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ PDF</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">扫描件OCR+可搜索文本生成</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★☆</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ SVG</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">图像矢量化（线条自动平滑）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">LaTeX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ DOCX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">BibTeX参考文献自动格式化</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★★</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">XLSX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ Markdown</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">复杂表格→MD管道表（保留合并单元格）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-semibold">PPTX</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">→ GIF</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">幻灯片转动态图（保留动画/过渡效果）</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">★★★★★</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-center">
                ⭐ 标为独家功能
              </p>
            </div>
          </div>
        </section>

        {/* 独家转换场景示例 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            独家转换场景示例
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. 法律文件安全流转
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
                <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">
                  <span className="text-indigo-600 dark:text-indigo-400">涉密合同.docx</span> → 
                  <span className="text-red-600 dark:text-red-400"> 添加DNA水印</span> → 
                  <span className="text-indigo-600 dark:text-indigo-400"> 带溯源PDF</span> → 
                  <span className="text-yellow-600 dark:text-yellow-400"> 熔断检测</span> → 
                  <span className="text-green-600 dark:text-green-400"> 客户接收</span>
                </p>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 若客户截图传播：通过噪点纹理解码定位泄密者</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. 学术出版自动化
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
                <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">
                  <span className="text-indigo-600 dark:text-indigo-400">论文.tex</span> → 
                  <span className="text-purple-600 dark:text-purple-400"> 一键转换</span> → 
                  <span className="text-indigo-600 dark:text-indigo-400"> 期刊模板.docx</span> + 
                  <span className="text-indigo-600 dark:text-indigo-400"> 预印本.pdf</span>
                </p>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 自动拆分补充材料为独立EPUB</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. 古籍数字化工程
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-4">
                <p className="text-gray-600 dark:text-gray-300 font-mono text-lg">
                  <span className="text-indigo-600 dark:text-indigo-400">扫描古籍.tiff</span> → 
                  <span className="text-blue-600 dark:text-blue-400"> 曲面校正+OCR</span> → 
                  <span className="text-indigo-600 dark:text-indigo-400"> 可检索.pdf</span> → 
                  <span className="text-green-600 dark:text-green-400"> 导出</span> → 
                  <span className="text-indigo-600 dark:text-indigo-400"> 档案馆专用.epub</span>
                </p>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 保留原书页码标注与批注位置</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 不支持但可扩展的格式 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            不支持但可扩展的格式
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">格式类型</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">限制原因</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">解决方案</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">3D模型文件</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">浏览器渲染性能瓶颈</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">考虑集成WebGPU轻量化预览</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">音视频文件</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">超出文档处理范畴</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">建议对接专用媒体处理引擎</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">宏病毒文档</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">安全隔离需求</td>
                    <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400">沙箱环境剥离宏代码</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              体验强大的文档转换功能
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              立即开始使用DocuSynapse，体验智能文档处理的无限可能
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps/web" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                立即体验
              </Link>
              <Link href="/tech" className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                查看技术文档
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
