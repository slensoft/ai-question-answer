'use client';

import { useState, useEffect } from 'react';
import { getMethodologyByKey } from '@/api/methodology';
import { usePracticeHistory } from '@/hooks/usePracticeHistory';
import { QuestionAnswer, Methodology } from '@/types/methodology';
import { generateAISuggestions } from '@/api/ai';
import '../app/methodology/practice-compact.css';

interface PracticeViewProps {
  methodologyKey: string;
  onBack: () => void;
}

interface AISuggestion {
  text: string;
  selected: boolean;
}

export default function PracticeView({ methodologyKey, onBack }: PracticeViewProps) {
  const [method, setMethod] = useState<Methodology | null>(null);
  const [loading, setLoading] = useState(true);
  const { saveRecord } = usePracticeHistory();

  const [context, setContext] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiSuggestions, setAiSuggestions] = useState<Record<number, AISuggestion[]>>({});
  const [loadingAI, setLoadingAI] = useState<Record<number, boolean>>({});
  const [reflection, setReflection] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadMethodology = async () => {
      try {
        setLoading(true);
        const data = await getMethodologyByKey(methodologyKey);
        setMethod(data);
      } catch (error) {
        console.error('Failed to load methodology:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMethodology();
  }, [methodologyKey]);

  if (loading) {
    return <div className="loading-text">加载中...</div>;
  }

  if (!method) {
    return <div>方法论不存在</div>;
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const generateAISuggestionsForQuestion = async (questionIndex: number, question: string) => {
    if (!context.trim()) {
      alert('请先填写问题描述，AI才能提供相关建议');
      return;
    }

    setLoadingAI(prev => ({ ...prev, [questionIndex]: true }));
    
    try {
      const aiResponse = await generateAISuggestions({
        context,
        question,
        methodologyName: method?.name || '',
        previousAnswers: Object.values(answers).filter(a => a.trim())
      });
      
      const suggestions: AISuggestion[] = aiResponse.map(s => ({
        text: s.text,
        selected: false
      }));
      
      setAiSuggestions(prev => ({ ...prev, [questionIndex]: suggestions }));
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      alert('AI建议生成失败，请重试');
    } finally {
      setLoadingAI(prev => ({ ...prev, [questionIndex]: false }));
    }
  };

  const selectAISuggestion = (questionIndex: number, suggestionIndex: number) => {
    const suggestions = aiSuggestions[questionIndex];
    if (!suggestions) return;

    const selectedText = suggestions[suggestionIndex].text;
    const currentAnswer = answers[questionIndex] || '';
    
    // 将选中的建议添加到答案中
    const newAnswer = currentAnswer 
      ? `${currentAnswer}\n\n${selectedText}` 
      : selectedText;
    
    handleAnswerChange(questionIndex, newAnswer);
    
    // 标记为已选中
    setAiSuggestions(prev => ({
      ...prev,
      [questionIndex]: suggestions.map((s, i) => 
        i === suggestionIndex ? { ...s, selected: true } : s
      )
    }));
  };

  const handleSubmit = async () => {
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

    try {
      await saveRecord(record);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // 清空表单
      setContext('');
      setAnswers({});
      setReflection('');
    } catch (error) {
      console.error('Failed to save record:', error);
      alert('保存失败，请重试');
    }
  };

  return (
    <div className="practice-view-compact">
      <div className="practice-header-bar">
        <button className="btn-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="method-title">
          <span className="method-icon">🎯</span>
          <span className="method-name">{method.name}</span>
          <span className="method-difficulty">{method.difficulty}</span>
        </div>
        <div className="btn-actions">
          <button className="btn-compact btn-save" onClick={handleSubmit}>
            💾 保存
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="alert-compact alert-success">
          ✅ 已保存 {Object.values(answers).filter(a => a.trim()).length} 个回答
        </div>
      )}

      <div className="practice-content-grid">
        {/* 左侧：问题描述 + 示例 */}
        <div className="practice-sidebar">
          <div className="context-box">
            <label className="compact-label">📋 问题描述</label>
            <textarea
              className="compact-textarea"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="简要描述你的问题或情境..."
              rows={4}
            />
          </div>

          <div className="example-compact">
            <div className="example-header">💡 示例</div>
            <p className="example-text">{method.example}</p>
          </div>

          <div className="reflection-box">
            <label className="compact-label">💭 反思（可选）</label>
            <textarea
              className="compact-textarea"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="你的收获..."
              rows={3}
            />
          </div>
        </div>

        {/* 右侧：问题列表（可折叠） */}
        <div className="questions-compact">
          <div className="questions-header">
            <h3>🤔 思考框架</h3>
            <span className="questions-count">{method.questions.length} 个问题</span>
          </div>

          <div className="questions-accordion">
            {method.questions.map((q, i) => (
              <div key={i} className={`question-card ${expandedQuestions[i] ? 'expanded' : ''}`}>
                <div className="question-header" onClick={() => toggleQuestion(i)}>
                  <div className="question-title">
                    <span className="question-num">Q{i + 1}</span>
                    <span className="question-text">{q}</span>
                  </div>
                  <div className="question-status">
                    {answers[i]?.trim() && <span className="answered-badge">✓</span>}
                    <span className="expand-icon">{expandedQuestions[i] ? '−' : '+'}</span>
                  </div>
                </div>

                {expandedQuestions[i] && (
                  <div className="question-body">
                    <textarea
                      className="compact-answer"
                      value={answers[i] || ''}
                      onChange={(e) => handleAnswerChange(i, e.target.value)}
                      placeholder="写下你的思考..."
                      rows={3}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="ai-section">
                      <button 
                        className="btn-ai"
                        onClick={(e) => {
                          e.stopPropagation();
                          generateAISuggestionsForQuestion(i, q);
                        }}
                        disabled={loadingAI[i]}
                      >
                        {loadingAI[i] ? '🤖 AI思考中...' : '✨ AI建议'}
                      </button>

                      {aiSuggestions[i] && aiSuggestions[i].length > 0 && (
                        <div className="ai-suggestions">
                          {aiSuggestions[i].map((suggestion, si) => (
                            <div 
                              key={si} 
                              className={`suggestion-chip ${suggestion.selected ? 'selected' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectAISuggestion(i, si);
                              }}
                            >
                              {suggestion.selected && <span className="check-icon">✓</span>}
                              {suggestion.text}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
