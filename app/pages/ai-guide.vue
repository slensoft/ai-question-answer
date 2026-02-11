<script setup lang="ts">
import { getStartQuestion, getNextQuestion, getRecommendations } from '@/api/ai-guide'
import type { GuideQuestion, ConversationContext } from '@/api/ai-guide'
import { methodologies } from '@/lib/methodology-data'

type ConversationHistoryItem = {
  question: string
  answer: string
  questionId: string
  optionId: string
}

const router = useRouter()
const started = ref(false)
const showTheory = ref(false)
const loading = ref(true)
const currentQuestion = ref<GuideQuestion | null>(null)
const conversationHistory = ref<ConversationHistoryItem[]>([])
const isRecommendation = ref(false)
const candidateMethods = ref<string[]>([])

const loadStartQuestion = async () => {
  loading.value = true
  try {
    currentQuestion.value = await getStartQuestion()
  } finally {
    loading.value = false
  }
}

const handleAnswer = async (optionId: string, optionText: string) => {
  if (!currentQuestion.value) return

  const newHistory = [...conversationHistory.value, {
    question: currentQuestion.value.question,
    answer: optionText,
    questionId: currentQuestion.value.id,
    optionId,
  }]
  conversationHistory.value = newHistory

  const context: ConversationContext = {
    answers: newHistory.map((h) => ({ questionId: h.questionId, optionId: h.optionId, text: h.answer })),
  }

  loading.value = true
  try {
    const nextQuestion = await getNextQuestion(currentQuestion.value.id, optionId, context)
    if (nextQuestion) {
      currentQuestion.value = nextQuestion
      if (nextQuestion.type === 'recommendation') {
        isRecommendation.value = true
        candidateMethods.value = nextQuestion.methods || []
      }
    } else {
      const recommendations = await getRecommendations(context)
      isRecommendation.value = true
      candidateMethods.value = recommendations.methods
    }
  } finally {
    loading.value = false
  }
}

const handleRestart = async () => {
  conversationHistory.value = []
  isRecommendation.value = false
  candidateMethods.value = []
  await loadStartQuestion()
}

const totalQuestions = 6
const progress = computed(() => Math.min((conversationHistory.value.length / totalQuestions) * 100, 85))
</script>

