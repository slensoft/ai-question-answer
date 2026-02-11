<script setup lang="ts">
import { getCurrentUser, getUserStats } from '@/api/user'
import { getAllPracticeRecords, deletePracticeRecord } from '@/api/practice'
import type { User, UserStats } from '@/types/user'
import type { PracticeRecord } from '@/types/methodology'

const router = useRouter()

const user = ref<User | null>(null)
const stats = ref<UserStats | null>(null)
const practices = ref<PracticeRecord[]>([])
const loading = ref(true)
const activeTab = ref<'overview' | 'practices'>('overview')
const selectedPractices = ref<Set<string>>(new Set())
const isSelectionMode = ref(false)

const loadUserData = async () => {
  loading.value = true
  try {
    const [userData, statsData, practicesData] = await Promise.all([getCurrentUser(), getUserStats(), getAllPracticeRecords()])
    user.value = userData
    stats.value = statsData
    practices.value = practicesData
  } finally {
    loading.value = false
  }
}

const handleViewPractice = (methodologyKey: string, timestamp?: string) => {
  router.push(timestamp ? `/methodology/${encodeURIComponent(methodologyKey)}?timestamp=${encodeURIComponent(timestamp)}` : `/methodology/${encodeURIComponent(methodologyKey)}`)
}

const handleDeletePractice = async (timestamp: string) => {
  if (!window.confirm('确定要删除这条实践记录吗？')) return
  await deletePracticeRecord(timestamp)
  await loadUserData()
  window.alert('删除成功！')
}

const toggleSelection = (timestamp: string) => {
  const next = new Set(selectedPractices.value)
  if (next.has(timestamp)) next.delete(timestamp)
  else next.add(timestamp)
  selectedPractices.value = next
}

const toggleSelectAll = () => {
  if (selectedPractices.value.size === practices.value.length) selectedPractices.value = new Set()
  else selectedPractices.value = new Set(practices.value.map((p) => p.timestamp))
}

const handleBatchDelete = async () => {
  if (selectedPractices.value.size === 0) return window.alert('请先选择要删除的记录')
  if (!window.confirm(`确定要删除选中的 ${selectedPractices.value.size} 条记录吗？`)) return

  await Promise.all(Array.from(selectedPractices.value).map((timestamp) => deletePracticeRecord(timestamp)))
  await loadUserData()
  selectedPractices.value = new Set()
  isSelectionMode.value = false
  window.alert('批量删除成功！')
}

onMounted(loadUserData)
</script>

