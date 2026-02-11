<script setup lang="ts">
import { getMethodologyByKey } from '@/api/methodology'
import { getPracticeRecordsByMethodology } from '@/api/practice'
import { generateAISuggestions } from '@/api/ai'
import { usePracticeHistory } from '@/composables/usePracticeHistory'
import type { Methodology, PracticeRecord, Question, QuestionAnswer } from '@/types/methodology'
import MethodologyHeader from '@/components/MethodologyHeader.vue'

const props = defineProps<{ methodologyKey: string }>()

interface AISuggestion {
  text: string
  selected: boolean
}

const route = useRoute()
const router = useRouter()
const { saveRecord } = usePracticeHistory()

const method = ref<Methodology | null>(null)
const loading = ref(true)
const context = ref('')
const contextTitle = ref('')
const reflection = ref('')
const answers = ref<Record<number, string>>({})
const selectedQuickOptions = ref<Record<number, Set<string>>>({})
const aiSuggestions = ref<Record<number, AISuggestion[]>>({})
const loadingAI = ref<Record<number, boolean>>({})
const autoLoadedAI = ref<Record<number, boolean>>({})
const expandedQuestions = ref<Record<number, boolean>>({})
const historyRecords = ref<PracticeRecord[]>([])
const toast = ref<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
const showExample = ref(false)

const normalizeQuestion = (q: string | Question): Question => (typeof q === 'string' ? { text: q } : q)
const getQuestionText = (q: string | Question): string => (typeof q === 'string' ? q : q.text)

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toast.value = { message, type }
  setTimeout(() => {
    toast.value = null
  }, 3000)
}

const loadHistoryRecord = (record: PracticeRecord) => {
  contextTitle.value = record.contextTitle || ''
  context.value = record.context

  const newAnswers: Record<number, string> = {}
  const newSelectedOptions: Record<number, Set<string>> = {}

  record.questionAnswers.forEach((qa) => {
    const questionIndex = qa.questionNumber - 1
    newAnswers[questionIndex] = qa.answer

    const question = method.value?.questions[questionIndex]
    if (question && typeof question !== 'string' && question.quickOptions) {
      const selectedOpts = new Set<string>()
      question.quickOptions.forEach((option) => {
        if (qa.answer.includes(option)) selectedOpts.add(option)
      })
      if (selectedOpts.size > 0) newSelectedOptions[questionIndex] = selectedOpts
    }
  })

  answers.value = newAnswers
  selectedQuickOptions.value = newSelectedOptions
  reflection.value = record.reflection || ''

  const expanded: Record<number, boolean> = {}
  Object.keys(newAnswers).forEach((key) => {
    expanded[Number(key)] = true
  })
  expandedQuestions.value = expanded
}

const loadMethodology = async () => {
  loading.value = true
  try {
    method.value = await getMethodologyByKey(props.methodologyKey)
    historyRecords.value = await getPracticeRecordsByMethodology(props.methodologyKey)

    const timestamp = route.query.timestamp as string | undefined
    if (!timestamp || !method.value) return

    const record = historyRecords.value.find((r) => r.timestamp === timestamp)
    if (record) loadHistoryRecord(record)
  } finally {
    loading.value = false
  }
}

const handleAnswerChange = (index: number, value: string) => {
  answers.value = { ...answers.value, [index]: value }
}

const onAnswerInput = (index: number, event: Event) => {
  handleAnswerChange(index, (event.target as HTMLTextAreaElement).value)
}

const generateAISuggestionsForQuestion = async (questionIndex: number, question: string, isAuto = false) => {
  if (!context.value.trim() && !contextTitle.value.trim()) {
    if (!isAuto) showToast('请先填写问题标题或情景描述，AI才能提供相关建议', 'info')
    return
  }

  loadingAI.value = { ...loadingAI.value, [questionIndex]: true }
  try {
    const fullContext = contextTitle.value.trim() ? `${contextTitle.value}\n\n${context.value}` : context.value
    const aiResponse = await generateAISuggestions({
      context: fullContext,
      question,
      methodologyName: method.value?.name || '',
      previousAnswers: Object.values(answers.value).filter((a) => a.trim()),
    })

    aiSuggestions.value = {
      ...aiSuggestions.value,
      [questionIndex]: aiResponse.map((s) => ({ text: s.text, selected: false })),
    }
    if (isAuto) autoLoadedAI.value = { ...autoLoadedAI.value, [questionIndex]: true }
  } catch {
    if (!isAuto) showToast('AI建议生成失败，请重试', 'error')
  } finally {
    loadingAI.value = { ...loadingAI.value, [questionIndex]: false }
  }
}

