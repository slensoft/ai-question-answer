<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="methodology-container">
    <div class="methodology-header">
      <h1>🎯 按场景选择方法论</h1>
      <p>根据你当前的实际场景，快速找到最适合的方法论</p>
    </div>

    <div class="methodology-content">
      <ScenarioSection @select="(key) => router.push(`/methodology/${encodeURIComponent(key)}`)" />
    </div>
  </div>
</template>
