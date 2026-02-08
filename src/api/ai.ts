/**
 * AI API
 * 用于生成问题回答建议
 */

export interface AISuggestionRequest {
  context: string;
  question: string;
  methodologyName: string;
  previousAnswers?: string[];
}

export interface AISuggestion {
  text: string;
  confidence: number; // 0-1
}

/**
 * 生成AI建议（当前为模拟实现，后续可接入真实AI API）
 */
export async function generateAISuggestions(
  request: AISuggestionRequest
): Promise<AISuggestion[]> {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // TODO: 接入真实AI API
  // 例如：OpenAI, Claude, 或自定义AI服务
  // const response = await fetch('/api/ai/suggestions', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request)
  // });
  // return response.json();

  // 当前返回模拟数据
  return generateMockSuggestions(request);
}

/**
 * 生成模拟建议（用于开发和测试）
 */
function generateMockSuggestions(request: AISuggestionRequest): AISuggestion[] {
  const { context, question, methodologyName } = request;

  // 基于问题类型生成不同的建议
  const suggestions: AISuggestion[] = [];

  if (question.includes('为什么') || question.includes('原因')) {
    suggestions.push(
      {
        text: `从${context.substring(0, 20)}的情况来看，可能是沟通不畅导致的`,
        confidence: 0.8
      },
      {
        text: '资源分配不合理可能是关键因素',
        confidence: 0.75
      },
      {
        text: '流程设计存在瓶颈，需要优化',
        confidence: 0.7
      }
    );
  } else if (question.includes('如何') || question.includes('怎么')) {
    suggestions.push(
      {
        text: '建议先梳理现有流程，找出痛点',
        confidence: 0.85
      },
      {
        text: '可以尝试引入敏捷方法，提高响应速度',
        confidence: 0.75
      },
      {
        text: '加强团队协作，定期同步进度',
        confidence: 0.8
      }
    );
  } else if (question.includes('什么') || question.includes('哪些')) {
    suggestions.push(
      {
        text: '关键要素包括：目标明确、资源充足、执行到位',
        confidence: 0.8
      },
      {
        text: '需要考虑时间、成本、质量三个维度',
        confidence: 0.75
      },
      {
        text: '团队能力、工具支持、管理机制都很重要',
        confidence: 0.7
      }
    );
  } else {
    suggestions.push(
      {
        text: `基于${methodologyName}的思路，建议从系统角度分析`,
        confidence: 0.75
      },
      {
        text: '可以参考行业最佳实践，结合实际情况调整',
        confidence: 0.7
      },
      {
        text: '建议分阶段实施，先做小范围试点',
        confidence: 0.8
      }
    );
  }

  return suggestions;
}

/**
 * 优化用户输入的答案（可选功能）
 */
export async function refineAnswer(
  originalAnswer: string,
  context: string
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // TODO: 接入AI API进行答案优化
  // 当前返回原答案
  return originalAnswer;
}

/**
 * 生成反思建议
 */
export async function generateReflectionPrompt(
  context: string,
  answers: string[]
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: 接入AI API
  return '通过这次思考，你对问题有了哪些新的认识？有什么可以改进的地方？';
}
