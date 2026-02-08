'use client';

import { useEffect, useState, useRef } from 'react';

interface MermaidViewerProps {
  code: string;
  className?: string;
}

/**
 * Mermaid图形渲染组件
 * 使用test-mermaid-direct验证过的方式，但先渲染DOM再调用mermaid
 */
export default function MermaidViewer({ code, className = '' }: MermaidViewerProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const renderKey = useRef(0);

  useEffect(() => {
    if (!code) {
      return;
    }

    // 每次代码改变时重置状态
    setIsRendered(false);
    setError(null);
    renderKey.current += 1;
    const currentKey = renderKey.current;

    let cancelled = false;

    const loadAndRender = async () => {
      try {
        console.log('MermaidRenderer: 开始加载mermaid');
        
        // 等待一小段时间，确保DOM已经渲染
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (cancelled) return;
        
        // 动态导入
        const mermaid = (await import('mermaid')).default;
        
        if (cancelled) return;
        
        console.log('MermaidRenderer: mermaid加载成功');

        // 初始化
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis',
          },
        });
        console.log('MermaidRenderer: mermaid初始化完成');

        // 让mermaid自动查找并渲染所有.mermaid元素
        console.log('MermaidRenderer: 开始渲染图形');
        await mermaid.run();
        
        if (cancelled || currentKey !== renderKey.current) return;
        
        console.log('MermaidRenderer: mermaid渲染完成');
        setIsRendered(true);
      } catch (err) {
        if (cancelled || currentKey !== renderKey.current) return;
        
        console.error('MermaidRenderer: 错误:', err);
        setError(err instanceof Error ? err.message : '图形渲染失败');
      }
    };

    loadAndRender();

    return () => {
      cancelled = true;
    };
  }, [code]);

  // 错误状态
  if (error) {
    return (
      <div className={`mermaid-error ${className}`} style={{
        padding: '20px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        color: '#856404'
      }}>
        <p>❌ {error}</p>
        <details style={{ marginTop: '10px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>查看代码</summary>
          <pre style={{ 
            marginTop: '10px',
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {code}
          </pre>
        </details>
      </div>
    );
  }

  // 空代码状态
  if (!code) {
    return (
      <div className={`mermaid-empty ${className}`}>
        <p>没有图形代码</p>
      </div>
    );
  }

  // 渲染：先输出pre.mermaid元素，mermaid会在useEffect中处理它
  // 使用key强制重新渲染当代码改变时
  return (
    <div 
      key={code} 
      className={className} 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        position: 'relative'
      }}
    >
      {/* 加载提示（渲染完成后隐藏） */}
      {!isRendered && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '14px'
        }}>
          正在生成图形...
        </div>
      )}
      
      {/* Mermaid元素（始终渲染，但可能不可见） */}
      <pre 
        className="mermaid" 
        style={{ 
          margin: 0,
          opacity: isRendered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {code}
      </pre>
    </div>
  );
}