const toggleQuestion = (index: number) => {
  const isExpanding = !expandedQuestions.value[index]
  expandedQuestions.value = { ...expandedQuestions.value, [index]: isExpanding }

  if (isExpanding && context.value.trim() && !autoLoadedAI.value[index] && !aiSuggestions.value[index]) {
    const q = method.value?.questions[index]
    if (q) generateAISuggestionsForQuestion(index, getQuestionText(q), true)
  }
}

const selectAISuggestion = (questionIndex: number, suggestionIndex: number) => {
  const suggestions = aiSuggestions.value[questionIndex]
  if (!suggestions) return

  const suggestion = suggestions[suggestionIndex]
  const currentAnswer = answers.value[questionIndex] || ''

  if (suggestion.selected) {
    const parts = currentAnswer.split('\n\n').filter((part) => part.trim() !== suggestion.text.trim())
    handleAnswerChange(questionIndex, parts.join('\n\n'))
  } else {
    handleAnswerChange(questionIndex, currentAnswer ? `${currentAnswer}\n\n${suggestion.text}` : suggestion.text)
  }

  aiSuggestions.value = {
    ...aiSuggestions.value,
    [questionIndex]: suggestions.map((s, i) => (i === suggestionIndex ? { ...s, selected: !s.selected } : s)),
  }
}

const selectQuickOption = (questionIndex: number, option: string) => {
  const currentAnswer = answers.value[questionIndex] || ''
  const selected = selectedQuickOptions.value[questionIndex] || new Set<string>()

  if (selected.has(option)) {
    const nextSelected = new Set(selected)
    nextSelected.delete(option)
    selectedQuickOptions.value = { ...selectedQuickOptions.value, [questionIndex]: nextSelected }
    const parts = currentAnswer.split('; ').filter((part) => part.trim() !== option.trim())
    handleAnswerChange(questionIndex, parts.join('; '))
    return
  }

  const nextSelected = new Set(selected)
  nextSelected.add(option)
  selectedQuickOptions.value = { ...selectedQuickOptions.value, [questionIndex]: nextSelected }
  handleAnswerChange(questionIndex, currentAnswer ? `${currentAnswer}; ${option}` : option)
}

const handleSubmit = async () => {
  if (!method.value) return

  if (!context.value.trim() && !contextTitle.value.trim()) {
    showToast('请填写问题标题或情景描述！', 'error')
    return
  }

  const questionAnswers: QuestionAnswer[] = method.value.questions.map((q, i) => ({
    questionNumber: i + 1,
    question: getQuestionText(q),
    answer: answers.value[i] || '',
  }))

  if (!questionAnswers.some((qa) => qa.answer.trim())) {
    showToast('请至少回答一个问题！', 'error')
    return
  }

  await saveRecord({
    timestamp: new Date().toISOString(),
    methodology: props.methodologyKey,
    methodologyName: method.value.name,
    methodologyCategory: method.value.category,
    methodologyDescription: method.value.description,
    methodologyTags: method.value.tags,
    contextTitle: contextTitle.value,
    context: context.value,
    questionAnswers,
    reflection: reflection.value,
  })

  showToast(`✅ 已保存 ${Object.values(answers.value).filter((a) => a.trim()).length} 个回答`, 'success')
  historyRecords.value = await getPracticeRecordsByMethodology(props.methodologyKey)
  contextTitle.value = ''
  context.value = ''
  reflection.value = ''
  answers.value = {}
  selectedQuickOptions.value = {}
}

const currentPayload = computed(() => {
  if (!method.value) return null
  return {
    methodology: props.methodologyKey,
    methodologyName: method.value.name,
    methodologyCategory: method.value.category,
    methodologyDescription: method.value.description,
    methodologyTags: method.value.tags,
    exportDate: new Date().toISOString(),
    contextTitle: contextTitle.value,
    context: context.value,
    questionAnswers: method.value.questions.map((q, i) => ({ questionNumber: i + 1, question: getQuestionText(q), answer: answers.value[i] || '' })),
    reflection: reflection.value,
  }
})

