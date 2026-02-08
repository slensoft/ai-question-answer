'use client';

import { Methodology } from '@/types/methodology';
import { supportsVisualization } from '@/lib/visualization-utils';

interface MethodologyHeaderProps {
  methodology: Methodology;
  methodologyKey: string;
  onBack: () => void;
  onExport?: () => void;
  onCopyJSON?: () => void;
  onSave?: () => void;
  onVisualize?: () => void;
  showVisualize?: boolean;
  hasAnswers?: boolean;
  historyCount?: number;
}

/**
 * 统一的方法论头部组件
 * 用于练习页面和详情查看页面
 */
export default function MethodologyHeader({
  methodology,
  methodologyKey,
  onBack,
  onExport,
  onCopyJSON,
  onSave,
  onVisualize,
  showVisualize = false,
  hasAnswers = false,
  historyCount = 0,
}: MethodologyHeaderProps) {
  return (
    <div className="practice-header-bar">
      <button className="btn-back" onClick={onBack}>
        ← 返回
      </button>
      
      <div className="method-title">
        <span className="method-icon">🎯</span>
        <span className="method-name">{methodology.name}</span>
        <span className="method-difficulty">{methodology.difficulty}</span>
      </div>
      
      <div className="btn-actions">
        {/* 可视化按钮 - 仅在支持可视化且有答案时显示 */}
        {supportsVisualization(methodologyKey) && hasAnswers && onVisualize && (
          <button 
            className="btn-compact btn-visualize" 
            onClick={onVisualize}
            title="生成可视化图形"
          >
            🎨 可视化
          </button>
        )}
        
        {/* 导出按钮 */}
        {onExport && (
          <button 
            className="btn-compact btn-export" 
            onClick={onExport}
            title="导出当前页面内容为 JSON 文件"
          >
            📥 导出记录 {historyCount > 0 && `(${historyCount})`}
          </button>
        )}
        
        {/* 复制JSON按钮 */}
        {onCopyJSON && (
          <button 
            className="btn-compact btn-copy-json" 
            onClick={onCopyJSON}
            title="复制当前页面内容的 JSON 数据"
          >
            📋 复制JSON
          </button>
        )}
        
        {/* 保存按钮 */}
        {onSave && (
          <button 
            className="btn-compact btn-save" 
            onClick={onSave}
          >
            💾 保存
          </button>
        )}
      </div>
    </div>
  );
}
