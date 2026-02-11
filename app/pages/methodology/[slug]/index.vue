<script setup lang="ts">
import { methodologies } from '@/lib/methodology-data'

const route = useRoute()
const slug = computed(() => decodeURIComponent(String(route.params.slug || '')))
const method = computed(() => methodologies[slug.value])
</script>

<template>
  <div class="methodology-container">
    <div v-if="!method" class="methodology-header">
      <h1>方法论不存在</h1>
      <p>slug: {{ slug }}</p>
      <p>可用的方法论: {{ Object.keys(methodologies).join(', ') }}</p>
      <div class="methodology-content">
        <button class="btn btn-secondary" @click="$router.back()">← 返回上一页</button>
      </div>
    </div>

    <div v-else class="methodology-wrapper">
      <div class="methodology-header">
        <h1>🎯 {{ method.name }}</h1>
        <p>{{ method.description }}</p>
      </div>
      <div class="methodology-content">
        <PracticeView :methodology-key="slug" />
      </div>
    </div>
  </div>
</template>
