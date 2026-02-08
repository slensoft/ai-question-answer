/**
 * 可视化相关工具函数
 */

import { methodologies } from './methodology-data';
import { Methodology } from '@/types/methodology';

/**
 * 获取所有支持可视化的方法论
 */
export function getVisualizableMethodologies(): Record<string, Methodology> {
  const result: Record<string, Methodology> = {};
  
  Object.entries(methodologies).forEach(([key, methodology]) => {
    if (methodology.supportsVisualization) {
      result[key] = methodology;
    }
  });
  
  return result;
}

/**
 * 检查某个方法论是否支持可视化
 */
export function supportsVisualization(methodologyKey: string): boolean {
  return methodologies[methodologyKey]?.supportsVisualization ?? false;
}

/**
 * 获取支持可视化的方法论列表（用于展示）
 */
export function getVisualizableMethodologyList() {
  return Object.entries(methodologies)
    .filter(([, methodology]) => methodology.supportsVisualization)
    .map(([key, methodology]) => ({
      key,
      name: methodology.name,
      category: methodology.category,
      description: methodology.description,
      tags: methodology.tags,
    }));
}

/**
 * 将问答数据转换为JSON格式，用于发送给AI生成Mermaid代码
 */
export interface VisualizationRequest {
  methodology: string;
  methodologyName: string;
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

export function prepareVisualizationData(
  methodologyKey: string,
  questionAnswers: Array<{ question: string; answer: string }>
): VisualizationRequest {
  const methodology = methodologies[methodologyKey];
  
  return {
    methodology: methodologyKey,
    methodologyName: methodology.name,
    answers: questionAnswers,
  };
}

/**
 * 示例：生成发送给AI的prompt
 */
export function generateVisualizationPrompt(data: VisualizationRequest): string {
  return `请根据以下${data.methodologyName}的问答内容，生成一个Mermaid图形代码。

方法论：${data.methodologyName}

问答内容：
${data.answers.map((qa, index) => `${index + 1}. ${qa.question}\n   答：${qa.answer}`).join('\n\n')}

请生成合适的Mermaid代码（flowchart、graph、mindmap等），要求：
1. 图形清晰易懂
2. 体现问答的逻辑关系
3. 只返回Mermaid代码，不要其他说明文字
4. 使用中文标签`;
}
