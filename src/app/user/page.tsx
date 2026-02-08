'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserStats } from '@/api/user';
import { getAllPracticeRecords } from '@/api/practice';
import { User, UserStats } from '@/types/user';
import { PracticeRecord } from '@/types/methodology';
import './user.css';

export default function UserCenterPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [practices, setPractices] = useState<PracticeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'practices'>('overview');
  const [selectedPractices, setSelectedPractices] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

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

  const handleViewPractice = (methodologyKey: string, timestamp?: string) => {
    if (timestamp) {
      // 带上时间戳参数，用于回填数据
      router.push(`/methodology/${methodologyKey}?timestamp=${encodeURIComponent(timestamp)}`);
    } else {
      router.push(`/methodology/${methodologyKey}`);
    }
  };

  const handleDeletePractice = async (timestamp: string) => {
    if (!confirm('确定要删除这条实践记录吗？')) {
      return;
    }

    try {
      const { deletePracticeRecord } = await import('@/api/practice');
      await deletePracticeRecord(timestamp);
      
      // 重新加载数据
      await loadUserData();
      
      alert('删除成功！');
    } catch (error) {
      console.error('Failed to delete practice:', error);
      alert('删除失败，请重试');
    }
  };

  const toggleSelection = (timestamp: string) => {
    const newSelected = new Set(selectedPractices);
    if (newSelected.has(timestamp)) {
      newSelected.delete(timestamp);
    } else {
      newSelected.add(timestamp);
    }
    setSelectedPractices(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedPractices.size === practices.length) {
      setSelectedPractices(new Set());
    } else {
      setSelectedPractices(new Set(practices.map(p => p.timestamp)));
    }
  };

  const handleBatchDelete = async () => {
    if (selectedPractices.size === 0) {
      alert('请先选择要删除的记录');
      return;
    }

    if (!confirm(`确定要删除选中的 ${selectedPractices.size} 条记录吗？`)) {
      return;
    }

    try {
      const { deletePracticeRecord } = await import('@/api/practice');
      
      // 批量删除
      await Promise.all(
        Array.from(selectedPractices).map(timestamp => 
          deletePracticeRecord(timestamp)
        )
      );
      
      // 重新加载数据
      await loadUserData();
      
      // 清空选择
      setSelectedPractices(new Set());
      setIsSelectionMode(false);
      
      alert('批量删除成功！');
    } catch (error) {
      console.error('Failed to batch delete practices:', error);
      alert('批量删除失败，请重试');
    }
  };

  const cancelSelection = () => {
    setSelectedPractices(new Set());
    setIsSelectionMode(false);
  };

  if (loading) {
    return (
      <div className="methodology-container">
        <div className="methodology-header">
          <h1>👤 用户中心</h1>
        </div>
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

            {stats.topMethodologies && stats.topMethodologies.length > 0 && (
              <div className="favorite-methodology">
                <h3>🌟 最常用的方法论</h3>
                <div className="methodology-cards-grid">
                  {stats.topMethodologies.map((method, index) => (
                    <div 
                      key={method.key} 
                      className="methodology-card"
                      onClick={() => handleViewPractice(method.key)}
                    >
                      <div className="card-rank">#{index + 1}</div>
                      <div className="card-content">
                        <div className="card-category">{method.category}</div>
                        <div className="card-name">{method.name}</div>
                        {method.tags && method.tags.length > 0 && (
                          <div className="card-tags">
                            {method.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="card-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="card-count">{method.count} 次使用</div>
                      </div>
                      <div className="card-arrow">→</div>
                    </div>
                  ))}
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
              <>
                {/* 批量操作工具栏 */}
                <div className="practices-toolbar">
                  <div className="toolbar-left">
                    {!isSelectionMode ? (
                      <>
                        <button
                          className="btn-toolbar btn-add-new"
                          onClick={() => router.push('/methodology')}
                        >
                          ➕ 新增记录
                        </button>
                        <button
                          className="btn-toolbar btn-batch-delete-mode"
                          onClick={() => setIsSelectionMode(true)}
                        >
                          🗑️ 批量删除
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-toolbar btn-cancel"
                          onClick={cancelSelection}
                        >
                          ← 取消
                        </button>
                        <button
                          className="btn-toolbar btn-select-all"
                          onClick={toggleSelectAll}
                        >
                          {selectedPractices.size === practices.length ? '✓ 取消全选' : '☑️ 全选'}
                        </button>
                        <span className="selection-count">
                          已选择 {selectedPractices.size} / {practices.length} 条
                        </span>
                      </>
                    )}
                  </div>
                  <div className="toolbar-right">
                    {isSelectionMode && (
                      <button
                        className="btn-toolbar btn-delete-batch"
                        onClick={handleBatchDelete}
                        disabled={selectedPractices.size === 0}
                      >
                        🗑️ 删除选中 ({selectedPractices.size})
                      </button>
                    )}
                  </div>
                </div>

                <div className="practices-list">
                  {practices.map((practice, index) => (
                    <div 
                      key={index} 
                      className={`practice-item ${selectedPractices.has(practice.timestamp) ? 'selected' : ''}`}
                    >
                      {/* 选择框 */}
                      {isSelectionMode && (
                        <div className="practice-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedPractices.has(practice.timestamp)}
                            onChange={() => toggleSelection(practice.timestamp)}
                          />
                        </div>
                      )}

                      <div className="practice-content">
                        {/* 紧凑的单行布局 - 整行可点击 */}
                        <div 
                          className="practice-compact-row clickable-row"
                          onClick={() => handleViewPractice(practice.methodology, practice.timestamp)}
                          title="点击查看详情"
                        >
                          {/* 左侧：问题描述 */}
                          <div className="practice-description">
                            <span className="description-label">问题描述：</span>
                            <span className="description-text">{practice.context}</span>
                          </div>

                          {/* 中间：元数据 */}
                          <div className="practice-meta">
                            <span className="meta-item meta-date">
                              {new Date(practice.timestamp).toLocaleString('zh-CN', {
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {practice.questionAnswers && practice.questionAnswers.length > 0 && (
                              <span className="meta-item meta-answers">
                                {practice.questionAnswers.filter(qa => qa.answer).length} 个回答
                              </span>
                            )}
                          </div>

                          {/* 右侧：操作按钮 */}
                          {!isSelectionMode && (
                            <div className="practice-actions-compact">
                              <button
                                className="btn-compact-action btn-view-compact"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewPractice(practice.methodology, practice.timestamp);
                                }}
                                title="查看方法论详情"
                              >
                                📖 查看
                              </button>
                              <button
                                className="btn-compact-action btn-delete-compact"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePractice(practice.timestamp);
                                }}
                                title="删除此记录"
                              >
                                🗑️ 删除
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
