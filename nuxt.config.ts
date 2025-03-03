// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/style.css'],
  
  // Configuration pour assurer que les routes API fonctionnent en production
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/api/**': { cors: true, headers: { 'access-control-allow-methods': 'GET,POST,PUT,DELETE' } }
    }
  },
})
