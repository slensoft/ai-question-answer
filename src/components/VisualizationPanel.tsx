'use client';

import { useState } from 'react';
import MermaidRenderer from './visualization/MermaidViewer';
import { prepareVisualizationData, generateVisualizationPrompt } from '@/lib/visualization-utils';

interface VisualizationPanelProps {
  methodologyKey: string;
  questionAnswers: Array<{ question: string; answer: string }>;
  onGenerateVisualization?: (prompt: string) => Promise<string>; // AI生成函数
}

/**
 * 可视化面板组件
 * 用于生成和展示Mermaid图形
 */
export default function VisualizationPanel({
  methodologyKey,
  questionAnswers,
  onGenerateVisualization,
}: VisualizationPanelProps) {
  const [mermaidCode, setMermaidCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 生成可视化
  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // 准备数据
      const data = prepareVisualizationData(methodologyKey, questionAnswers);
      const prompt = generateVisualizationPrompt(data);

      // 调用AI生成Mermaid代码
      if (onGenerateVisualization) {
        const code = await onGenerateVisualization(prompt);
        setMermaidCode(code);
        setShowPanel(true);
      } else {
        // 如果没有提供AI函数，显示提示
        setError('请配置AI生成函数');
      }
    } catch (err) {
      console.error('生成可视化失败:', err);
      setError('生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 导出为图片
  const handleExportImage = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      const container = document.querySelector('.mermaid-container');
      
      if (container) {
        const canvas = await html2canvas(container as HTMLElement);
        const link = document.createElement('a');
        link.download = `${methodologyKey}-visualization.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (err) {
      console.error('导出图片失败:', err);
      alert('导出失败，请重试');
    }
  };

  // 复制Mermaid代码
  const handleCopyCode = () => {
    navigator.clipboard.writeText(mermaidCode);
    alert('代码已复制到剪贴板');
  };

  return (
    <div className="visualization-panel">
      {/* 生成按钮 */}
      {!showPanel && (
        <button
          onClick={handleGenerate}
          disabled={isGenerating || questionAnswers.length === 0}
          className="generate-visualization-btn"
        >
          {isGenerating ? '正在生成图形...' : '🎨 生成可视化图形'}
        </button>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="visualization-error">
          <p>❌ {error}</p>
        </div>
      )}

      {/* 图形展示区 */}
      {showPanel && mermaidCode && (
        <div className="visualization-display">
          <div className="visualization-header">
            <h3>📊 可视化图形</h3>
            <div className="visualization-actions">
              <button onClick={handleExportImage} className="action-btn">
                💾 导出图片
              </button>
              <button onClick={handleCopyCode} className="action-btn">
                📋 复制代码
              </button>
              <button onClick={handleGenerate} className="action-btn">
                🔄 重新生成
              </button>
              <button onClick={() => setShowPanel(false)} className="action-btn">
                ✕ 关闭
              </button>
            </div>
          </div>

          <div className="visualization-content">
            <MermaidRenderer code={mermaidCode} />
          </div>

          {/* 代码查看（可折叠） */}
          <details className="mermaid-code-details">
            <summary>查看Mermaid代码</summary>
            <pre className="mermaid-code">
              <code>{mermaidCode}</code>
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
