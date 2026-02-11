// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  typescript: {
    strict: true,
    typeCheck: true,
  },
  
  runtimeConfig: {
    // 服务端环境变量
    openrouterApiKey: process.env.OPENROUTER_API_KEY,
    
    // 公开环境变量
    public: {
      apiBase: process.env.API_BASE_URL || '',
    },
  },
  
  app: {
    head: {
      title: '提问方法论学习平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '通过实践掌握15种核心提问与思考方法' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
