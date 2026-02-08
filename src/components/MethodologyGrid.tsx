'use client';

import { useState, useEffect } from 'react';
import { searchMethodologies } from '@/api/methodology';
import { Methodology } from '@/types/methodology';

interface MethodologyGridProps {
  searchTerm: string;
  selectedCategory: string;
  onSelectMethodology: (key: string) => void;
}

export default function MethodologyGrid({
  searchTerm,
  selectedCategory,
  onSelectMethodology
}: MethodologyGridProps) {
  const [methodologies, setMethodologies] = useState<Record<string, Methodology>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMethodologies();
  }, [searchTerm, selectedCategory]);

  const loadMethodologies = async () => {
    try {
      setLoading(true);
      const data = await searchMethodologies(searchTerm, selectedCategory);
      setMethodologies(data);
    } catch (error) {
      console.error('Failed to load methodologies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-section">
        <h2>📚 所有方法论</h2>
        <div className="loading-text">加载中...</div>
      </div>
    );
  }

  const filteredMethodologies = Object.entries(methodologies);

  return (
    <div className="home-section">
      <h2>📚 所有方法论</h2>
      <div className="methodology-grid">
        {filteredMethodologies.map(([key, method]) => (
          <div
            key={key}
            className="methodology-card"
            onClick={() => onSelectMethodology(key)}
          >
            <span className="category">{method.category}</span>
            <h3>{method.name}</h3>
            <div className="description">{method.description}</div>
            <div className="tags">
              <span className="tag">难度: {method.difficulty}</span>
              {method.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
