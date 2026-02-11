/**
 * 用户相关类型定义
 */

export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

export interface TopMethodology {
  key: string;
  name: string;
  category: string;
  tags: string[];
  count: number;
}

export interface UserStats {
  totalPractices: number;
  totalMethodologies: number;
  recentActivity: number; // 最近7天的活动次数
  favoriteMethodology?: string;
  topMethodologies?: TopMethodology[]; // 最常用的方法论列表
  practiceStreak: number; // 连续练习天数
}
