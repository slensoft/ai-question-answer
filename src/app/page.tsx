import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          🎯 提问方法论学习平台
        </h1>
        <p className="text-center sm:text-left text-lg">
          通过实践掌握15种核心提问与思考方法
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white gap-2 hover:from-purple-700 hover:to-purple-900 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 font-semibold shadow-lg"
            href="/ai-guide"
          >
            🤖 AI 智能引导（推荐）
          </Link>
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/methodology"
          >
            开始学习
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/methodology"
          >
            查看所有方法论
          </Link>
        </div>

        <div className="mt-8 text-center sm:text-left max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">功能特点</h2>
          <ul className="list-disc list-inside space-y-2 text-left">
            <li>🤖 <strong>AI 智能引导</strong> - 不知道用什么？让 AI 通过提问帮你找到答案</li>
            <li>📚 15种核心提问与思考方法论</li>
            <li>💡 动态问答系统，每个问题独立输入</li>
            <li>🌳 智能场景选择和决策树引导</li>
            <li>📊 完整的学习记录和数据导出</li>
            <li>📱 响应式设计，支持移动端</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl max-w-2xl">
          <h3 className="text-xl font-semibold mb-3">💡 为什么选择 AI 引导？</h3>
          <p className="text-sm leading-relaxed mb-3">
            基于<strong>邓宁-克鲁格效应</strong>和<strong>苏格拉底式教学法</strong>，
            通过 AI 提问帮你把模糊的想法转化为清晰的表达。
          </p>
          <p className="text-sm leading-relaxed">
            ✨ 零门槛 | 🎯 3分钟找到答案 | 🎓 边答边学
          </p>
        </div>
      </main>
    </div>
  );
}
