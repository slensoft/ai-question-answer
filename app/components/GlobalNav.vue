<script setup lang="ts">
const route = useRoute()

const navItems = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/ai-guide', label: 'AI 引导', icon: '🤖', highlight: true },
  { href: '/methodology/scenarios', label: '按场景选择', icon: '🎯' },
  { href: '/methodology/all', label: '所有方法论', icon: '📚' },
]
</script>

<template>
  <nav class="global-nav">
    <div class="nav-container">
      <div class="nav-left">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          :class="['nav-item', route.path === item.href ? 'active' : '', item.highlight ? 'highlight' : '']"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.highlight" class="badge">NEW</span>
        </NuxtLink>
      </div>
      <div class="nav-right">
        <NuxtLink :to="'/user'" :class="['nav-item', 'user-center', route.path === '/user' ? 'active' : '']">
          <span class="nav-icon">👤</span>
          <span class="nav-label">用户中心</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
