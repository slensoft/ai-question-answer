'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MermaidRenderer from '@/components/visualization/MermaidViewer';

export default function VisualizationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mermaidCode, setMermaidCode] = useState<string>('');
  const [editedCode, setEditedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [methodologyName, setMethodologyName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    const loadVisualization = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 从 URL 参数获取方法论类型
        const methodology = searchParams.get('methodology') || 'default';
        const name = searchParams.get('name') || '可视化图形';
        
        setMethodologyName(name);

        console.log('可视化页面：开始加载', { methodology, name });

        // 调用 API 获取 Mermaid 代码（使用 Mock 数据）
        const response = await fetch('/api/ai/generate-mermaid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt: `${methodology}分析` 
          }),
        });

        console.log('API 响应状态:', response.status);

        if (!response.ok) {
          throw new Error(`API 请求失败: ${response.status}`);
        }

        const result = await response.json();
        console.log('API 返回结果:', result);
        
        if (result.mermaidCode) {
          setMermaidCode(result.mermaidCode);
          setEditedCode(result.mermaidCode);
        } else {
          throw new Error('未返回 Mermaid 代码');
        }
      } catch (err) {
        console.error('加载可视化失败:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        
        // 使用默认图形作为后备
        const defaultCode = `graph TD
    Start[开始分析] --> Think[深入思考]
    Think --> Action[采取行动]
    Action --> Result[获得结果]
    
    style Start fill:#e1f5ff
    style Think fill:#fff4e6
    style Action fill:#e8f5e9
    style Result fill:#f3e5f5`;
        setMermaidCode(defaultCode);
        setEditedCode(defaultCode);
      } finally {
        setIsLoading(false);
      }
    };

    loadVisualization();
  }, [searchParams]);

  return (
    <div className="visualization-page">
      <div className="visualization-container">
        {/* 头部 */}
        <div className="visualization-header">
          <div className="header-content">
            <h1 className="page-title">
              📊 {methodologyName}
            </h1>
            <p className="page-subtitle">
              可视化分析图形
            </p>
          </div>
          
          <button
            onClick={() => router.back()}
            className="btn-back-visual"
          >
            ← 返回
          </button>
        </div>

        {/* 操作按钮 */}
        {!isLoading && (
          <div className="action-buttons">
            {mode === 'view' ? (
              <>
                <button
                  onClick={() => {
                    setEditedCode(mermaidCode);
                    setMode('edit');
                  }}
                  className="btn-action btn-primary"
                >
                  ✏️ 编辑代码
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mermaidCode);
                    alert('代码已复制到剪贴板');
                  }}
                  className="btn-action"
                >
                  📋 复制代码
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMermaidCode(editedCode);
                    setMode('view');
                  }}
                  className="btn-action btn-success"
                >
                  ✓ 应用修改
                </button>
                <button
                  onClick={() => {
                    setEditedCode(mermaidCode);
                    setMode('view');
                  }}
                  className="btn-action"
                >
                  ✕ 取消
                </button>
              </>
            )}
          </div>
        )}

        {/* 图形展示区域 */}
        <div className="visualization-content">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner">⏳</div>
              <p className="loading-text">正在生成图形...</p>
            </div>
          ) : mode === 'view' ? (
            error ? (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <p className="error-text">{error}</p>
                <p className="error-hint">显示默认图形</p>
                <div style={{ marginTop: '30px', width: '100%' }}>
                  <MermaidRenderer code={mermaidCode} />
                </div>
              </div>
            ) : (
              <div className="mermaid-wrapper">
                <MermaidRenderer code={mermaidCode} />
              </div>
            )
          ) : (
            <div className="edit-mode">
              <div className="code-editor">
                <div className="editor-header">📝 编辑 Mermaid 代码</div>
                <textarea
                  value={editedCode}
                  onChange={(e) => setEditedCode(e.target.value)}
                  spellCheck={false}
                  className="code-textarea"
                />
              </div>
              <div className="code-preview">
                <div className="preview-header">👁️ 实时预览</div>
                <div className="preview-content">
                  {editedCode && <MermaidRenderer code={editedCode} />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <div className="visualization-footer">
          <p>
            💡 <strong>提示：</strong> 当前使用 Mock 数据展示示例图形。
            未来可以接入 AI 接口，根据你的回答内容生成个性化的分析图形。
          </p>
        </div>
      </div>

      <style jsx>{`
        .visualization-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }

        .visualization-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .visualization-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          color: white;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .page-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin: 0;
        }

        .btn-back-visual {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-back-visual:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .btn-action {
          padding: 12px 24px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-action:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-primary {
          background: rgba(102, 126, 234, 0.9);
          border-color: rgba(102, 126, 234, 1);
        }

        .btn-primary:hover {
          background: rgba(102, 126, 234, 1);
        }

        .btn-success {
          background: rgba(76, 175, 80, 0.9);
          border-color: rgba(76, 175, 80, 1);
        }

        .btn-success:hover {
          background: rgba(76, 175, 80, 1);
        }

        .visualization-content {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          min-height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .edit-mode {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          min-height: 600px;
        }

        .code-editor,
        .code-preview {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
        }

        .code-editor {
          background: #1e1e1e;
        }

        .code-preview {
          background: #f8f9fa;
        }

        .editor-header,
        .preview-header {
          padding: 16px 20px;
          font-weight: 600;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .editor-header {
          background: #2d2d2d;
          color: white;
        }

        .preview-header {
          background: white;
          color: #333;
        }

        .code-textarea {
          flex: 1;
          padding: 20px;
          background: #1e1e1e;
          color: #d4d4d4;
          border: none;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
          resize: none;
          outline: none;
        }

        .preview-content {
          flex: 1;
          padding: 40px;
          overflow: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-state,
        .error-state {
          text-align: center;
          width: 100%;
        }

        .loading-spinner {
          font-size: 48px;
          margin-bottom: 20px;
          animation: spin 2s linear infinite;
        }

        .loading-text {
          font-size: 18px;
          color: #666;
          margin: 0;
        }

        .error-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .error-text {
          font-size: 18px;
          color: #d32f2f;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .error-hint {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .mermaid-wrapper {
          width: 100%;
        }

        .visualization-footer {
          margin-top: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .visualization-footer p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .visualization-page {
            padding: 20px 15px;
          }

          .visualization-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .page-title {
            font-size: 24px;
          }

          .visualization-content {
            padding: 20px;
          }

          .edit-mode {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .action-buttons {
            flex-wrap: wrap;
          }

          .btn-action {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      `}</style>
    </div>
  );
}
