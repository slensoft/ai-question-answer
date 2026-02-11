<script setup lang="ts">
interface Props {
  searchTerm: string
  selectedCategory: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:selectedCategory': [value: string]
}>()

const categories = ['all', '思维模型', '结构化提问', '深度追问', '决策分析', '创新突破', '学习成长']

const onSearchInput = (event: Event) => {
  emit('update:searchTerm', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="filter-section">
    <div class="search-box">
      <input
        type="text"
        :value="props.searchTerm"
        placeholder="🔍 搜索方法论..."
        @input="onSearchInput"
      />
    </div>
    <div class="filter-tags">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['filter-tag', props.selectedCategory === cat ? 'active' : '']"
        @click="emit('update:selectedCategory', cat)"
      >
        {{ cat === 'all' ? '全部' : cat }}
      </button>
    </div>
  </div>
</template>
