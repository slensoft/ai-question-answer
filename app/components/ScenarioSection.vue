<script setup lang="ts">
import { getScenarioNeeds } from '@/api/methodology'
import type { ScenarioNeed } from '@/types/methodology'

const emit = defineEmits<{ select: [key: string] }>()

const showModal = ref(false)
const selectedScenario = ref('')
const scenarioNeeds = ref<Record<string, ScenarioNeed[]>>({})
const loading = ref(true)

const scenarios = [
  { id: 'work', icon: '💼', name: '工作场景', desc: '向领导汇报、项目复盘、团队会议、跨部门协作等' },
  { id: 'learning', icon: '📚', name: '学习场景', desc: '学习新知识、阅读论文、向导师请教、自我反思等' },
  { id: 'innovation', icon: '💡', name: '创新场景', desc: '产品创新、头脑风暴、突破僵局、商业模式创新等' },
  { id: 'decision', icon: '🎲', name: '决策场景', desc: '技术选型、风险评估、资源分配、投资决策等' },
]

onMounted(async () => {
  try {
    scenarioNeeds.value = await getScenarioNeeds()
  } finally {
    loading.value = false
  }
})

const handleNeedSelect = (methodKey: string) => {
  showModal.value = false
  emit('select', methodKey)
}
</script>

<template>
  <div v-if="loading" class="scenario-section">
    <h2>🎯 按场景选择</h2>
    <div class="loading-text">加载中...</div>
  </div>

  <template v-else>
    <div class="scenario-section">
      <h2>🎯 按场景选择</h2>
      <p style="text-align: center; color: #666; margin-bottom: 30px">根据你当前的实际场景，快速找到最适合的方法论</p>
      <div class="scenario-grid">
        <div v-for="s in scenarios" :key="s.id" class="scenario-card" @click="selectedScenario = s.id; showModal = true">
          <div class="icon">{{ s.icon }}</div>
          <h3>{{ s.name }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <h2>选择具体需求</h2>
        <div class="options">
          <button v-for="need in (scenarioNeeds[selectedScenario] || [])" :key="need.id" class="option-btn" @click="handleNeedSelect(need.methods[0])">
            <strong>{{ need.name }}</strong>
            <br />
            <small>推荐方法：{{ need.methods.join('、') }}</small>
          </button>
        </div>
        <button class="btn btn-secondary" style="margin-top: 20px; width: 100%" @click="showModal = false">取消</button>
      </div>
    </div>
  </template>
</template>