<template>
  <div class="methodology-container">
    <div class="methodology-header">
      <h1>👤 用户中心</h1>
      <p v-if="!loading">查看你的学习记录和统计数据</p>
    </div>

    <div class="methodology-content">
      <div v-if="loading" class="loading">加载中...</div>

      <template v-else>
        <div class="user-profile-card">
          <div class="user-avatar">
            <img v-if="user?.avatar" :src="user.avatar" :alt="user.username" />
            <div v-else class="avatar-placeholder">{{ (user?.username?.charAt(0) || '?').toUpperCase() }}</div>
          </div>
          <div class="user-info">
            <h2>{{ user?.username }}</h2>
            <p v-if="user?.email" class="user-email">{{ user.email }}</p>
            <p class="user-joined">加入时间: {{ user?.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-CN') : '-' }}</p>
          </div>
        </div>

        <div class="tabs">
          <button :class="['tab', activeTab === 'overview' ? 'active' : '']" @click="activeTab = 'overview'">📊 数据概览</button>
          <button :class="['tab', activeTab === 'practices' ? 'active' : '']" @click="activeTab = 'practices'">📝 实践记录</button>
        </div>

        <div v-if="activeTab === 'overview' && stats" class="stats-section">
          <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-value">{{ stats.totalPractices }}</div><div class="stat-label">总练习次数</div></div>
            <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-value">{{ stats.totalMethodologies }}</div><div class="stat-label">使用方法论数</div></div>
            <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-value">{{ stats.practiceStreak }}</div><div class="stat-label">连续练习天数</div></div>
            <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-value">{{ stats.recentActivity }}</div><div class="stat-label">最近7天活动</div></div>
          </div>

          <div v-if="stats.topMethodologies?.length" class="favorite-methodology">
            <h3>🌟 最常用的方法论</h3>
            <div class="methodology-cards-grid">
              <div v-for="(method, index) in stats.topMethodologies" :key="method.key" class="methodology-card" @click="handleViewPractice(method.key)">
                <div class="card-rank">#{{ index + 1 }}</div>
                <div class="card-content">
                  <div class="card-category">{{ method.category }}</div>
                  <div class="card-name">{{ method.name }}</div>
                  <div v-if="method.tags?.length" class="card-tags"><span v-for="tag in method.tags.slice(0, 3)" :key="tag" class="card-tag">{{ tag }}</span></div>
                  <div class="card-count">{{ method.count }} 次使用</div>
                </div>
                <div class="card-arrow">→</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'practices'" class="practices-section">
          <div v-if="practices.length === 0" class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>还没有实践记录</h3>
            <p>开始使用方法论进行实践吧！</p>
            <button class="btn btn-primary" @click="router.push('/methodology')">开始学习</button>
          </div>

          <template v-else>
            <div class="practices-toolbar">
              <div class="toolbar-left">
                <template v-if="!isSelectionMode">
                  <button class="btn-toolbar btn-add-new" @click="router.push('/methodology')">➕ 新增记录</button>
                  <button class="btn-toolbar btn-batch-delete-mode" @click="isSelectionMode = true">🗑️ 批量删除</button>
                </template>
                <template v-else>
                  <button class="btn-toolbar btn-cancel" @click="selectedPractices = new Set(); isSelectionMode = false">← 取消</button>
                  <button class="btn-toolbar btn-select-all" @click="toggleSelectAll">{{ selectedPractices.size === practices.length ? '✓ 取消全选' : '☑️ 全选' }}</button>
                  <span class="selection-count">已选择 {{ selectedPractices.size }} / {{ practices.length }} 条</span>
                </template>
              </div>
              <div class="toolbar-right">
                <button v-if="isSelectionMode" class="btn-toolbar btn-delete-batch" :disabled="selectedPractices.size === 0" @click="handleBatchDelete">🗑️ 删除选中 ({{ selectedPractices.size }})</button>
              </div>
            </div>

            <div class="practices-list">
              <div v-for="practice in practices" :key="practice.timestamp" :class="['practice-item', selectedPractices.has(practice.timestamp) ? 'selected' : '']">
                <div v-if="isSelectionMode" class="practice-checkbox">
                  <input type="checkbox" :checked="selectedPractices.has(practice.timestamp)" @change="toggleSelection(practice.timestamp)" />
                </div>

                <div class="practice-content">
                  <div class="practice-compact-row clickable-row" title="点击查看详情" @click="handleViewPractice(practice.methodology, practice.timestamp)">
                    <div class="practice-description">
                      <span class="description-label">问题描述：</span>
                      <span class="description-text">{{ practice.context }}</span>
                    </div>
                    <div class="practice-meta">
                      <span class="meta-item meta-date">{{ new Date(practice.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}</span>
                      <span v-if="practice.questionAnswers?.length" class="meta-item meta-answers">{{ practice.questionAnswers.filter((qa) => qa.answer).length }} 个回答</span>
                    </div>
                    <div v-if="!isSelectionMode" class="practice-actions-compact">
                      <button class="btn-compact-action btn-view-compact" title="查看方法论详情" @click.stop="handleViewPractice(practice.methodology, practice.timestamp)">📖 查看</button>
                      <button class="btn-compact-action btn-delete-compact" title="删除此记录" @click.stop="handleDeletePractice(practice.timestamp)">🗑️ 删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
