<script setup lang="ts">
import type { Methodology } from '@/types/methodology'
import { supportsVisualization } from '@/lib/visualization-utils'

interface Props {
  methodology: Methodology
  methodologyKey: string
  hasAnswers?: boolean
  historyCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  hasAnswers: false,
  historyCount: 0,
})

const emit = defineEmits<{
  back: []
  export: []
  copyJson: []
  save: []
  visualize: []
}>()
</script>

<template>
  <div class="practice-header-bar">
    <button class="btn-back" @click="emit('back')">← 返回</button>

    <div class="method-title">
      <span class="method-icon">🎯</span>
      <span class="method-name">{{ props.methodology.name }}</span>
      <span class="method-difficulty">{{ props.methodology.difficulty }}</span>
    </div>

    <div class="btn-actions">
      <button
        v-if="supportsVisualization(props.methodologyKey) && props.hasAnswers"
        class="btn-compact btn-visualize"
        title="生成可视化图形"
        @click="emit('visualize')"
      >
        🎨 可视化
      </button>
      <button class="btn-compact btn-export" title="导出当前页面内容为 JSON 文件" @click="emit('export')">
        📥 导出记录 {{ props.historyCount > 0 ? `(${props.historyCount})` : '' }}
      </button>
      <button class="btn-compact btn-copy-json" title="复制当前页面内容的 JSON 数据" @click="emit('copyJson')">
        📋 复制JSON
      </button>
      <button class="btn-compact btn-save" @click="emit('save')">💾 保存</button>
    </div>
  </div>
</template>