const handleExport = () => {
  if (!currentPayload.value || (!context.value.trim() && !contextTitle.value.trim() && Object.values(answers.value).every((a) => !a?.trim()))) {
    showToast('当前页面没有填写任何内容！', 'error')
    return
  }

  const blob = new Blob([JSON.stringify(currentPayload.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${method.value?.name || props.methodologyKey}-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
  showToast('📥 已导出当前内容', 'success')
}

const handleCopyJSON = async () => {
  if (!currentPayload.value || (!context.value.trim() && !contextTitle.value.trim() && Object.values(answers.value).every((a) => !a?.trim()))) {
    showToast('当前页面没有填写任何内容！', 'error')
    return
  }

  await navigator.clipboard.writeText(JSON.stringify(currentPayload.value, null, 2))
  showToast('📋 已复制当前内容的 JSON 数据', 'success')
}

const handleVisualize = () => {
  if (!method.value) return
  router.push(`/visualization?methodology=${encodeURIComponent(props.methodologyKey)}&name=${encodeURIComponent(method.value.name)}`)
}

onMounted(loadMethodology)
watch(() => route.query.timestamp, loadMethodology)
</script>

<template>
  <div v-if="loading" class="loading-text">加载中...</div>
  <div v-else-if="!method">方法论不存在</div>
  <div v-else class="practice-view-compact">
    <MethodologyHeader
      :methodology="method"
      :methodology-key="props.methodologyKey"
      :has-answers="Object.keys(answers).length > 0"
      :history-count="historyRecords.length"
      @back="router.back()"
      @export="handleExport"
      @copy-json="handleCopyJSON"
      @save="handleSubmit"
      @visualize="handleVisualize"
    />

    <div v-if="toast" :class="`toast-notification toast-${toast.type}`">{{ toast.message }}</div>

    <div class="practice-content-grid">
      <div class="practice-main-column">
        <div class="example-section">
          <div class="example-header clickable" @click="showExample = !showExample">
            <span>💡 查看示例</span>
            <span class="expand-icon">{{ showExample ? '−' : '+' }}</span>
          </div>
          <div v-if="showExample" class="example-content"><p>{{ method.example }}</p></div>
        </div>

        <div class="context-box">
          <label class="compact-label">📋 问题标题</label>
          <input v-model="contextTitle" type="text" class="compact-input" placeholder="用一句话概括你的问题..." />

          <label class="compact-label" style="margin-top: 12px">📝 问题情景/上下文</label>
          <textarea v-model="context" class="compact-textarea" placeholder="详细描述问题的背景、情景和相关信息..." rows="4" />
        </div>

        <div class="questions-compact">
          <div class="questions-header">
            <h3>🤔 思考框架</h3>
            <span class="questions-count">{{ method.questions.length }} 个问题</span>
          </div>

          <div class="questions-accordion">
            <div v-for="(q, i) in method.questions" :key="i" :class="['question-card', expandedQuestions[i] ? 'expanded' : '']">
              <div class="question-header" @click="toggleQuestion(i)">
                <div class="question-title">
                  <span class="question-num">Q{{ i + 1 }}</span>
                  <span class="question-text">{{ normalizeQuestion(q).text }}</span>
                </div>
                <div class="question-status">
                  <span v-if="answers[i]?.trim()" class="answered-badge">✓</span>
                  <span class="expand-icon">{{ expandedQuestions[i] ? '−' : '+' }}</span>
                </div>
              </div>

              <div v-if="expandedQuestions[i]" class="question-body">
                <div v-if="(normalizeQuestion(q).quickOptions || []).length > 0" class="quick-options">
                  <div class="quick-options-label">💡 快速选择：</div>
                  <div class="quick-options-grid">
                    <button
                      v-for="option in (normalizeQuestion(q).quickOptions || [])"
                      :key="option"
                      :class="['quick-option-btn', selectedQuickOptions[i]?.has(option) ? 'selected' : '']"
                      @click.stop="selectQuickOption(i, option)"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>

                <textarea
                  class="compact-answer"
                  :value="answers[i] || ''"
                  :placeholder="normalizeQuestion(q).placeholder || '写下你的思考，或点击上方快速选择...'"
                  rows="3"
                  @click.stop
                  @input="onAnswerInput(i, $event)"
                />

                <div class="ai-section">
                  <div v-if="loadingAI[i]" class="ai-loading">🤖 AI正在分析你的问题描述...</div>

                  <div v-if="aiSuggestions[i] && aiSuggestions[i].length > 0" class="ai-suggestions-container">
                    <div class="ai-suggestions-label">✨ AI建议：</div>
                    <div class="ai-suggestions">
                      <div
                        v-for="(suggestion, si) in aiSuggestions[i]"
                        :key="si"
                        :class="['suggestion-chip', suggestion.selected ? 'selected' : '']"
                        @click.stop="selectAISuggestion(i, si)"
                      >
                        <span v-if="suggestion.selected" class="check-icon">✓</span>
                        {{ suggestion.text }}
                      </div>
                    </div>
                  </div>

                  <button
                    v-if="!loadingAI[i] && !aiSuggestions[i] && context.trim()"
                    class="btn-ai-manual"
                    @click.stop="generateAISuggestionsForQuestion(i, getQuestionText(q))"
                  >
                    🔄 重新生成AI建议
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="reflection-box">
          <label class="compact-label">💭 反思和收获</label>
          <textarea v-model="reflection" class="compact-textarea" placeholder="通过这次思考，你有什么收获和感悟..." rows="4" />
        </div>
      </div>
    </div>
  </div>
</template>
