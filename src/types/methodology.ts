/**
 * 方法论相关类型定义
 */

export interface Question {
  text: string;
  quickOptions?: string[]; // 快速选择选项
  placeholder?: string; // 输入框提示文字
}

export interface Methodology {
  name: string;
  category: string;
  description: string;
  scenarios: string[];
  difficulty: string;
  tags: string[];
  questions: (string | Question)[]; // 兼容旧格式和新格式
  example: string;
  supportsVisualization?: boolean; // 是否支持可视化
}

export interface ScenarioNeed {
  id: string;
  name: string;
  methods: string[];
}

export interface PracticeRecord {
  timestamp: string;
  methodology: string;
  methodologyName: string;
  methodologyCategory: string;
  methodologyDescription: string;
  methodologyTags: string[];
  contextTitle?: string;
  context: string;
  questionAnswers: QuestionAnswer[];
  reflection: string;
}

export interface QuestionAnswer {
  questionNumber: number;
  question: string;
  answer: string;
}
