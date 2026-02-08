'use client';

import { useState, useEffect } from 'react';

interface QuestionAnswer {
  questionNumber: number;
  question: string;
  answer: string;
}

export interface PracticeRecord {
  timestamp: string;
  methodology: string;
  methodologyName: string;
  methodologyCategory: string;
  methodologyDescription: string;
  methodologyTags: string[];
  context: string;
  questionAnswers: QuestionAnswer[];
  reflection: string;
}

export function usePracticeHistory() {
  const [history, setHistory] = useState<PracticeRecord[]>([]);

  useEffect(() => {
    // 从 localStorage 加载历史记录
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('methodologyPractice');
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to parse history:', error);
        }
      }
    }
  }, []);

  const saveRecord = (record: PracticeRecord) => {
    const newHistory = [record, ...history];
    setHistory(newHistory);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('methodologyPractice', JSON.stringify(newHistory));
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
    downloadHistory
  };
}
