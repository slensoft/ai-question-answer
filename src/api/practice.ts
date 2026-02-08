/**
 * 实践记录 API
 * 目前使用 localStorage 作为数据存储
 * 未来可以轻松替换为真实的后端 API
 */

import { PracticeRecord } from '@/types/methodology';

const STORAGE_KEY = 'methodology_practice_history';

// 模拟 API 延迟
const simulateDelay = (ms: number = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取所有实践记录
 */
export async function getAllPracticeRecords(): Promise<PracticeRecord[]> {
  await simulateDelay();
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to parse practice records:', error);
    return [];
  }
}

/**
 * 保存实践记录
 */
export async function savePracticeRecord(record: PracticeRecord): Promise<void> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  records.unshift(record); // 新记录放在最前面
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

/**
 * 根据方法论获取实践记录
 */
export async function getPracticeRecordsByMethodology(
  methodologyKey: string
): Promise<PracticeRecord[]> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  return records.filter(record => record.methodology === methodologyKey);
}

/**
 * 获取最近的实践记录
 */
export async function getRecentPracticeRecords(limit: number = 10): Promise<PracticeRecord[]> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  return records.slice(0, limit);
}

/**
 * 删除实践记录
 */
export async function deletePracticeRecord(timestamp: string): Promise<void> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  const filtered = records.filter(record => record.timestamp !== timestamp);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * 清空所有实践记录
 */
export async function clearAllPracticeRecords(): Promise<void> {
  await simulateDelay();
  
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 获取实践统计信息
 */
export async function getPracticeStats(): Promise<{
  totalRecords: number;
  byMethodology: Record<string, number>;
  byCategory: Record<string, number>;
  recentActivity: { date: string; count: number }[];
}> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  
  const byMethodology: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byDate: Record<string, number> = {};
  
  records.forEach(record => {
    // 按方法论统计
    byMethodology[record.methodology] = (byMethodology[record.methodology] || 0) + 1;
    
    // 按分类统计
    byCategory[record.methodologyCategory] = (byCategory[record.methodologyCategory] || 0) + 1;
    
    // 按日期统计
    const date = new Date(record.timestamp).toLocaleDateString('zh-CN');
    byDate[date] = (byDate[date] || 0) + 1;
  });
  
  // 转换日期统计为数组并排序
  const recentActivity = Object.entries(byDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7); // 最近7天
  
  return {
    totalRecords: records.length,
    byMethodology,
    byCategory,
    recentActivity
  };
}

/**
 * 导出实践记录为 JSON
 */
export async function exportPracticeRecords(): Promise<string> {
  await simulateDelay();
  
  const records = await getAllPracticeRecords();
  return JSON.stringify(records, null, 2);
}

/**
 * 导入实践记录
 */
export async function importPracticeRecords(jsonData: string): Promise<void> {
  await simulateDelay();
  
  try {
    const records = JSON.parse(jsonData) as PracticeRecord[];
    
    // 验证数据格式
    if (!Array.isArray(records)) {
      throw new Error('Invalid data format');
    }
    
    // 合并现有记录
    const existingRecords = await getAllPracticeRecords();
    const allRecords = [...records, ...existingRecords];
    
    // 去重（基于 timestamp）
    const uniqueRecords = allRecords.filter(
      (record, index, self) => 
        index === self.findIndex(r => r.timestamp === record.timestamp)
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueRecords));
  } catch (error) {
    console.error('Failed to import practice records:', error);
    throw new Error('导入失败：数据格式不正确');
  }
}
