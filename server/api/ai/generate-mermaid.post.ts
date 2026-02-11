const MOCK_EXAMPLES: Record<string, string> = {
  '5why': `flowchart TD
    表象[笔记过多] --> Q1["为什么？→ 不断收藏"]
    Q1 --> Q2["为什么？→ 未整理"]
    Q2 --> Q3["为什么？→ 觉得可能有用"]
    Q3 --> Q4["为什么？→ 自信问题"]
    Q4 --> Q5["为什么？→ 思想可改变"]
    Q5 --> 根因[根本：思想认知偏差]`,
  mece: `graph TD
    Root[问题分析] --> Time[时间维度]
    Root --> Type[类型维度]
    Root --> Impact[影响维度]`,
  'double-diamond': `graph LR
    A[发现问题] --> B[发散探索]
    B --> C[收敛定义]
    C --> D[发散方案]
    D --> E[收敛决策]`,
  'golden-circle': `graph TD
    Why[为什么 WHY] --> How[怎么做 HOW]
    How --> What[做什么 WHAT]`,
  'tradeoff-matrix': `graph TD
    Decision[决策选项] --> A[方案A]
    Decision --> B[方案B]
    Decision --> C[方案C]`,
  default: `graph TD
    Start[开始分析] --> Think[深入思考]
    Think --> Action[采取行动]
    Action --> Result[获得结果]`,
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ prompt?: string }>(event)
  const prompt = body?.prompt

  if (!prompt || typeof prompt !== 'string') {
    throw createError({ statusCode: 400, statusMessage: '请提供有效的提示词' })
  }

  let mermaidCode = MOCK_EXAMPLES.default
  let detectedType = 'default'

  if (prompt.includes('5Why') || prompt.includes('五问')) {
    mermaidCode = MOCK_EXAMPLES['5why']
    detectedType = '5why'
  } else if (prompt.includes('MECE')) {
    mermaidCode = MOCK_EXAMPLES.mece
    detectedType = 'mece'
  } else if (prompt.includes('双钻') || prompt.includes('Double Diamond')) {
    mermaidCode = MOCK_EXAMPLES['double-diamond']
    detectedType = 'double-diamond'
  } else if (prompt.includes('黄金圈') || prompt.includes('Golden Circle')) {
    mermaidCode = MOCK_EXAMPLES['golden-circle']
    detectedType = 'golden-circle'
  } else if (prompt.includes('权衡矩阵') || prompt.includes('Tradeoff')) {
    mermaidCode = MOCK_EXAMPLES['tradeoff-matrix']
    detectedType = 'tradeoff-matrix'
  }

  return { mermaidCode, source: 'example', detectedType }
})
