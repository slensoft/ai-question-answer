'use client';

import { useState } from 'react';
import { methodologies } from '@/lib/methodology-data';
import { usePracticeHistory } from '@/hooks/usePracticeHistory';

interface PracticeViewProps {
  methodologyKey: string;
  onBack: () => void;
}

interface QuestionAnswer {
  questionNumber: number;
  question: string;
  answer: string;
}

export default function PracticeView({ methodologyKey, onBack }: PracticeViewProps) {
  const method = methodologies[methodologyKey];
  const { saveRecord, history } = usePracticeHistory();

  const [context, setContext] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [reflection, setReflection] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!method) {
    return <div>方法论不存在</div>;
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (!context.trim()) {
      alert('请填写问题描述！');
      return;
    }

    const questionAnswers: QuestionAnswer[] = method.questions.map((q, i) => ({
      questionNumber: i + 1,
      question: q,
      answer: answers[i] || ''
    }));

    const hasAnswer = questionAnswers.some(qa => qa.answer.trim());
    if (!hasAnswer) {
      alert('请至少回答一个问题！');
      return;
    }

    const record = {
      timestamp: new Date().toISOString(),
      methodology: methodologyKey,
      methodologyName: method.name,
      methodologyCategory: method.category,
      methodologyDescription: method.description,
      methodologyTags: method.tags,
      context,
      questionAnswers,
      reflection
    };

    saveRecord(record);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('确定要重新开始吗？当前填写的内容不会被保存。')) {
      setContext('');
      setAnswers({});
      setReflection('');
      onBack();
    }
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '20px' }}>
        ← 返回首页
      </button>

      <div className="methodology-info">
        <h3>🎯 {method.name}</h3>
        <div className="description">{method.description}</div>
        <div className="tags">
          <span className="tag">{method.category}</span>
          <span className="tag">难度: {method.difficulty}</span>
          {method.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="practice-area">
        <h2 style={{ marginBottom: '20px' }}>📝 开始实践</h2>

        {showSuccess && (
          <div className="alert alert-success">
            ✅ 实践记录已保存！包含 {Object.values(answers).filter(a => a.trim()).length} 个问题的回答。
          </div>
        )}

        <div className="form-group">
          <label>1. 描述你的问题或情境</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="例如：我们团队最近项目延期了，需要向领导汇报原因和改进计划..."
          />
        </div>

        <div className="example-box">
          <h4>💡 参考示例</h4>
          <p>{method.example}</p>
        </div>

        <div className="questions-list">
          <h4 style={{ marginBottom: '15px' }}>🤔 思考框架（按顺序回答这些问题）</h4>
          {method.questions.map((q, i) => (
            <div key={i} className="question-item-with-input">
              <div className="question-label">
                <strong>问题 {i + 1}:</strong> {q}
              </div>
              <textarea
                className="question-answer"
                value={answers[i] || ''}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                placeholder="在这里写下你的回答..."
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>2. 你的收获和反思（可选）</label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="使用这个方法论后，你有什么新的发现或感悟？"
          />
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-success" onClick={handleSubmit}>
          💾 保存实践记录
        </button>
        <button className="btn btn-primary" onClick={handleReset}>
          🔄 重新开始
        </button>
      </div>

      {history.length > 0 && (
        <div className="history-section" style={{ marginTop: '40px' }}>
          <h2>📚 你的学习记录</h2>
          <div className="history-list">
            {history.slice(0, 10).map((record, index) => {
              const answeredCount = record.questionAnswers?.filter((qa: QuestionAnswer) => qa.answer).length || 0;
              return (
                <div key={index} className="history-item">
                  <div className="timestamp">
                    {new Date(record.timestamp).toLocaleString('zh-CN')}
                  </div>
                  <div className="method-name">{record.methodologyName}</div>
                  <div>
                    <strong>问题：</strong>
                    {record.context.substring(0, 100)}
                    {record.context.length > 100 ? '...' : ''}
                  </div>
                  {answeredCount > 0 && (
                    <div style={{ color: '#4caf50', marginTop: '5px' }}>
                      ✓ 回答了 {answeredCount} 个问题
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
