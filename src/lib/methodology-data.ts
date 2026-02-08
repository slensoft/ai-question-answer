// 方法论数据类型
export interface Methodology {
  name: string;
  category: string;
  description: string;
  scenarios: string[];
  difficulty: string;
  tags: string[];
  questions: string[];
  example: string;
}

export interface ScenarioNeed {
  id: string;
  name: string;
  methods: string[];
}

export interface DecisionTreeNode {
  question: string;
  options: Array<{
    text: string;
    next?: string;
    method?: string;
  }>;
}

// 方法论数据
export const methodologies: Record<string, Methodology> = {
  '5W2H': {
    name: '5W2H 分析法',
    category: '思维模型',
    description: '通过7个维度系统性地分析问题：What(是什么)、Why(为什么)、Who(谁)、Where(何地)、When(何时)、How(如何做)、How much(多少/程度)',
    scenarios: ['work', 'learning'],
    difficulty: '⭐',
    tags: ['全面分析', '信息收集', '易上手'],
    questions: [
      'What - 这是什么问题？具体是什么情况？',
      'Why - 为什么会出现这个问题？根本原因是什么？',
      'Who - 涉及哪些人？谁负责？谁受影响？',
      'Where - 在哪里发生？影响范围在哪？',
      'When - 什么时候发生？什么时候需要解决？',
      'How - 如何解决？具体步骤是什么？',
      'How much - 需要多少资源？影响程度如何？'
    ],
    example: '项目延期问题：What-项目延期2周；Why-需求变更频繁；Who-产品经理和开发团队；Where-核心功能模块；When-上周发现，本月底需交付；How-冻结需求、加班赶工；How much-需要3人加班，影响后续1个项目'
  },
  'SCQA': {
    name: 'SCQA 模型',
    category: '结构化提问',
    description: '麦肯锡常用的叙事结构，通过情境-冲突-疑问-回答四步骤清晰表达问题',
    scenarios: ['work'],
    difficulty: '⭐⭐',
    tags: ['汇报', '逻辑清晰', '说服力强'],
    questions: [
      'Situation - 当前的背景和情境是什么？',
      'Complication - 出现了什么问题或挑战？',
      'Question - 基于这个冲突，我们需要解决什么问题？',
      'Answer - 你的解决方案或建议是什么？'
    ],
    example: 'S-我们的产品市场份额稳定在20%；C-但竞争对手推出了新功能，我们开始流失用户；Q-如何快速响应竞争并保持市场地位？A-建议在3个月内推出类似功能，同时强化我们的差异化优势'
  },
  'STAR': {
    name: 'STAR 法',
    category: '结构化提问',
    description: '通过情境-任务-行动-结果四个维度结构化地描述经验和案例',
    scenarios: ['work', 'learning'],
    difficulty: '⭐⭐',
    tags: ['复盘', '面试', '经验总结'],
    questions: [
      'Situation - 当时的情境和背景是什么？',
      'Task - 你面临的任务或挑战是什么？',
      'Action - 你采取了哪些具体行动？',
      'Result - 最终的结果如何？有什么可量化的成果？',
      'Reflection - （可选）你从中学到了什么？'
    ],
    example: 'S-团队士气低落，项目进度落后；T-需要在2周内提升团队效率；A-每日站会、一对一沟通、调整任务分配；R-2周后进度追上，团队满意度提升30%；Reflection-及时沟通比加班更有效'
  },
  '5Why': {
    name: '5 Why 法（丰田五问法）',
    category: '深度追问',
    description: '连续追问5次"为什么"，直达问题的根本原因',
    scenarios: ['work', 'learning'],
    difficulty: '⭐⭐',
    tags: ['根因分析', '简单易用', '深入本质'],
    questions: [
      '第1个为什么：表面问题是什么？为什么会这样？',
      '第2个为什么：这个原因背后的原因是什么？',
      '第3个为什么：继续深挖，更深层的原因是什么？',
      '第4个为什么：还有更根本的原因吗？',
      '第5个为什么：最终的根本原因是什么？这是可以改变的吗？'
    ],
    example: '问题：网站经常崩溃。Why1-服务器过载；Why2-并发请求太多；Why3-缓存机制失效；Why4-缓存配置错误；Why5-缺少配置审查流程。根本原因：需要建立配置审查机制'
  },
  '第一性原理': {
    name: '第一性原理',
    category: '思维模型',
    description: '拆解到最基本的事实，剥离所有假设和经验，从底层逻辑重新推理',
    scenarios: ['innovation'],
    difficulty: '⭐⭐⭐⭐⭐',
    tags: ['创新突破', '深度思考', '打破常规'],
    questions: [
      '这个问题的最基本事实是什么？',
      '哪些是假设？哪些是已验证的真理？',
      '如果抛开所有经验和惯例，从零开始会怎么做？',
      '最底层的物理/逻辑限制是什么？',
      '基于这些基本事实，可以推导出什么新方案？'
    ],
    example: '电动车电池贵。假设：电池必须买成品。事实：电池=材料+组装。第一性原理：直接购买原材料自己组装，成本降低80%（特斯拉的做法）'
  },
  '苏格拉底提问': {
    name: '苏格拉底式提问法',
    category: '深度追问',
    description: '通过六类问题层层递进，培养深度思考和批判性思维',
    scenarios: ['learning', 'decision'],
    difficulty: '⭐⭐⭐⭐⭐',
    tags: ['深度思考', '批判性思维', '揭示假设'],
    questions: [
      '澄清问题：这个概念的准确定义是什么？',
      '挑战假设：这个观点基于什么前提假设？',
      '探究证据：支持这个结论的证据是什么？',
      '改变视角：从其他角度看会怎样？',
      '探讨后果：如果这样做，会产生什么影响？',
      '反思问题：这个问题本身合理吗？'
    ],
    example: '观点：应该加班完成项目。澄清-加班的定义？挑战-假设加班=高效？证据-数据显示加班效率如何？视角-从员工健康角度看？后果-长期加班会怎样？反思-是否应该问如何提高效率而非是否加班？'
  },
  '黄金圈': {
    name: '黄金圈法则',
    category: '思维模型',
    description: '从Why(为什么)到How(如何做)再到What(是什么)，由内而外思考',
    scenarios: ['work', 'innovation'],
    difficulty: '⭐⭐',
    tags: ['战略思考', '找到动机', '愿景构建'],
    questions: [
      'Why - 为什么要做这件事？核心目的和意义是什么？',
      'Why - 这能解决什么根本问题？创造什么价值？',
      'How - 通过什么方式和方法来实现？',
      'How - 我们的独特做法是什么？',
      'What - 具体做什么？产品或服务是什么？'
    ],
    example: 'Why-让人们更好地连接和沟通；How-通过简单易用的即时通讯工具；What-开发一款聊天应用（微信的逻辑）'
  },
  'MECE': {
    name: 'MECE 拆解法',
    category: '思维模型',
    description: '相互独立、完全穷尽地拆分问题，确保分析的完整性和逻辑性',
    scenarios: ['work', 'decision'],
    difficulty: '⭐⭐⭐⭐',
    tags: ['系统分析', '不重不漏', '咨询思维'],
    questions: [
      '这个问题可以从哪些维度拆解？',
      '每个维度是否相互独立（不重复）？',
      '所有维度加起来是否完全覆盖（不遗漏）？',
      '每个子问题可以继续拆解吗？',
      '拆解后的结构是否清晰易懂？'
    ],
    example: '分析销售下降：按时间（本月vs上月）、按产品（A/B/C）、按渠道（线上/线下）、按地区（东/南/西/北）。确保每个维度独立且完整覆盖'
  },
  '权衡矩阵': {
    name: '权衡矩阵',
    category: '决策分析',
    description: '通过列出选项、评估维度、设定权重和打分，理性地比较多个方案',
    scenarios: ['decision'],
    difficulty: '⭐⭐',
    tags: ['理性决策', '多方案对比', '可视化'],
    questions: [
      '有哪些可选方案？',
      '评估这些方案的关键维度是什么？',
      '每个维度的重要性权重如何？',
      '每个方案在各维度上的得分是多少？',
      '综合评分后，哪个方案最优？'
    ],
    example: '技术选型：方案A/B/C，维度：性能(40%)、成本(30%)、易用性(30%)。A:8/6/7=7.1，B:7/8/8=7.6，C:9/5/6=6.9。选择B'
  },
  '逆向提问': {
    name: '逆向提问（Inversion）',
    category: '创新突破',
    description: '不问"如何成功"，而问"如何避免失败"，从反面思考问题',
    scenarios: ['decision', 'innovation'],
    difficulty: '⭐⭐',
    tags: ['风险识别', '避免失误', '查理·芒格'],
    questions: [
      '如果要让这件事失败，我会怎么做？',
      '最可能导致失败的因素是什么？',
      '如何避免这些失败因素？',
      '历史上类似的失败案例有哪些？',
      '反过来思考后，成功的路径更清晰了吗？'
    ],
    example: '创业成功？→ 如何让创业失败？不做市场调研、烧钱过快、团队不和、产品无人需要。→ 避免这些：充分调研、控制成本、建设团队、验证需求'
  },
  '费曼技巧': {
    name: '费曼技巧',
    category: '学习成长',
    description: '通过用简单语言解释复杂概念来检验理解深度',
    scenarios: ['learning'],
    difficulty: '⭐⭐',
    tags: ['深度学习', '知识内化', '自我检验'],
    questions: [
      '我能用简单的语言解释这个概念吗？',
      '如果向一个10岁孩子解释，我会怎么说？',
      '我在哪里卡住了？哪里解释不清楚？',
      '可以用什么类比来帮助理解？',
      '回到原材料，重新学习卡住的部分'
    ],
    example: '学习"区块链"：简单说就是一个大家都能看、但谁都改不了的账本。每个人都有一份副本，要改必须大家都同意。就像全班同学都有一本作业记录本，老师想改成绩都改不了'
  },
  'SPIN': {
    name: 'SPIN 提问法',
    category: '决策分析',
    description: '通过了解现状、发现问题、探讨影响、确认需求四步骤引导对方',
    scenarios: ['work'],
    difficulty: '⭐⭐⭐',
    tags: ['销售沟通', '需求挖掘', '引导技巧'],
    questions: [
      'Situation - 当前的情况是怎样的？',
      'Problem - 存在什么问题或困难？',
      'Implication - 这个问题会带来什么影响？',
      'Need-payoff - 解决这个问题会带来什么好处？'
    ],
    example: 'S-你们现在用什么工具管理项目？P-是否遇到信息同步困难？I-这会导致返工和延期吗？N-如果有个工具能实时同步，能节省多少时间？'
  },
  '问题重构': {
    name: '问题重构',
    category: '创新突破',
    description: '换个角度重新定义问题，改变问题框架来发现新的解决方案',
    scenarios: ['innovation'],
    difficulty: '⭐⭐⭐⭐',
    tags: ['换个角度', '打破定式', '创新思维'],
    questions: [
      '这个问题的另一种表述方式是什么？',
      '如果改变问题的边界和范围会怎样？',
      '这个问题的对立面是什么？',
      '从不同利益相关者角度看，问题是什么？',
      '重新定义后，解决方案有什么不同？'
    ],
    example: '原问题：如何让员工加班？→ 重构：如何在不加班的情况下完成任务？→ 新方案：提高效率、优化流程、合理排期'
  },
  '双钻模型': {
    name: '双钻模型',
    category: '学习成长',
    description: '通过发散-收敛-发散-收敛四个阶段系统性解决复杂问题',
    scenarios: ['innovation', 'work'],
    difficulty: '⭐⭐⭐⭐',
    tags: ['设计思维', '系统方法', '创新流程'],
    questions: [
      '第一钻发散：这个问题可以从哪些角度看？',
      '第一钻收敛：真正的核心问题是什么？',
      '第二钻发散：有哪些可能的解决方案？',
      '第二钻收敛：最佳方案是什么？',
      '如何验证和迭代这个方案？'
    ],
    example: '发散1-用户流失的10个可能原因；收敛1-核心是产品体验差；发散2-改进体验的8种方法；收敛2-优先优化核心功能'
  },
  'PREP': {
    name: 'PREP 法',
    category: '结构化提问',
    description: '结论先行的表达框架：观点-理由-案例-重申观点',
    scenarios: ['work'],
    difficulty: '⭐',
    tags: ['快速表达', '说服沟通', '电梯演讲'],
    questions: [
      'Point - 你的核心观点是什么？',
      'Reason - 为什么这样认为？理由是什么？',
      'Example - 有什么具体案例支持？',
      'Point - 重申你的观点'
    ],
    example: 'P-我们应该采用敏捷开发；R-因为需求变化快，传统方法响应慢；E-上个项目用敏捷，交付速度提升40%；P-所以建议全面推行敏捷'
  }
};

