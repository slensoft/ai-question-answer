<script setup lang="ts">
const route = useRoute()

const navItems = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/ai-guide', label: 'AI 引导', icon: '🤖', highlight: true },
  { href: '/methodology/scenarios', label: '按场景选择', icon: '🎯' },
  { href: '/methodology/all', label: '所有方法论', icon: '📚' },
  { href: '/docs/', label: '文档', icon: '📄', external: true },
]
</script>

<template>
  <nav class="global-nav">
    <div class="nav-container">
      <div class="nav-left">
        <template v-for="item in navItems" :key="item.href">
          <a
            v-if="item.external"
            :href="item.href"
            class="nav-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </a>
          <NuxtLink
            v-else
            :to="item.href"
            :class="['nav-item', route.path === item.href ? 'active' : '', item.highlight ? 'highlight' : '']"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="item.highlight" class="badge">NEW</span>
          </NuxtLink>
        </template>
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
