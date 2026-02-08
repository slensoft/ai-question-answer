/**
 * 用户 API
 * 目前使用 localStorage 作为数据存储
 */

import { User, UserStats } from '@/types/user';
import { getAllPracticeRecords } from './practice';

const USER_STORAGE_KEY = 'current_user';

// 模拟 API 延迟
const simulateDelay = (ms: number = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取当前用户信息
 */
export async function getCurrentUser(): Promise<User | null> {
  await simulateDelay();
  
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    // 创建默认用户
    const defaultUser: User = {
      id: 'user_' + Date.now(),
      username: '访客用户',
      createdAt: new Date().toISOString()
    };
    await saveUser(defaultUser);
    return defaultUser;
  }
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}

/**
 * 保存用户信息
 */
export async function saveUser(user: User): Promise<void> {
  await simulateDelay();
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

/**
 * 更新用户信息
 */
export async function updateUser(updates: Partial<User>): Promise<User> {
  await simulateDelay();
  
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('No user found');
  }
  
  const updatedUser = { ...currentUser, ...updates };
  await saveUser(updatedUser);
  return updatedUser;
}

/**
 * 获取用户统计信息
 */
export async function getUserStats(): Promise<UserStats> {
  await simulateDelay();
  
  const practices = await getAllPracticeRecords();
  
  // 统计使用的方法论数量
  const methodologies = new Set(practices.map(p => p.methodology));
  
  // 统计最近7天的活动
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentActivity = practices.filter(
    p => new Date(p.timestamp) > sevenDaysAgo
  ).length;
  
  // 找出最常用的方法论
  const methodologyCount: Record<string, number> = {};
  practices.forEach(p => {
    methodologyCount[p.methodology] = (methodologyCount[p.methodology] || 0) + 1;
  });
  const favoriteMethodology = Object.entries(methodologyCount)
    .sort(([, a], [, b]) => b - a)[0]?.[0];
  
  // 计算连续练习天数
  const practiceStreak = calculatePracticeStreak(practices);
  
  return {
    totalPractices: practices.length,
    totalMethodologies: methodologies.size,
    recentActivity,
    favoriteMethodology,
    practiceStreak
  };
}

/**
 * 计算连续练习天数
 */
function calculatePracticeStreak(practices: Array<{ timestamp: string }>): number {
  if (practices.length === 0) return 0;
  
  // 按日期分组
  const dateSet = new Set(
    practices.map(p => new Date(p.timestamp).toDateString())
  );
  
  const dates = Array.from(dateSet).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  let streak = 0;
  const today = new Date().toDateString();
  const currentDate = new Date(today);
  
  for (const date of dates) {
    if (date === currentDate.toDateString()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
