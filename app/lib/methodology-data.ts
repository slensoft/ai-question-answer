import type { Methodology, ScenarioNeed } from '@/types/methodology';

// 方法论数据
export const methodologies: Record<string, Methodology> = {
  '5W2H': {
    name: '5W2H 分析法',
    category: '思维模型',
    description: '通过7个维度系统性地分析问题：What(是什么)、Why(为什么)、Who(谁)、Where(何地)、When(何时)、How(如何做)、How much(多少/程度)',
    scenarios: ['work', 'learning'],
    difficulty: '⭐',
    tags: ['全面分析', '信息收集', '易上手'],
    supportsVisualization: true, // 支持生成思维导图或流程图
    questions: [
      {
        text: 'What - 这是什么问题？具体是什么情况？',
        quickOptions: ['技术问题', '流程问题', '沟通问题', '资源问题', '质量问题', '时间问题'],
        placeholder: '描述具体的问题情况...'
      },
      {
        text: 'Why - 为什么会出现这个问题？根本原因是什么？',
        quickOptions: ['资源不足', '沟通不畅', '流程缺陷', '技术限制', '时间紧迫', '目标不清'],
        placeholder: '分析问题的根本原因...'
      },
      {
        text: 'Who - 涉及哪些人？谁负责？谁受影响？',
        quickOptions: ['项目经理', '技术负责人', '团队成员', '外部顾问', '利益相关方', '客户'],
        placeholder: '列出相关的人员和角色...'
      },
      {
        text: 'Where - 在哪里发生？影响范围在哪？',
        quickOptions: ['核心模块', '边缘功能', '整个系统', '特定环境', '生产环境', '测试环境'],
        placeholder: '说明问题发生的位置和影响范围...'
      },
      {
        text: 'When - 什么时候发生？什么时候需要解决？',
        quickOptions: ['立即处理', '本周内', '本月内', '下季度', '待条件成熟', '分阶段进行'],
        placeholder: '说明时间节点和紧急程度...'
      },
      {
        text: 'How - 如何解决？具体步骤是什么？',
        quickOptions: ['优化流程', '加强沟通', '增加资源', '调整策略', '培训团队', '引入工具'],
        placeholder: '描述解决方案和具体步骤...'
      },
      {
        text: 'How much - 需要多少资源？影响程度如何？',
        quickOptions: ['人力投入', '时间成本', '资金预算', '影响范围大', '影响范围中等', '影响范围小'],
        placeholder: '评估所需资源和影响程度...'
      }
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
    supportsVisualization: false, // 叙事性内容，文字更清晰
    questions: [
      {
        text: 'Situation - 当前的背景和情境是什么？',
        quickOptions: ['市场现状', '团队状态', '项目进展', '业务数据', '竞争态势', '资源情况'],
        placeholder: '描述当前的背景和情境...'
      },
      {
        text: 'Complication - 出现了什么问题或挑战？',
        quickOptions: ['进度延迟', '成本超支', '质量下降', '竞争压力', '资源短缺', '需求变更'],
        placeholder: '说明遇到的问题或挑战...'
      },
      {
        text: 'Question - 基于这个冲突，我们需要解决什么问题？',
        quickOptions: ['如何加速', '如何降本', '如何提质', '如何应对', '如何优化', '如何调整'],
        placeholder: '提出需要解决的核心问题...'
      },
      {
        text: 'Answer - 你的解决方案或建议是什么？',
        quickOptions: ['调整策略', '增加资源', '优化流程', '技术升级', '团队重组', '分阶段实施'],
        placeholder: '提出你的解决方案...'
      }
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
    supportsVisualization: false, // 叙事性内容，不需要图形
    questions: [
      {
        text: 'Situation - 当时的情境和背景是什么？',
        quickOptions: ['项目启动', '团队变动', '市场变化', '技术升级', '客户需求', '突发事件'],
        placeholder: '描述当时的具体情境和背景...'
      },
      {
        text: 'Task - 你面临的任务或挑战是什么？',
        quickOptions: ['提升效率', '降低成本', '改善质量', '解决冲突', '创新突破', '风险应对'],
        placeholder: '说明你需要完成的任务或面临的挑战...'
      },
      {
        text: 'Action - 你采取了哪些具体行动？',
        quickOptions: ['制定计划', '组织团队', '技术攻关', '沟通协调', '资源调配', '流程优化'],
        placeholder: '详细描述你采取的具体行动和步骤...'
      },
      {
        text: 'Result - 最终的结果如何？有什么可量化的成果？',
        quickOptions: ['超额完成', '按期交付', '质量提升', '成本节约', '效率提高', '客户满意'],
        placeholder: '说明最终结果，尽量用数据量化...'
      },
      {
        text: 'Reflection - （可选）你从中学到了什么？',
        quickOptions: ['沟通重要', '计划先行', '团队协作', '技术积累', '风险意识', '持续改进'],
        placeholder: '反思这次经历的收获和启发...'
      }
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
    supportsVisualization: true, // ✅ 适合树状图/鱼骨图
    questions: [
      {
        text: '第1个为什么：表面问题是什么？为什么会这样？',
        quickOptions: ['功能故障', '性能下降', '用户投诉', '流程卡顿', '数据异常', '沟通失误'],
        placeholder: '描述表面问题和第一层原因...'
      },
      {
        text: '第2个为什么：这个原因背后的原因是什么？',
        quickOptions: ['配置错误', '资源不足', '设计缺陷', '流程不当', '培训缺失', '工具限制'],
        placeholder: '继续追问更深层的原因...'
      },
      {
        text: '第3个为什么：继续深挖，更深层的原因是什么？',
        quickOptions: ['缺少规范', '责任不清', '监控缺失', '文档不全', '经验不足', '沟通不畅'],
        placeholder: '再深入一层，找到更根本的原因...'
      },
      {
        text: '第4个为什么：还有更根本的原因吗？',
        quickOptions: ['制度缺失', '文化问题', '激励不当', '目标不明', '资源分配', '优先级错'],
        placeholder: '接近根本原因了...'
      },
      {
        text: '第5个为什么：最终的根本原因是什么？这是可以改变的吗？',
        quickOptions: ['管理机制', '组织架构', '战略方向', '价值观念', '能力短板', '外部环境'],
        placeholder: '找到最根本的原因，并评估是否可以改变...'
      }
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
    supportsVisualization: false, // 深度思考过程，难以图形化
    questions: [
      {
        text: '这个问题的最基本事实是什么？',
        quickOptions: ['物理规律', '数学逻辑', '人性需求', '经济规律', '技术原理', '自然法则'],
        placeholder: '剥离所有假设，找到最基本的事实...'
      },
      {
        text: '哪些是假设？哪些是已验证的真理？',
        quickOptions: ['行业惯例', '经验判断', '传统做法', '权威观点', '常识认知', '未验证说法'],
        placeholder: '区分假设和真理，质疑一切前提...'
      },
      {
        text: '如果抛开所有经验和惯例，从零开始会怎么做？',
        quickOptions: ['重新设计', '改变材料', '换个路径', '简化流程', '颠覆模式', '创新组合'],
        placeholder: '想象从零开始，会如何解决这个问题...'
      },
      {
        text: '最底层的物理/逻辑限制是什么？',
        quickOptions: ['物理限制', '成本底线', '时间约束', '技术瓶颈', '资源上限', '法律边界'],
        placeholder: '找到真正无法突破的底层限制...'
      },
      {
        text: '基于这些基本事实，可以推导出什么新方案？',
        quickOptions: ['降低成本', '提升效率', '改变结构', '创新材料', '优化组合', '突破瓶颈'],
        placeholder: '从基本事实出发，推导新的解决方案...'
      }
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
    supportsVisualization: false, // 思考过程，不适合图形
    questions: [
      {
        text: '澄清问题：这个概念的准确定义是什么？',
        quickOptions: ['核心含义', '关键要素', '边界范围', '具体表现', '衡量标准', '相关概念'],
        placeholder: '用精确的语言定义这个概念...'
      },
      {
        text: '挑战假设：这个观点基于什么前提假设？',
        quickOptions: ['隐含前提', '未验证假设', '经验判断', '价值观念', '环境条件', '因果关系'],
        placeholder: '找出支撑这个观点的前提假设...'
      },
      {
        text: '探究证据：支持这个结论的证据是什么？',
        quickOptions: ['数据支持', '案例证明', '实验结果', '权威来源', '逻辑推理', '历史经验'],
        placeholder: '列出支持这个结论的具体证据...'
      },
      {
        text: '改变视角：从其他角度看会怎样？',
        quickOptions: ['用户视角', '竞争对手', '长期影响', '系统整体', '利益相关方', '反面角度'],
        placeholder: '尝试从不同角度重新审视问题...'
      },
      {
        text: '探讨后果：如果这样做，会产生什么影响？',
        quickOptions: ['短期影响', '长期后果', '连锁反应', '副作用', '机会成本', '风险隐患'],
        placeholder: '分析可能产生的各种影响和后果...'
      },
      {
        text: '反思问题：这个问题本身合理吗？',
        quickOptions: ['问题重构', '更好的问题', '问题前提', '问题范围', '问题价值', '问题本质'],
        placeholder: '反思这个问题是否问对了...'
      }
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
    supportsVisualization: true, // ✅ 适合同心圆图
    questions: [
      {
        text: 'Why - 为什么要做这件事？核心目的和意义是什么？',
        quickOptions: ['解决痛点', '创造价值', '实现愿景', '满足需求', '改变现状', '追求使命'],
        placeholder: '深入思考做这件事的根本原因和意义...'
      },
      {
        text: 'Why - 这能解决什么根本问题？创造什么价值？',
        quickOptions: ['用户价值', '社会价值', '商业价值', '情感价值', '效率提升', '体验改善'],
        placeholder: '说明能创造的核心价值和解决的根本问题...'
      },
      {
        text: 'How - 通过什么方式和方法来实现？',
        quickOptions: ['技术创新', '模式创新', '流程优化', '资源整合', '平台搭建', '生态构建'],
        placeholder: '描述实现目标的方式和方法...'
      },
      {
        text: 'How - 我们的独特做法是什么？',
        quickOptions: ['差异化', '核心优势', '独特技术', '创新模式', '用户体验', '品牌定位'],
        placeholder: '说明与众不同的独特做法...'
      },
      {
        text: 'What - 具体做什么？产品或服务是什么？',
        quickOptions: ['产品功能', '服务内容', '解决方案', '平台工具', '内容产品', '技术服务'],
        placeholder: '具体描述产品或服务是什么...'
      }
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
    supportsVisualization: true, // ✅ 适合树状图/思维导图
    questions: [
      {
        text: '这个问题可以从哪些维度拆解？',
        quickOptions: ['时间维度', '空间维度', '类别维度', '流程维度', '层级维度', '对象维度'],
        placeholder: '列出可以拆解问题的所有维度...'
      },
      {
        text: '每个维度是否相互独立（不重复）？',
        quickOptions: ['完全独立', '基本独立', '有交叉', '需调整', '重新划分', '合并维度'],
        placeholder: '检查各维度之间是否相互独立，无重复...'
      },
      {
        text: '所有维度加起来是否完全覆盖（不遗漏）？',
        quickOptions: ['完全覆盖', '基本覆盖', '有遗漏', '需补充', '重新梳理', '增加维度'],
        placeholder: '确认所有维度加起来是否完整覆盖问题...'
      },
      {
        text: '每个子问题可以继续拆解吗？',
        quickOptions: ['可继续拆', '已足够细', '需要拆解', '暂不拆解', '分层拆解', '适度即可'],
        placeholder: '评估是否需要进一步拆解子问题...'
      },
      {
        text: '拆解后的结构是否清晰易懂？',
        quickOptions: ['非常清晰', '基本清晰', '需优化', '重新组织', '简化结构', '增加说明'],
        placeholder: '检查拆解后的结构是否清晰易懂...'
      }
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
    supportsVisualization: true, // ✅ 适合表格/雷达图
    questions: [
      {
        text: '有哪些可选方案？',
        quickOptions: ['方案A', '方案B', '方案C', '现状维持', '混合方案', '创新方案'],
        placeholder: '列出所有可选的方案...'
      },
      {
        text: '评估这些方案的关键维度是什么？',
        quickOptions: ['成本', '时间', '质量', '风险', '可行性', '收益'],
        placeholder: '确定评估方案的关键维度...'
      },
      {
        text: '每个维度的重要性权重如何？',
        quickOptions: ['40%', '30%', '20%', '10%', '平均分配', '动态调整'],
        placeholder: '为每个维度设定权重（总和100%）...'
      },
      {
        text: '每个方案在各维度上的得分是多少？',
        quickOptions: ['1-10分', '优良中差', '高中低', '百分制', '五星评级', '定性描述'],
        placeholder: '对每个方案在各维度上打分...'
      },
      {
        text: '综合评分后，哪个方案最优？',
        quickOptions: ['方案A最优', '方案B最优', '方案C最优', '需要调整', '组合方案', '继续评估'],
        placeholder: '计算综合得分，确定最优方案...'
      }
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
    supportsVisualization: false, // 思考过程，不需要图形
    questions: [
      {
        text: '如果要让这件事失败，我会怎么做？',
        quickOptions: ['忽视用户', '盲目扩张', '资源浪费', '团队内耗', '忽视风险', '缺乏规划'],
        placeholder: '列出所有可能导致失败的做法...'
      },
      {
        text: '最可能导致失败的因素是什么？',
        quickOptions: ['资金链断', '团队分裂', '市场误判', '技术瓶颈', '竞争压力', '执行不力'],
        placeholder: '识别最关键的失败风险因素...'
      },
      {
        text: '如何避免这些失败因素？',
        quickOptions: ['提前预防', '建立机制', '加强监控', '储备资源', '风险对冲', '应急预案'],
        placeholder: '制定避免失败的具体措施...'
      },
      {
        text: '历史上类似的失败案例有哪些？',
        quickOptions: ['行业案例', '竞品失败', '历史教训', '经典案例', '身边案例', '文献记录'],
        placeholder: '研究类似的失败案例，吸取教训...'
      },
      {
        text: '反过来思考后，成功的路径更清晰了吗？',
        quickOptions: ['非常清晰', '有所启发', '需要调整', '重新规划', '信心增强', '发现盲区'],
        placeholder: '总结逆向思考后的收获和启发...'
      }
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
    supportsVisualization: false, // 学习反思，不需要图形
    questions: [
      {
        text: '我能用简单的语言解释这个概念吗？',
        quickOptions: ['可以解释', '部分能解释', '解释不清', '需要查资料', '理解模糊', '完全不懂'],
        placeholder: '尝试用最简单的语言解释这个概念...'
      },
      {
        text: '如果向一个10岁孩子解释，我会怎么说？',
        quickOptions: ['生活类比', '故事举例', '游戏比喻', '动画演示', '实物展示', '互动体验'],
        placeholder: '用孩子能理解的方式来解释...'
      },
      {
        text: '我在哪里卡住了？哪里解释不清楚？',
        quickOptions: ['基本概念', '原理机制', '应用场景', '技术细节', '逻辑关系', '专业术语'],
        placeholder: '找出理解的薄弱环节...'
      },
      {
        text: '可以用什么类比来帮助理解？',
        quickOptions: ['日常生活', '自然现象', '人际关系', '交通运输', '建筑结构', '生物系统'],
        placeholder: '寻找合适的类比和比喻...'
      },
      {
        text: '回到原材料，重新学习卡住的部分',
        quickOptions: ['查阅文档', '观看视频', '请教专家', '实践操作', '阅读案例', '做练习题'],
        placeholder: '制定重新学习的计划...'
      }
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
    supportsVisualization: false, // 对话式提问，不需要图形
    questions: [
      {
        text: 'Situation - 当前的情况是怎样的？',
        quickOptions: ['现有工具', '工作流程', '团队规模', '业务现状', '痛点感知', '预算情况'],
        placeholder: '了解对方当前的具体情况...'
      },
      {
        text: 'Problem - 存在什么问题或困难？',
        quickOptions: ['效率低下', '成本过高', '质量问题', '沟通困难', '数据混乱', '流程复杂'],
        placeholder: '引导对方说出遇到的问题...'
      },
      {
        text: 'Implication - 这个问题会带来什么影响？',
        quickOptions: ['延误交付', '客户流失', '成本增加', '团队疲惫', '竞争落后', '机会损失'],
        placeholder: '让对方意识到问题的严重性...'
      },
      {
        text: 'Need-payoff - 解决这个问题会带来什么好处？',
        quickOptions: ['提升效率', '降低成本', '改善体验', '增强竞争力', '团队满意', '业绩增长'],
        placeholder: '描绘解决问题后的美好前景...'
      }
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
    supportsVisualization: false, // 思维转换过程，文字更好
    questions: [
      {
        text: '这个问题的另一种表述方式是什么？',
        quickOptions: ['换个说法', '反向表述', '更高层次', '更具体化', '换个主语', '改变时态'],
        placeholder: '尝试用不同的方式表述这个问题...'
      },
      {
        text: '如果改变问题的边界和范围会怎样？',
        quickOptions: ['扩大范围', '缩小范围', '改变时间', '改变对象', '改变场景', '改变目标'],
        placeholder: '调整问题的边界和范围...'
      },
      {
        text: '这个问题的对立面是什么？',
        quickOptions: ['相反目标', '反向思考', '对立需求', '矛盾视角', '负面表述', '极端情况'],
        placeholder: '从对立面思考这个问题...'
      },
      {
        text: '从不同利益相关者角度看，问题是什么？',
        quickOptions: ['用户视角', '管理视角', '技术视角', '财务视角', '竞争对手', '合作伙伴'],
        placeholder: '站在不同角色的立场重新审视问题...'
      },
      {
        text: '重新定义后，解决方案有什么不同？',
        quickOptions: ['完全不同', '更简单', '更创新', '更可行', '成本更低', '效果更好'],
        placeholder: '总结重构后带来的新思路...'
      }
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
    supportsVisualization: true, // ✅ 适合流程图
    questions: [
      {
        text: '第一钻发散：这个问题可以从哪些角度看？',
        quickOptions: ['用户角度', '技术角度', '商业角度', '流程角度', '数据角度', '体验角度'],
        placeholder: '尽可能多地列出问题的不同角度...'
      },
      {
        text: '第一钻收敛：真正的核心问题是什么？',
        quickOptions: ['用户痛点', '技术瓶颈', '流程缺陷', '体验问题', '成本问题', '效率问题'],
        placeholder: '从众多角度中找出核心问题...'
      },
      {
        text: '第二钻发散：有哪些可能的解决方案？',
        quickOptions: ['技术方案', '流程优化', '产品创新', '服务升级', '模式变革', '资源整合'],
        placeholder: '头脑风暴，列出所有可能的解决方案...'
      },
      {
        text: '第二钻收敛：最佳方案是什么？',
        quickOptions: ['方案A', '方案B', '组合方案', '分阶段', 'MVP验证', '快速迭代'],
        placeholder: '评估并选择最佳解决方案...'
      },
      {
        text: '如何验证和迭代这个方案？',
        quickOptions: ['用户测试', '小范围试点', 'AB测试', '数据监控', '反馈收集', '持续优化'],
        placeholder: '制定验证和迭代计划...'
      }
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
    supportsVisualization: false, // 简单的4段论述，不需要图形
    questions: [
      {
        text: 'Point - 你的核心观点是什么？',
        quickOptions: ['应该做', '不应该做', '建议采用', '建议调整', '需要改变', '保持现状'],
        placeholder: '一句话说出你的核心观点...'
      },
      {
        text: 'Reason - 为什么这样认为？理由是什么？',
        quickOptions: ['效率更高', '成本更低', '风险更小', '效果更好', '符合趋势', '经验证明'],
        placeholder: '说明支持这个观点的理由...'
      },
      {
        text: 'Example - 有什么具体案例支持？',
        quickOptions: ['成功案例', '数据支持', '行业实践', '竞品经验', '历史证明', '实验结果'],
        placeholder: '举出具体的案例或数据...'
      },
      {
        text: 'Point - 重申你的观点',
        quickOptions: ['强烈建议', '建议采纳', '值得尝试', '需要考虑', '立即行动', '分步实施'],
        placeholder: '再次强调你的核心观点...'
      }
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
