'use client';

import { useState, useEffect } from 'react';
import { getDecisionTree } from '@/api/methodology';
import { DecisionTreeNode } from '@/types/methodology';

interface DecisionTreeProps {
  onSelectMethodology: (key: string) => void;
}

export default function DecisionTree({ onSelectMethodology }: DecisionTreeProps) {
  const [currentNode, setCurrentNode] = useState('start');
  const [decisionTree, setDecisionTree] = useState<Record<string, DecisionTreeNode>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecisionTree();
  }, []);

  const loadDecisionTree = async () => {
    try {
      setLoading(true);
      const data = await getDecisionTree();
      setDecisionTree(data);
    } catch (error) {
      console.error('Failed to load decision tree:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (next?: string, method?: string) => {
    if (method) {
      onSelectMethodology(method);
    } else if (next) {
      setCurrentNode(next);
    }
  };

  const handleReset = () => {
    setCurrentNode('start');
  };

  if (loading) {
    return (
      <div className="decision-tree">
        <h2>🌳 智能决策树</h2>
        <div className="loading-text">加载中...</div>
      </div>
    );
  }

  const node = decisionTree[currentNode];

  if (!node) {
    return (
      <div className="decision-tree">
        <h2>🌳 智能决策树</h2>
        <div>节点不存在</div>
      </div>
    );
  }

  return (
    <div className="decision-tree">
      <h2>🌳 智能决策树</h2>
      <p style={{ color: '#000', marginBottom: '30px' }}>
        不确定用哪个方法？回答几个问题，让我们帮你找到最合适的方法论
      </p>
      <div className="tree-node">
        <h4>{node.question}</h4>
        <div className="tree-options">
          {node.options.map((opt, index) => (
            <div
              key={index}
              className="tree-option"
              onClick={() => handleOptionClick(opt.next, opt.method)}
            >
              {opt.text}
            </div>
          ))}
        </div>
      </div>
      {currentNode !== 'start' && (
        <button className="btn btn-secondary" onClick={handleReset}>
          重新开始
        </button>
      )}
    </div>
  );
}
