'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getMethodologyByKey } from '@/api/methodology';
import { usePracticeHistory } from '@/hooks/usePracticeHistory';
import { getPracticeRecordsByMethodology } from '@/api/practice';
import { QuestionAnswer, Methodology, Question, PracticeRecord } from '@/types/methodology';
import { generateAISuggestions } from '@/api/ai';
import MethodologyHeader from './MethodologyHeader';
import '../app/methodology/practice-compact.css';

interface PracticeViewProps {
  methodologyKey: string;
  onBack: () => void;
}

interface AISuggestion {
  text: string;
  selected: boolean;
}

// 辅助函数：将问题转换为统一格式
const normalizeQuestion = (q: string | Question): Question => {
  if (typeof q === 'string') {
    return { text: q };
  }
  return q;
};

// 辅助函数：获取问题文本
const getQuestionText = (q: string | Question): string => {
  return typeof q === 'string' ? q : q.text;
};

export default function PracticeView({ methodologyKey, onBack }: PracticeViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [method, setMethod] = useState<Methodology | null>(null);
  const [loading, setLoading] = useState(true);
  const { saveRecord } = usePracticeHistory();

  const [context, setContext] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedQuickOptions, setSelectedQuickOptions] = useState<Record<number, Set<string>>>({});
  const [aiSuggestions, setAiSuggestions] = useState<Record<number, AISuggestion[]>>({});
  const [loadingAI, setLoadingAI] = useState<Record<number, boolean>>({});
  const [autoLoadedAI, setAutoLoadedAI] = useState<Record<number, boolean>>({});
  const [reflection, setReflection] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});
  const [historyRecords, setHistoryRecords] = useState<PracticeRecord[]>([]);
  const [showHistoryPrompt, setShowHistoryPrompt] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 处理可视化按钮点击 - 跳转到新页面
  const handleVisualize = () => {
    if (!method) return;
    
    // 构建 URL 参数
    const params = new URLSearchParams({
      methodology: methodologyKey,
      name: method.name,
    });
    
    // 跳转到可视化页面
    router.push(`/visualization?${params.toString()}`);
  };

  useEffect(() => {
    const loadMethodology = async () => {
      try {
        setLoading(true);
        const data = await getMethodologyByKey(methodologyKey);
        setMethod(data);
        
        // 加载历史记录
        const records = await getPracticeRecordsByMethodology(methodologyKey);
        setHistoryRecords(records);
        
        // 检查 URL 参数中是否有 timestamp
        const timestamp = searchParams.get('timestamp');
        
        if (timestamp) {
          // 如果有 timestamp，查找对应的记录并回填
          const targetRecord = records.find(r => r.timestamp === timestamp);
          if (targetRecord && data) {
            // 直接在这里回填数据，避免依赖问题
            setContext(targetRecord.context);
            
            const newAnswers: Record<number, string> = {};
            const newSelectedOptions: Record<number, Set<string>> = {};
            
            targetRecord.questionAnswers.forEach((qa) => {
              const questionIndex = qa.questionNumber - 1;
              newAnswers[questionIndex] = qa.answer;
              
              const question = data.questions[questionIndex];
              if (question && typeof question !== 'string' && question.quickOptions) {
                const selectedOpts = new Set<string>();
                question.quickOptions.forEach(option => {
                  if (qa.answer.includes(option)) {
                    selectedOpts.add(option);
                  }
                });
                if (selectedOpts.size > 0) {
                  newSelectedOptions[questionIndex] = selectedOpts;
                }
              }
            });
            
            setAnswers(newAnswers);
            setSelectedQuickOptions(newSelectedOptions);
            
            if (targetRecord.reflection) {
              setReflection(targetRecord.reflection);
            }
            
            // 展开所有有答案的问题
            const newExpanded: Record<number, boolean> = {};
            Object.keys(newAnswers).forEach(key => {
              newExpanded[parseInt(key)] = true;
            });
            setExpandedQuestions(newExpanded);
            
            // 不显示历史记录提示
            setShowHistoryPrompt(false);
          }
        }
      } catch (error) {
        console.error('Failed to load methodology:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMethodology();
  }, [methodologyKey, searchParams]);

  if (loading) {
    return <div className="loading-text">加载中...</div>;
  }

  if (!method) {
    return <div>方法论不存在</div>;
  }

  const loadHistoryRecord = (record: PracticeRecord) => {
    // 回填问题描述
    setContext(record.context);
    
    // 回填答案
    const newAnswers: Record<number, string> = {};
    const newSelectedOptions: Record<number, Set<string>> = {};
    
    record.questionAnswers.forEach((qa) => {
      const questionIndex = qa.questionNumber - 1;
      newAnswers[questionIndex] = qa.answer;
      
      // 尝试恢复快速选项的选中状态
      const question = method.questions[questionIndex];
      if (question && typeof question !== 'string' && question.quickOptions) {
        const selectedOpts = new Set<string>();
        question.quickOptions.forEach(option => {
          if (qa.answer.includes(option)) {
            selectedOpts.add(option);
          }
        });
        if (selectedOpts.size > 0) {
          newSelectedOptions[questionIndex] = selectedOpts;
        }
      }
    });
    
    setAnswers(newAnswers);
    setSelectedQuickOptions(newSelectedOptions);
    
    // 回填反思
    if (record.reflection) {
      setReflection(record.reflection);
    }
    
    // 关闭提示
    setShowHistoryPrompt(false);
    
    // 展开所有有答案的问题
    const newExpanded: Record<number, boolean> = {};
    Object.keys(newAnswers).forEach(key => {
      newExpanded[parseInt(key)] = true;
    });
    setExpandedQuestions(newExpanded);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const toggleQuestion = (index: number) => {
    const isExpanding = !expandedQuestions[index];
    setExpandedQuestions(prev => ({ ...prev, [index]: isExpanding }));
    
    // 当展开问题且有问题描述时，自动加载AI建议
    if (isExpanding && context.trim() && !autoLoadedAI[index] && !aiSuggestions[index]) {
      const question = method?.questions[index];
      if (question) {
        const questionText = getQuestionText(question);
        generateAISuggestionsForQuestion(index, questionText, true);
      }
    }
  };

  const generateAISuggestionsForQuestion = async (questionIndex: number, question: string, isAuto = false) => {
    if (!context.trim()) {
      if (!isAuto) {
        showToast('请先填写问题描述，AI才能提供相关建议', 'info');
      }
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
      if (isAuto) {
        setAutoLoadedAI(prev => ({ ...prev, [questionIndex]: true }));
      }
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      if (!isAuto) {
        showToast('AI建议生成失败，请重试', 'error');
      }
    } finally {
      setLoadingAI(prev => ({ ...prev, [questionIndex]: false }));
    }
  };

  const selectAISuggestion = (questionIndex: number, suggestionIndex: number) => {
    const suggestions = aiSuggestions[questionIndex];
    if (!suggestions) return;

    const suggestion = suggestions[suggestionIndex];
    const selectedText = suggestion.text;
    const currentAnswer = answers[questionIndex] || '';
    
    // 检查是否已选中
    const isSelected = suggestion.selected;
    
    if (isSelected) {
      // 取消选中：从答案中移除该建议
      // 使用双换行符分割，移除该建议，然后重新组合
      const parts = currentAnswer.split('\n\n').filter(part => part.trim() !== selectedText.trim());
      const newAnswer = parts.join('\n\n');
      
      handleAnswerChange(questionIndex, newAnswer);
      
      // 标记为未选中
      setAiSuggestions(prev => ({
        ...prev,
        [questionIndex]: suggestions.map((s, i) => 
          i === suggestionIndex ? { ...s, selected: false } : s
        )
      }));
    } else {
      // 选中：将建议添加到答案中
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
    }
  };

  const selectQuickOption = (questionIndex: number, option: string) => {
    const currentAnswer = answers[questionIndex] || '';
    const selectedOptions = selectedQuickOptions[questionIndex] || new Set<string>();
    
    // 检查是否已选中
    const isSelected = selectedOptions.has(option);
    
    if (isSelected) {
      // 取消选中：从答案中移除该选项
      const newSelectedOptions = new Set(selectedOptions);
      newSelectedOptions.delete(option);
      
      // 将答案按分号分割，移除该选项，然后重新组合
      const parts = currentAnswer.split('; ').filter(part => part.trim() !== option.trim());
      const newAnswer = parts.join('; ');
      
      handleAnswerChange(questionIndex, newAnswer);
      setSelectedQuickOptions(prev => ({
        ...prev,
        [questionIndex]: newSelectedOptions
      }));
    } else {
      // 选中：添加到答案中
      const newAnswer = currentAnswer 
        ? `${currentAnswer}; ${option}` 
        : option;
      
      const newSelectedOptions = new Set(selectedOptions);
      newSelectedOptions.add(option);
      
      handleAnswerChange(questionIndex, newAnswer);
      setSelectedQuickOptions(prev => ({
        ...prev,
        [questionIndex]: newSelectedOptions
      }));
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    if (!context.trim()) {
      showToast('请填写问题描述！', 'error');
      return;
    }

    const questionAnswers: QuestionAnswer[] = method.questions.map((q, i) => ({
      questionNumber: i + 1,
      question: getQuestionText(q),
      answer: answers[i] || ''
    }));

    const hasAnswer = questionAnswers.some(qa => qa.answer.trim());
    if (!hasAnswer) {
      showToast('请至少回答一个问题！', 'error');
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
      showToast(`✅ 已保存 ${Object.values(answers).filter(a => a.trim()).length} 个回答`, 'success');
      
      // 重新加载历史记录
      const records = await getPracticeRecordsByMethodology(methodologyKey);
      setHistoryRecords(records);
      
      // 清空表单
      setContext('');
      setAnswers({});
      setSelectedQuickOptions({});
      setReflection('');
    } catch (error) {
      console.error('Failed to save record:', error);
      showToast('保存失败，请重试', 'error');
    }
  };

  const handleExport = () => {
    // 检查是否有当前填写的内容
    if (!context.trim() && Object.values(answers).every(a => !a?.trim())) {
      showToast('当前页面没有填写任何内容！', 'error');
      return;
    }

    // 准备当前页面的数据
    const questionAnswers: QuestionAnswer[] = method.questions.map((q, i) => ({
      questionNumber: i + 1,
      question: getQuestionText(q),
      answer: answers[i] || ''
    }));

    const currentData = {
      methodology: methodologyKey,
      methodologyName: method?.name,
      methodologyCategory: method?.category,
      methodologyDescription: method?.description,
      methodologyTags: method?.tags,
      exportDate: new Date().toISOString(),
      context,
      questionAnswers,
      reflection
    };

    // 创建JSON字符串
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // 创建下载链接
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    
    // 生成文件名：方法论名称-日期.json
    const fileName = `${method?.name || methodologyKey}-${new Date().toISOString().split('T')[0]}.json`;
    link.download = fileName;
    
    // 触发下载
    link.click();
    
    // 清理URL对象
    URL.revokeObjectURL(url);
    
    // 显示成功提示
    showToast(`📥 已导出当前内容`, 'success');
  };

  const handleCopyJSON = async () => {
    // 检查是否有当前填写的内容
    if (!context.trim() && Object.values(answers).every(a => !a?.trim())) {
      showToast('当前页面没有填写任何内容！', 'error');
      return;
    }

    // 准备当前页面的数据
    const questionAnswers: QuestionAnswer[] = method.questions.map((q, i) => ({
      questionNumber: i + 1,
      question: getQuestionText(q),
      answer: answers[i] || ''
    }));

    const currentData = {
      methodology: methodologyKey,
      methodologyName: method?.name,
      methodologyCategory: method?.category,
      methodologyDescription: method?.description,
      methodologyTags: method?.tags,
      exportDate: new Date().toISOString(),
      context,
      questionAnswers,
      reflection
    };

    // 创建JSON字符串
    const dataStr = JSON.stringify(currentData, null, 2);

    try {
      await navigator.clipboard.writeText(dataStr);
      showToast(`📋 已复制当前内容的 JSON 数据`, 'success');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      showToast('复制失败，请重试', 'error');
    }
  };

  return (
    <div className="practice-view-compact">
      <MethodologyHeader
        methodology={method}
        methodologyKey={methodologyKey}
        onBack={onBack}
        onExport={handleExport}
        onCopyJSON={handleCopyJSON}
        onSave={handleSubmit}
        onVisualize={handleVisualize}
        hasAnswers={Object.keys(answers).length > 0}
        historyCount={historyRecords.length}
      />

      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* 历史记录提示 */}
      {showHistoryPrompt && historyRecords.length > 0 && (
        <div className="history-prompt">
          <div className="history-prompt-header">
            <span className="history-icon">📋</span>
            <span className="history-title">发现 {historyRecords.length} 条历史记录</span>
            <button 
              className="btn-close-prompt"
              onClick={() => setShowHistoryPrompt(false)}
            >
              ✕
            </button>
          </div>
          <div className="history-list">
            {historyRecords.slice(0, 3).map((record, index) => (
              <div key={index} className="history-item">
                <div className="history-item-info">
                  <div className="history-context">
                    {record.context.substring(0, 60)}
                    {record.context.length > 60 ? '...' : ''}
                  </div>
                  <div className="history-meta">
                    {new Date(record.timestamp).toLocaleString('zh-CN')} · 
                    {record.questionAnswers.filter(qa => qa.answer).length} 个回答
                  </div>
                </div>
                <button
                  className="btn-load-history"
                  onClick={() => loadHistoryRecord(record)}
                >
                  查看回填
                </button>
              </div>
            ))}
          </div>
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
            {method.questions.map((q, i) => {
              const question = normalizeQuestion(q);
              const questionText = question.text;
              const quickOptions = question.quickOptions || [];
              const placeholder = question.placeholder || '写下你的思考，或点击上方快速选择...';
              
              return (
                <div key={i} className={`question-card ${expandedQuestions[i] ? 'expanded' : ''}`}>
                  <div className="question-header" onClick={() => toggleQuestion(i)}>
                    <div className="question-title">
                      <span className="question-num">Q{i + 1}</span>
                      <span className="question-text">{questionText}</span>
                    </div>
                    <div className="question-status">
                      {answers[i]?.trim() && <span className="answered-badge">✓</span>}
                      <span className="expand-icon">{expandedQuestions[i] ? '−' : '+'}</span>
                    </div>
                  </div>

                  {expandedQuestions[i] && (
                    <div className="question-body">
                      {/* 快速选择选项 - 仅当有选项时显示 */}
                      {quickOptions.length > 0 && (
                        <div className="quick-options">
                          <div className="quick-options-label">💡 快速选择：</div>
                          <div className="quick-options-grid">
                            {quickOptions.map((option, oi) => {
                              const isSelected = selectedQuickOptions[i]?.has(option) || false;
                              return (
                                <button
                                  key={oi}
                                  className={`quick-option-btn ${isSelected ? 'selected' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectQuickOption(i, option);
                                  }}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <textarea
                        className="compact-answer"
                        value={answers[i] || ''}
                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                        placeholder={placeholder}
                        rows={3}
                        onClick={(e) => e.stopPropagation()}
                      />

                      {/* AI建议区域 - 自动显示 */}
                      <div className="ai-section">
                        {loadingAI[i] && (
                          <div className="ai-loading">
                            🤖 AI正在分析你的问题描述...
                          </div>
                        )}

                        {aiSuggestions[i] && aiSuggestions[i].length > 0 && (
                          <div className="ai-suggestions-container">
                            <div className="ai-suggestions-label">✨ AI建议：</div>
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
                          </div>
                        )}

                        {!loadingAI[i] && !aiSuggestions[i] && context.trim() && (
                          <button 
                            className="btn-ai-manual"
                            onClick={(e) => {
                              e.stopPropagation();
                              generateAISuggestionsForQuestion(i, questionText);
                            }}
                          >
                            🔄 重新生成AI建议
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
