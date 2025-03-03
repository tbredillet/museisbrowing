// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/style.css'],
  
  // Configuration pour le déploiement
  ssr: true,
  nitro: {
    preset: 'node-server',
  },
  
  // Assurer que les fichiers statiques sont correctement servis
  app: {
    baseURL: '/'
  },
})
