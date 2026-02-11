<script setup lang="ts">
import { searchMethodologies } from '@/api/methodology'
import type { Methodology } from '@/types/methodology'

interface Props {
  searchTerm: string
  selectedCategory: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [key: string] }>()

const methodologies = ref<Record<string, Methodology>>({})
const loading = ref(true)

const loadMethodologies = async () => {
  loading.value = true
  try {
    methodologies.value = await searchMethodologies(props.searchTerm, props.selectedCategory)
  } finally {
    loading.value = false
  }
}

watch(() => [props.searchTerm, props.selectedCategory], loadMethodologies, { immediate: true })
</script>

<template>
  <div class="home-section">
    <h2>📚 所有方法论</h2>
    <div v-if="loading" class="loading-text">加载中...</div>
    <div v-else class="methodology-grid">
      <div
        v-for="([key, method]) in Object.entries(methodologies)"
        :key="key"
        class="methodology-card"
        @click="emit('select', key)"
      >
        <span class="category">{{ method.category }}</span>
        <h3>{{ method.name }}</h3>
        <div class="description">{{ method.description }}</div>
        <div class="tags">
          <span class="tag">难度: {{ method.difficulty }}</span>
          <span v-for="tag in method.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
