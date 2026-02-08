'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserStats } from '@/api/user';
import { getAllPracticeRecords } from '@/api/practice';
import { User, UserStats } from '@/types/user';
import { PracticeRecord } from '@/types/methodology';
import MethodologyNav from '@/components/MethodologyNav';
import './user.css';

export default function UserCenterPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [practices, setPractices] = useState<PracticeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'practices'>('overview');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [userData, statsData, practicesData] = await Promise.all([
        getCurrentUser(),
        getUserStats(),
        getAllPracticeRecords()
      ]);
      setUser(userData);
      setStats(statsData);
      setPractices(practicesData);
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPractice = (methodologyKey: string) => {
    router.push(`/methodology/${methodologyKey}`);
  };

  if (loading) {
    return (
      <div className="methodology-container">
        <div className="methodology-header">
          <h1>👤 用户中心</h1>
        </div>
        <MethodologyNav />
        <div className="methodology-content">
          <div className="loading">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="methodology-container">
      <div className="methodology-header">
        <h1>👤 用户中心</h1>
        <p>查看你的学习记录和统计数据</p>
      </div>

      <MethodologyNav />

      <div className="methodology-content">
        {/* 用户信息卡片 */}
        <div className="user-profile-card">
          <div className="user-avatar">
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.username} />
            ) : (
              <div className="avatar-placeholder">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-info">
            <h2>{user?.username}</h2>
            {user?.email && <p className="user-email">{user.email}</p>}
            <p className="user-joined">
              加入时间: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '-'}
            </p>
          </div>
        </div>

        {/* 标签页 */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 数据概览
          </button>
          <button
            className={`tab ${activeTab === 'practices' ? 'active' : ''}`}
            onClick={() => setActiveTab('practices')}
          >
            📝 实践记录
          </button>
        </div>

        {/* 数据概览 */}
        {activeTab === 'overview' && stats && (
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-value">{stats.totalPractices}</div>
                <div className="stat-label">总练习次数</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-value">{stats.totalMethodologies}</div>
                <div className="stat-label">使用方法论数</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-value">{stats.practiceStreak}</div>
                <div className="stat-label">连续练习天数</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-value">{stats.recentActivity}</div>
                <div className="stat-label">最近7天活动</div>
              </div>
            </div>

            {stats.favoriteMethodology && (
              <div className="favorite-methodology">
                <h3>🌟 最常用的方法论</h3>
                <div className="favorite-card" onClick={() => handleViewPractice(stats.favoriteMethodology!)}>
                  <span className="favorite-name">{stats.favoriteMethodology}</span>
                  <span className="favorite-hint">点击查看详情 →</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 实践记录列表 */}
        {activeTab === 'practices' && (
          <div className="practices-section">
            {practices.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>还没有实践记录</h3>
                <p>开始使用方法论进行实践吧！</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => router.push('/methodology')}
                >
                  开始学习
                </button>
              </div>
            ) : (
              <div className="practices-list">
                {practices.map((practice, index) => (
                  <div key={index} className="practice-item">
                    <div className="practice-header">
                      <div className="practice-method">
                        <span className="method-badge">{practice.methodologyName}</span>
                        <span className="method-category">{practice.methodologyCategory}</span>
                      </div>
                      <div className="practice-date">
                        {new Date(practice.timestamp).toLocaleString('zh-CN')}
                      </div>
                    </div>
                    
                    <div className="practice-context">
                      <strong>问题描述：</strong>
                      <p>{practice.context}</p>
                    </div>
                    
                    {practice.questionAnswers && practice.questionAnswers.length > 0 && (
                      <div className="practice-answers">
                        <strong>回答了 {practice.questionAnswers.filter(qa => qa.answer).length} 个问题</strong>
                        <div className="answers-preview">
                          {practice.questionAnswers
                            .filter(qa => qa.answer)
                            .slice(0, 2)
                            .map((qa, i) => (
                              <div key={i} className="answer-preview">
                                <span className="question-num">Q{qa.questionNumber}:</span>
                                <span className="answer-text">
                                  {qa.answer.substring(0, 50)}
                                  {qa.answer.length > 50 ? '...' : ''}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {practice.reflection && (
                      <div className="practice-reflection">
                        <strong>💡 反思：</strong>
                        <p>{practice.reflection}</p>
                      </div>
                    )}
                    
                    <div className="practice-actions">
                      <button
                        className="btn-link"
                        onClick={() => handleViewPractice(practice.methodology)}
                      >
                        查看方法论详情 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
