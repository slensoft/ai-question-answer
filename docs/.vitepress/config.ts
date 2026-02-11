import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Question Answer Docs',
  description: '项目文档',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/快速开始' },
      { text: '功能实现', link: '/AI引导功能实现说明' },
      { text: '产品设计', link: '/AI引导式方法论推荐系统-产品设计文档' },
      { text: '方法论对比', link: '/方法论对比表' },
    ],
    sidebar: [
      {
        text: '入门',
        items: [{ text: '快速开始', link: '/快速开始' }],
      },
      {
        text: '核心文档',
        items: [
          { text: 'AI引导功能实现说明', link: '/AI引导功能实现说明' },
          { text: 'AI引导式方法论推荐系统-产品设计文档', link: '/AI引导式方法论推荐系统-产品设计文档' },
          { text: '方法论对比表', link: '/方法论对比表' },
        ],
      },
    ],
  },
})
