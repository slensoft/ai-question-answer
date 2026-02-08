'use client';

import { useState, useEffect } from 'react';
import { PracticeRecord } from '@/types/methodology';
import { getAllPracticeRecords, savePracticeRecord } from '@/api/practice';

export function usePracticeHistory() {
  const [history, setHistory] = useState<PracticeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const records = await getAllPracticeRecords();
      setHistory(records);
    } catch (error) {
      console.error('Failed to load practice history:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveRecord = async (record: PracticeRecord) => {
    try {
      await savePracticeRecord(record);
      // 重新加载历史记录
      await loadHistory();
    } catch (error) {
      console.error('Failed to save practice record:', error);
      throw error;
    }
  };

  const downloadHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `methodology-practice-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    history,
    saveRecord,
    downloadHistory,
    loading,
    refresh: loadHistory
  };
}

