/**
 * AI 引导 API
 * 用于获取引导式问题和推荐方法论
 */

import aiGuideData from '@/data/ai-guide-questions.json';

export interface QuestionOption {
  id: string;
  text: string;
  description: string;
  next?: string;      // 下一个问题的 ID
  method?: string;    // 直接推荐的方法论
}

export interface GuideQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'recommendation';
  options?: QuestionOption[];
  methods?: string[];      // 推荐的方法论列表
  confidence?: number;     // 推荐置信度 0-1
}

export interface ConversationContext {
  answers: Array<{
    questionId: string;
    optionId: string;
    text: string;
  }>;
}

/**
 * 获取起始问题
 */
export async function getStartQuestion(): Promise<GuideQuestion> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startQuestion = aiGuideData.questions.start;
  return startQuestion as GuideQuestion;
}

/**
 * 根据用户回答获取下一个问题
 */
export async function getNextQuestion(
  currentQuestionId: string,
  selectedOptionId: string,
  _context: ConversationContext
): Promise<GuideQuestion | null> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 获取当前问题
  const currentQuestion = aiGuideData.questions[currentQuestionId as keyof typeof aiGuideData.questions];
  if (!currentQuestion) {
    return null;
  }
  
  // 类型守卫：检查是否有 options 属性
  if (!('options' in currentQuestion) || !currentQuestion.options) {
    return null;
  }
  
  // 找到选中的选项
  const selectedOption = currentQuestion.options.find(
    (opt: QuestionOption) => opt.id === selectedOptionId
  ) as QuestionOption | undefined;
  
  if (!selectedOption) {
    return null;
  }
  
  // 如果选项直接指向方法论，返回推荐结果
  if ('method' in selectedOption && selectedOption.method) {
    return {
      id: `recommend_${selectedOption.method}`,
      question: '根据你的需求，推荐以下方法：',
      type: 'recommendation',
      methods: [selectedOption.method],
      confidence: 0.9
    };
  }
  
  // 如果选项指向下一个问题
  if ('next' in selectedOption && selectedOption.next) {
    const nextQuestion = aiGuideData.questions[selectedOption.next as keyof typeof aiGuideData.questions];
    if (nextQuestion) {
      return nextQuestion as GuideQuestion;
    }
  }
  
  return null;
}

/**
 * 根据对话上下文获取推荐方法论
 */
export async function getRecommendations(
  context: ConversationContext
): Promise<{
  methods: string[];
  confidence: number;
  reasoning: string;
}> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // TODO: 这里后续可以接入真实的 AI 分析
  // 目前返回基于规则的推荐
  
  const lastAnswer = context.answers[context.answers.length - 1];
  
  // 简单的规则匹配
  if (lastAnswer.optionId.includes('analyze')) {
    return {
      methods: ['5W2H', 'MECE'],
      confidence: 0.85,
      reasoning: '基于你的分析需求，这些方法能帮助你系统化地梳理问题'
    };
  }
  
  if (lastAnswer.optionId.includes('decide')) {
    return {
      methods: ['权衡矩阵', '逆向提问'],
      confidence: 0.82,
      reasoning: '这些方法能帮助你理性地做出决策'
    };
  }
  
  // 默认推荐
  return {
    methods: ['5W2H'],
    confidence: 0.7,
    reasoning: '5W2H 是一个通用且易上手的分析方法'
  };
}

/**
 * 获取问题树的元数据
 */
export function getQuestionTreeMetadata() {
  return aiGuideData.metadata;
}

/**
 * 根据方法论名称获取详细信息（从 methodology-data 获取）
 */
export async function getMethodologyDetails(methodName: string) {
  // 这个函数会调用 methodology.ts 的接口
  const { getMethodologyByKey } = await import('./methodology');
  return getMethodologyByKey(methodName);
}
