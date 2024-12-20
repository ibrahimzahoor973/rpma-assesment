// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  plugins: [
    './plugins/auth.client.ts', // Client-only plugin
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001'
    }
  },
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  }
})