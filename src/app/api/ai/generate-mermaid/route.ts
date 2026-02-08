import { NextRequest, NextResponse } from 'next/server';
// import { openRouterClient, createMermaidPrompt, OpenRouterError, MODELS } from '@/lib/openrouter';

// Mock模式：返回示例Mermaid代码（AI集成已注释）
const MOCK_EXAMPLES: Record<string, string> = {
  '5why': `flowchart TD
    表象[笔记过多] --> Q1["为什么？→ 不断收藏"]
    Q1 --> Q2["为什么？→ 未整理"]
    Q2 --> Q3["为什么？→ 觉得可能有用"]
    Q3 --> Q4["为什么？→ 自信问题"]
    Q4 --> Q5["为什么？→ 思想可改变"]
    Q5 --> 根因[根本：思想认知偏差]
    
    style 表象 fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    style 根因 fill:#ccffcc,stroke:#00aa00,stroke-width:2px
    style Q1 fill:#ffe6cc
    style Q2 fill:#ffe6cc
    style Q3 fill:#ffe6cc
    style Q4 fill:#ffe6cc
    style Q5 fill:#ffe6cc`,

  'mece': `graph TD
    Root[问题分析] --> Time[时间维度]
    Root --> Type[类型维度]
    Root --> Impact[影响维度]
    
    Time --> T1[短期]
    Time --> T2[中期]
    Time --> T3[长期]
    
    Type --> Ty1[技术问题]
    Type --> Ty2[流程问题]
    Type --> Ty3[人员问题]
    
    Impact --> I1[高影响]
    Impact --> I2[中影响]
    Impact --> I3[低影响]
    
    style Root fill:#667eea,color:#fff,stroke:#333,stroke-width:3px
    style Time fill:#f093fb
    style Type fill:#f093fb
    style Impact fill:#f093fb`,

  'double-diamond': `graph LR
    A[发现问题] --> B[发散探索]
    B --> C[收敛定义]
    C --> D[发散方案]
    D --> E[收敛决策]
    E --> F[实施验证]
    
    B -.多角度思考.-> B
    D -.头脑风暴.-> D
    
    style A fill:#e1f5ff
    style B fill:#fff4e6
    style C fill:#e8f5e9
    style D fill:#fff4e6
    style E fill:#e8f5e9
    style F fill:#f3e5f5`,

  'golden-circle': `graph TD
    Why[为什么 WHY<br/>核心信念] --> How[怎么做 HOW<br/>独特方法]
    How --> What[做什么 WHAT<br/>具体产品]
    
    style Why fill:#ffd700,stroke:#ff8c00,stroke-width:3px
    style How fill:#ffeb3b,stroke:#ffa000,stroke-width:2px
    style What fill:#fff9c4,stroke:#f57c00,stroke-width:2px`,

  'tradeoff-matrix': `graph TD
    Decision[决策选项] --> A[方案A]
    Decision --> B[方案B]
    Decision --> C[方案C]
    
    A --> A1[成本: 低]
    A --> A2[时间: 快]
    A --> A3[质量: 中]
    
    B --> B1[成本: 中]
    B --> B2[时间: 中]
    B --> B3[质量: 高]
    
    C --> C1[成本: 高]
    C --> C2[时间: 慢]
    C --> C3[质量: 高]
    
    style Decision fill:#667eea,color:#fff
    style A fill:#c8e6c9
    style B fill:#fff9c4
    style C fill:#ffccbc`,

  'default': `graph TD
    Start[开始分析] --> Think[深入思考]
    Think --> Action[采取行动]
    Action --> Result[获得结果]
    
    style Start fill:#e1f5ff
    style Think fill:#fff4e6
    style Action fill:#e8f5e9
    style Result fill:#f3e5f5`,
};

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的提示词' },
        { status: 400 }
      );
    }

    console.log('收到可视化请求，prompt长度:', prompt.length);

    // Mock模式：根据prompt内容返回对应的示例
    let mermaidCode = MOCK_EXAMPLES.default;
    let detectedType = 'default';

    if (prompt.includes('5Why') || prompt.includes('五问')) {
      mermaidCode = MOCK_EXAMPLES['5why'];
      detectedType = '5why';
    } else if (prompt.includes('MECE')) {
      mermaidCode = MOCK_EXAMPLES.mece;
      detectedType = 'mece';
    } else if (prompt.includes('双钻') || prompt.includes('Double Diamond')) {
      mermaidCode = MOCK_EXAMPLES['double-diamond'];
      detectedType = 'double-diamond';
    } else if (prompt.includes('黄金圈') || prompt.includes('Golden Circle')) {
      mermaidCode = MOCK_EXAMPLES['golden-circle'];
      detectedType = 'golden-circle';
    } else if (prompt.includes('权衡矩阵') || prompt.includes('Tradeoff')) {
      mermaidCode = MOCK_EXAMPLES['tradeoff-matrix'];
      detectedType = 'tradeoff-matrix';
    }

    console.log('返回Mock示例:', detectedType);

    return NextResponse.json({ 
      mermaidCode,
      source: 'example',
      detectedType,
    });

    /* AI集成代码（暂时注释）
    const messages = createMermaidPrompt(prompt);
    const response = await openRouterClient.chat(messages, MODELS.FREE_LLAMA_33_70B, {
      temperature: 0.7,
      maxTokens: 2000,
    });

    const mermaidCode = response.content.trim();

    return NextResponse.json({ 
      mermaidCode,
      source: 'ai',
      usage: response.usage,
    });
    */
  } catch (error) {
    console.error('生成Mermaid代码失败:', error);

    return NextResponse.json(
      { error: '生成失败，请重试' },
      { status: 500 }
    );
  }
}
