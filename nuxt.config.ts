export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  experimental: {
    appManifest: false,
  },
  css: [
    '@/assets/css/globals.css',
    '@/assets/css/methodology.css',
    '@/assets/css/ai-guide.css',
    '@/assets/css/practice-compact.css',
    '@/assets/css/user.css',
    '@/assets/css/visualization.css',
  ],
})
