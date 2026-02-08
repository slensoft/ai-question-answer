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
            <li>15种核心提问与思考方法论</li>
            <li>动态问答系统，每个问题独立输入</li>
            <li>智能场景选择和决策树引导</li>
            <li>完整的学习记录和数据导出</li>
            <li>响应式设计，支持移动端</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