<template>
  <div class="ai-guide-container">
    <div v-if="!started" class="welcome-section">
      <div class="welcome-header">
        <h1>🎯 有个问题不知道怎么解决？</h1>
        <p class="subtitle">让我帮你理清思路，找到最适合的思维工具</p>
      </div>

      <div class="value-props">
        <div class="value-prop"><span class="prop-icon">⚡</span><div><h3>3 分钟找到答案</h3><p>像玩游戏一样简单</p></div></div>
        <div class="value-prop"><span class="prop-icon">🎓</span><div><h3>边答边学</h3><p>在过程中理解思维框架</p></div></div>
        <div class="value-prop"><span class="prop-icon">🎯</span><div><h3>精准推荐</h3><p>5-8 个问题找到最佳方法</p></div></div>
      </div>

      <div class="cta-section">
        <button class="btn-primary btn-large" @click="started = true; loadStartQuestion()">开始提问</button>
        <p class="cta-hint">💡 不需要任何背景知识，零门槛开始</p>
      </div>

      <div class="theory-section">
        <button class="theory-toggle" @click="showTheory = !showTheory">
          {{ showTheory ? '收起' : '💡 了解核心思路：邓宁-克鲁格效应' }}
          <span :class="['arrow', showTheory ? 'up' : 'down']">▼</span>
        </button>
        <div v-if="showTheory" class="theory-content">
          <section class="theory-block">
            <h3>📊 邓宁-克鲁格效应</h3>
            <div class="theory-card">
              <p>通过结构化提问，把隐性知识变成显性知识，逐步降低问题不确定性。</p>
              <div class="curve-image"><img src="/dunning-kruger-effect.png" alt="邓宁-克鲁格效应曲线图" class="dk-image" /></div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div v-else class="conversation-section">
      <div v-if="loading" class="loading-message"><div class="loading-spinner">🤖</div><p>AI 正在思考...</p></div>

      <template v-else-if="isRecommendation">
        <div class="recommendation-result">
          <div class="result-header"><h2>🎯 为你推荐以下方法论</h2><p>基于 {{ conversationHistory.length }} 个问题的分析</p></div>
          <div class="recommended-methods">
            <div v-for="methodKey in candidateMethods" :key="methodKey" class="method-card recommended" @click="router.push(`/methodology/${encodeURIComponent(methodKey)}`)">
              <div v-if="methodologies[methodKey]">
                <div class="method-card-header"><h3>{{ methodologies[methodKey].name }}</h3><span class="method-difficulty">{{ methodologies[methodKey].difficulty }}</span></div>
                <p class="method-description">{{ methodologies[methodKey].description }}</p>
                <div class="method-tags"><span v-for="tag in methodologies[methodKey].tags" :key="tag" class="tag">{{ tag }}</span></div>
                <button class="btn-select">开始使用 →</button>
              </div>
            </div>
          </div>
          <div class="result-actions">
            <button class="btn-secondary" @click="handleRestart">🔄 重新开始</button>
            <NuxtLink to="/methodology" class="btn-secondary">📚 浏览所有方法论</NuxtLink>
          </div>
          <div class="conversation-review">
            <h3>💭 你的回答回顾</h3>
            <div class="review-list">
              <div v-for="(item, i) in conversationHistory" :key="i" class="review-item">
                <div class="review-question">Q{{ i + 1 }}: {{ item.question }}</div>
                <div class="review-answer">A: {{ item.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="progress-bar">
          <div class="progress-info"><span>问题 {{ conversationHistory.length + 1 }}</span><span>匹配度: {{ Math.round(progress) }}%</span></div>
          <div class="progress-track"><div class="progress-fill" :style="{ width: `${progress}%` }" /></div>
        </div>

        <div class="conversation-history">
          <div v-for="(item, index) in conversationHistory" :key="index" class="message-pair">
            <div class="message ai-message"><span class="message-icon">🤖</span><div class="message-content">{{ item.question }}</div></div>
            <div class="message user-message"><div class="message-content">{{ item.answer }} ✓</div><span class="message-icon">👤</span></div>
          </div>
        </div>

        <div v-if="currentQuestion" class="current-question">
          <div class="question-card">
            <div class="question-header"><span class="question-icon">🤖</span><h3>{{ currentQuestion.question }}</h3></div>
            <div class="options-grid">
              <button v-for="option in currentQuestion.options || []" :key="option.id" class="option-button" @click="handleAnswer(option.id, option.text)">
                <div class="option-text">{{ option.text }}</div>
                <div class="option-description">{{ option.description }}</div>
              </button>
            </div>
          </div>
        </div>

        <div class="sidebar">
          <div class="sidebar-card">
            <h4>💡 当前可能的方法</h4>
            <div class="candidates-list">
              <div v-for="(methodKey, i) in candidateMethods.slice(0, 3)" :key="methodKey" class="candidate-item">
                <span class="candidate-name">{{ methodologies[methodKey]?.name }}</span>
                <span class="candidate-confidence">{{ 85 - i * 5 }}%</span>
              </div>
              <div v-if="candidateMethods.length === 0" class="candidate-item"><span class="candidate-name">分析中...</span><span class="candidate-confidence">--</span></div>
            </div>
          </div>
          <div class="sidebar-card"><h4>📊 你的进度</h4><p>已回答 {{ conversationHistory.length }} 个问题</p><p>继续回答，找到最适合的方法！</p></div>
          <div class="sidebar-card"><button class="btn-restart" @click="handleRestart">🔄 重新开始</button></div>
        </div>
      </template>
    </div>
  </div>
</template>
