<script setup lang="ts">
const router = useRouter()
const searchTerm = ref('')
const selectedCategory = ref('all')
</script>

<template>
  <div class="methodology-container">
    <div class="methodology-header">
      <h1>📚 所有方法论</h1>
      <p>浏览完整的方法论资源库，了解每个方法的特点和适用场景</p>
    </div>

    <div class="methodology-content">
      <SearchFilter v-model:searchTerm="searchTerm" v-model:selectedCategory="selectedCategory" />
      <MethodologyGrid :search-term="searchTerm" :selected-category="selectedCategory" @select="(key) => router.push(`/methodology/${encodeURIComponent(key)}`)" />
    </div>
  </div>
</template>