// 场景和需求映射
export const scenarioNeeds: Record<string, ScenarioNeed[]> = {
  work: [
    { id: 'report', name: '向领导汇报', methods: ['SCQA', 'STAR', 'PREP'] },
    { id: 'review', name: '项目复盘', methods: ['STAR', '5Why', '5W2H'] },
    { id: 'meeting', name: '团队会议讨论', methods: ['MECE', '5W2H', '双钻模型'] },
    { id: 'troubleshoot', name: '故障排查', methods: ['5Why', '5W2H'] },
    { id: 'planning', name: '战略规划', methods: ['黄金圈', 'MECE', 'SCQA'] },
    { id: 'sales', name: '销售沟通', methods: ['SPIN', 'SCQA'] }
  ],
  learning: [
    { id: 'newknowledge', name: '学习新知识', methods: ['费曼技巧', '5W2H'] },
    { id: 'reading', name: '阅读理解', methods: ['苏格拉底提问', '5W2H'] },
    { id: 'asking', name: '向专家请教', methods: ['5W2H', 'STAR'] },
    { id: 'reflection', name: '自我反思', methods: ['STAR', '5Why', '费曼技巧'] }
  ],
  innovation: [
    { id: 'product', name: '产品创新', methods: ['第一性原理', '问题重构', '双钻模型'] },
    { id: 'brainstorm', name: '头脑风暴', methods: ['问题重构', '双钻模型'] },
    { id: 'breakthrough', name: '突破僵局', methods: ['问题重构', '第一性原理', '逆向提问'] },
    { id: 'optimization', name: '流程优化', methods: ['5Why', 'MECE', '逆向提问'] }
  ],
  decision: [
    { id: 'selection', name: '技术选型', methods: ['权衡矩阵', 'MECE'] },
    { id: 'risk', name: '风险评估', methods: ['逆向提问', '苏格拉底提问'] },
    { id: 'resource', name: '资源分配', methods: ['权衡矩阵', 'MECE'] },
    { id: 'investment', name: '投资决策', methods: ['逆向提问', '权衡矩阵', '苏格拉底提问'] }
  ]
};

