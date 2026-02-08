'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStartQuestion, getNextQuestion, getRecommendations, GuideQuestion, ConversationContext } from '@/api/ai-guide';
import { methodologies } from '@/lib/methodology-data';
import './ai-guide.css';

type UserStage = 'peak' | 'valley' | 'slope' | 'plateau';

interface ConversationHistoryItem {
  question: string;
  answer: string;
  questionId: string;
  optionId: string;
}

export default function AIGuidePage() {
  const [started, setStarted] = useState(false);
  const [userStage] = useState<UserStage>('peak'); // 默认新用户在愚昧山峰

  if (!started) {
    return <WelcomePage onStart={() => setStarted(true)} userStage={userStage} />;
  }

  return <ConversationPage />;
}

// 欢迎页组件
function WelcomePage({ onStart, userStage }: { onStart: () => void; userStage: UserStage }) {
  const [showTheory, setShowTheory] = useState(false);

  return (
    <div className="ai-guide-container">
      <div className="welcome-section">
        {/* 主标题 */}
        <div className="welcome-header">
          <h1>🎯 有个问题不知道怎么解决？</h1>
          <p className="subtitle">让我帮你理清思路，找到最适合的思维工具</p>
        </div>

        {/* 价值主张 */}
        <div className="value-props">
          <div className="value-prop">
            <span className="prop-icon">⚡</span>
            <div>
              <h3>3 分钟找到答案</h3>
              <p>像玩游戏一样简单</p>
            </div>
          </div>
          <div className="value-prop">
            <span className="prop-icon">🎓</span>
            <div>
              <h3>边答边学</h3>
              <p>在过程中理解思维框架</p>
            </div>
          </div>
          <div className="value-prop">
            <span className="prop-icon">🎯</span>
            <div>
              <h3>精准推荐</h3>
              <p>5-8 个问题找到最佳方法</p>
            </div>
          </div>
        </div>

        {/* CTA 按钮 */}
        <div className="cta-section">
          <button className="btn-primary btn-large" onClick={onStart}>
            开始提问
          </button>
          <p className="cta-hint">💡 不需要任何背景知识，零门槛开始</p>
        </div>

        {/* 理论知识展开 */}
        <div className="theory-section">
          <button 
            className="theory-toggle"
            onClick={() => setShowTheory(!showTheory)}
          >
            {showTheory ? '收起' : '💡 了解核心思路：邓宁-克鲁格效应'}
            <span className={`arrow ${showTheory ? 'up' : 'down'}`}>▼</span>
          </button>

          {showTheory && (
            <div className="theory-content">
              <TheoryExplanation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 理论解释组件
function TheoryExplanation() {
  return (
    <div className="theory-explanation">
      <section className="theory-block">
        <h3>💡 为什么 AI 提问特别有效？</h3>
        <div className="theory-card">
          <h4>隐性知识 → 显性知识</h4>
          <p>
            你心里知道有问题，但不知道怎么说出来。这就是<strong>隐性知识</strong>。
          </p>
          <p>
            通过 AI 的结构化提问，帮你把模糊的感觉转化为清晰的表达。这就是<strong>显性知识</strong>。
          </p>
          <div className="example-box">
            <p><strong>例子：</strong></p>
            <p>❌ "我的项目有问题，但不知道怎么说..."</p>
            <p>✅ 经过提问后："原来是团队职责不清导致的！"</p>
          </div>
        </div>
      </section>

      <section className="theory-block">
        <h3>📊 邓宁-克鲁格效应</h3>
        <div className="theory-card">
          <p>这是一个认知心理学现象：能力欠缺的人往往高估自己，而真正有能力的人反而会低估自己。</p>
          
          <div className="dk-curve">
            <div className="curve-image">
              <img 
                src="/dunning-kruger-effect.png" 
                alt="邓宁-克鲁格效应曲线图" 
                className="dk-image"
              />
            </div>
          </div>

          <div className="stages-grid">
            <div className="stage-card peak">
              <h4>① 愚昧山峰</h4>
              <p className="stage-status">不知道自己不知道</p>
              <p>"我都懂" "这很简单"</p>
              <p className="stage-note">👉 大多数新用户在这里</p>
            </div>
            <div className="stage-card valley">
              <h4>② 绝望之谷</h4>
              <p className="stage-status">知道自己不知道</p>
              <p>"太难了" "我学不会"</p>
              <p className="stage-note">容易放弃的阶段</p>
            </div>
            <div className="stage-card slope">
              <h4>③ 开悟之坡</h4>
              <p className="stage-status">知道自己知道</p>
              <p>"我开始理解了"</p>
              <p className="stage-note">持续学习中</p>
            </div>
            <div className="stage-card plateau">
              <h4>④ 平稳高原</h4>
              <p className="stage-status">知道边界</p>
              <p>"我知道我不知道什么"</p>
              <p className="stage-note">成为专家</p>
            </div>
          </div>
        </div>
      </section>

      <section className="theory-block">
        <h3>🎯 我们如何帮助你？</h3>
        <div className="theory-card">
          <div className="help-steps">
            <div className="help-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>温和引导（愚昧山峰 → 绝望之谷）</h4>
                <p>不说教，通过简单问题让你意识到问题的维度</p>
              </div>
            </div>
            <div className="help-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>快速见效（绝望之谷 → 开悟之坡）</h4>
                <p>5-8 个问题就能找到答案，建立信心</p>
              </div>
            </div>
            <div className="help-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>持续成长（开悟之坡 → 平稳高原）</h4>
                <p>记录你的学习轨迹，看到自己的进步</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theory-block">
        <h3>🔬 技术原理：信息熵减</h3>
        <div className="theory-card">
          <p>每个好问题都会显著降低不确定性：</p>
          <div className="entropy-demo">
            <div className="entropy-step">
              <div className="entropy-bar" style={{ width: '100%', background: '#ef4444' }}>
                <span>初始：30 个方法论</span>
              </div>
              <p>完全不确定</p>
            </div>
            <div className="entropy-arrow">↓ 问题 1</div>
            <div className="entropy-step">
              <div className="entropy-bar" style={{ width: '50%', background: '#f59e0b' }}>
                <span>15 个方法论</span>
              </div>
              <p>不确定性降低 50%</p>
            </div>
            <div className="entropy-arrow">↓ 问题 2</div>
            <div className="entropy-step">
              <div className="entropy-bar" style={{ width: '27%', background: '#10b981' }}>
                <span>8 个方法论</span>
              </div>
              <p>继续缩小范围</p>
            </div>
            <div className="entropy-arrow">↓ 问题 3</div>
            <div className="entropy-step">
              <div className="entropy-bar" style={{ width: '10%', background: '#3b82f6' }}>
                <span>3 个方法论</span>
              </div>
              <p>高置信度，可以推荐</p>
            </div>
          </div>
        </div>
      </section>

      <section className="theory-block">
        <h3>🎓 苏格拉底式教学</h3>
        <div className="theory-card">
          <p>
            我们采用<strong>苏格拉底式提问法</strong>：不直接给答案，而是通过提问引导你自己发现答案。
          </p>
          <div className="comparison-box">
            <div className="comparison-item bad">
              <h4>❌ 传统方式</h4>
              <p>"你应该用 SWOT 分析"</p>
              <p className="note">用户：为什么？不理解</p>
            </div>
            <div className="comparison-item good">
              <h4>✅ 我们的方式</h4>
              <p>"你是想分析现状还是做决策？"</p>
              <p>"需要考虑内外部因素吗？"</p>
              <p>"希望结果是结构化的吗？"</p>
              <p className="note">用户：哦！SWOT 最合适！</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// 对话页面组件
function ConversationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<GuideQuestion | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistoryItem[]>([]);
  const [isRecommendation, setIsRecommendation] = useState(false);
  const [candidateMethods, setCandidateMethods] = useState<string[]>([]);

  // 加载起始问题
  useEffect(() => {
    loadStartQuestion();
  }, []);

  const loadStartQuestion = async () => {
    setLoading(true);
    try {
      const question = await getStartQuestion();
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Failed to load start question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (optionId: string, optionText: string) => {
    if (!currentQuestion) return;

    // 添加到对话历史
    const newHistoryItem: ConversationHistoryItem = {
      question: currentQuestion.question,
      answer: optionText,
      questionId: currentQuestion.id,
      optionId
    };
    
    const newHistory = [...conversationHistory, newHistoryItem];
    setConversationHistory(newHistory);

    // 构建上下文
    const context: ConversationContext = {
      answers: newHistory.map(h => ({
        questionId: h.questionId,
        optionId: h.optionId,
        text: h.answer
      }))
    };

    // 获取下一个问题
    setLoading(true);
    try {
      const nextQuestion = await getNextQuestion(currentQuestion.id, optionId, context);
      
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        
        // 检查是否是推荐结果
        if (nextQuestion.type === 'recommendation') {
          setIsRecommendation(true);
          setCandidateMethods(nextQuestion.methods || []);
        }
      } else {
        // 没有下一个问题，显示推荐结果
        const recommendations = await getRecommendations(context);
        setIsRecommendation(true);
        setCandidateMethods(recommendations.methods);
      }
    } catch (error) {
      console.error('Failed to get next question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMethod = (methodKey: string) => {
    router.push(`/methodology/${encodeURIComponent(methodKey)}`);
  };

  const handleRestart = () => {
    setConversationHistory([]);
    setIsRecommendation(false);
    setCandidateMethods([]);
    loadStartQuestion();
  };

  if (loading) {
    return (
      <div className="ai-guide-container">
        <div className="conversation-section">
          <div className="loading-message">
            <div className="loading-spinner">🤖</div>
            <p>AI 正在思考...</p>
          </div>
        </div>
      </div>
    );
  }

  // 推荐结果页面
  if (isRecommendation) {
    return (
      <div className="ai-guide-container">
        <div className="conversation-section">
          <div className="recommendation-result">
            <div className="result-header">
              <h2>🎯 为你推荐以下方法论</h2>
              <p>基于 {conversationHistory.length} 个问题的分析</p>
            </div>

            <div className="recommended-methods">
              {candidateMethods.map((methodKey) => {
                const method = methodologies[methodKey];
                if (!method) return null;
                
                return (
                  <div 
                    key={methodKey} 
                    className="method-card recommended"
                    onClick={() => handleSelectMethod(methodKey)}
                  >
                    <div className="method-card-header">
                      <h3>{method.name}</h3>
                      <span className="method-difficulty">{method.difficulty}</span>
                    </div>
                    <p className="method-description">{method.description}</p>
                    <div className="method-tags">
                      {method.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                    <button className="btn-select">开始使用 →</button>
                  </div>
                );
              })}
            </div>

            <div className="result-actions">
              <button className="btn-secondary" onClick={handleRestart}>
                🔄 重新开始
              </button>
              <Link href="/methodology" className="btn-secondary">
                📚 浏览所有方法论
              </Link>
            </div>

            {/* 对话历史回顾 */}
            <div className="conversation-review">
              <h3>💭 你的回答回顾</h3>
              <div className="review-list">
                {conversationHistory.map((item, index) => (
                  <div key={index} className="review-item">
                    <div className="review-question">Q{index + 1}: {item.question}</div>
                    <div className="review-answer">A: {item.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 对话进行中
  const totalQuestions = 6; // 预估总问题数
  const progress = Math.min((conversationHistory.length / totalQuestions) * 100, 85);

  return (
    <div className="ai-guide-container">
      <div className="conversation-section">
        {/* 进度条 */}
        <div className="progress-bar">
          <div className="progress-info">
            <span>问题 {conversationHistory.length + 1}</span>
            <span>匹配度: {Math.round(progress)}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 对话历史 */}
        <div className="conversation-history">
          {conversationHistory.map((item, index) => (
            <div key={index} className="message-pair">
              <div className="message ai-message">
                <span className="message-icon">🤖</span>
                <div className="message-content">
                  {item.question}
                </div>
              </div>
              <div className="message user-message">
                <div className="message-content">
                  {item.answer} ✓
                </div>
                <span className="message-icon">👤</span>
              </div>
            </div>
          ))}
        </div>

        {/* 当前问题 */}
        {currentQuestion && (
          <div className="current-question">
            <div className="question-card">
              <div className="question-header">
                <span className="question-icon">🤖</span>
                <h3>{currentQuestion.question}</h3>
              </div>
              <div className="options-grid">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.id}
                    className="option-button"
                    onClick={() => handleAnswer(option.id, option.text)}
                  >
                    <div className="option-text">{option.text}</div>
                    <div className="option-description">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 侧边栏 - 实时反馈 */}
        <div className="sidebar">
          <div className="sidebar-card">
            <h4>💡 当前可能的方法</h4>
            <div className="candidates-list">
              {candidateMethods.length > 0 ? (
                candidateMethods.slice(0, 3).map((methodKey, index) => {
                  const method = methodologies[methodKey];
                  return method ? (
                    <div key={methodKey} className="candidate-item">
                      <span className="candidate-name">{method.name}</span>
                      <span className="candidate-confidence">{85 - index * 5}%</span>
                    </div>
                  ) : null;
                })
              ) : (
                <>
                  <div className="candidate-item">
                    <span className="candidate-name">分析中...</span>
                    <span className="candidate-confidence">--</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="sidebar-card">
            <h4>📊 你的进度</h4>
            <p>已回答 {conversationHistory.length} 个问题</p>
            <p>继续回答，找到最适合的方法！</p>
          </div>

          <div className="sidebar-card">
            <button className="btn-restart" onClick={handleRestart}>
              🔄 重新开始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
