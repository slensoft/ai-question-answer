/**
 * 方法论 API
 * 目前使用 localStorage 作为数据存储
 * 未来可以轻松替换为真实的后端 API
 */

import type { Methodology, ScenarioNeed } from '@/types/methodology';

// 模拟 API 延迟
const simulateDelay = (ms: number = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取所有方法论
 */
export async function getAllMethodologies(): Promise<Record<string, Methodology>> {
  await simulateDelay();
  
  // 从 localStorage 获取，如果没有则返回默认数据
  const stored = localStorage.getItem('methodologies');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // 默认数据
  const defaultData = await import('@/lib/methodology-data').then(m => m.methodologies);
  return defaultData;
}

/**
 * 根据 key 获取单个方法论
 */
export async function getMethodologyByKey(key: string): Promise<Methodology | null> {
  await simulateDelay();
  
  const methodologies = await getAllMethodologies();
  return methodologies[key] || null;
}

/**
 * 搜索方法论
 */
export async function searchMethodologies(
  searchTerm: string,
  category?: string
): Promise<Record<string, Methodology>> {
  await simulateDelay();
  
  const methodologies = await getAllMethodologies();
  const filtered: Record<string, Methodology> = {};
  
  Object.entries(methodologies).forEach(([key, method]) => {
    const matchesSearch = !searchTerm || 
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !category || category === 'all' || method.category === category;
    
    if (matchesSearch && matchesCategory) {
      filtered[key] = method;
    }
  });
  
  return filtered;
}

/**
 * 获取场景需求映射
 */
export async function getScenarioNeeds(): Promise<Record<string, ScenarioNeed[]>> {
  await simulateDelay();
  
  const stored = localStorage.getItem('scenarioNeeds');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultData = await import('@/lib/methodology-data').then(m => m.scenarioNeeds);
  return defaultData;
}

/**
 * 根据场景 ID 获取需求列表
 */
export async function getScenarioNeedsByType(scenarioId: string): Promise<ScenarioNeed[]> {
  await simulateDelay();
  
  const scenarioNeeds = await getScenarioNeeds();
  return scenarioNeeds[scenarioId] || [];
}

/**
 * 保存方法论数据（管理功能，未来可用）
 */
export async function saveMethodology(key: string, methodology: Methodology): Promise<void> {
  await simulateDelay();
  
  const methodologies = await getAllMethodologies();
  methodologies[key] = methodology;
  localStorage.setItem('methodologies', JSON.stringify(methodologies));
}

/**
 * 删除方法论（管理功能，未来可用）
 */
export async function deleteMethodology(key: string): Promise<void> {
  await simulateDelay();
  
  const methodologies = await getAllMethodologies();
  delete methodologies[key];
  localStorage.setItem('methodologies', JSON.stringify(methodologies));
}

/**
 * 获取方法论统计信息
 */
export async function getMethodologyStats(): Promise<{
  total: number;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
}> {
  await simulateDelay();
  
  const methodologies = await getAllMethodologies();
  const entries = Object.values(methodologies);
  
  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  
  entries.forEach(method => {
    byCategory[method.category] = (byCategory[method.category] || 0) + 1;
    byDifficulty[method.difficulty] = (byDifficulty[method.difficulty] || 0) + 1;
  });
  
  return {
    total: entries.length,
    byCategory,
    byDifficulty
  };
}