// 决策树数据
export const decisionTree: Record<string, DecisionTreeNode> = {
  start: {
    question: '你需要什么？',
    options: [
      { text: '快速了解和收集信息', next: 'quick' },
      { text: '深入分析和思考', next: 'deep' },
      { text: '向他人表达和汇报', next: 'express' },
      { text: '做出决策和选择', next: 'decide' },
      { text: '创新和突破', next: 'innovate' }
    ]
  },
  quick: {
    question: '你的时间和经验如何？',
    options: [
      { text: '时间紧迫，需要快速上手', method: '5W2H' },
      { text: '有一定时间，想要系统分析', method: 'MECE' }
    ]
  },
  deep: {
    question: '你想深入到什么程度？',
    options: [
      { text: '找到问题根本原因', method: '5Why' },
      { text: '质疑假设和深度思考', method: '苏格拉底提问' },
      { text: '从第一性原理重新思考', method: '第一性原理' }
    ]
  },
  express: {
    question: '你的表达场景是？',
    options: [
      { text: '向领导汇报工作', method: 'SCQA' },
      { text: '分享经验和案例', method: 'STAR' },
      { text: '快速说服他人', method: 'PREP' }
    ]
  },
  decide: {
    question: '决策的复杂度如何？',
    options: [
      { text: '多个方案需要对比', method: '权衡矩阵' },
      { text: '需要识别风险', method: '逆向提问' },
      { text: '需要系统分析', method: 'MECE' }
    ]
  },
  innovate: {
    question: '你遇到了什么障碍？',
    options: [
      { text: '思维定式，需要换个角度', method: '问题重构' },
      { text: '想要根本性创新', method: '第一性原理' },
      { text: '需要系统化创新流程', method: '双钻模型' }
    ]
  }
};
