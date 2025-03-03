import { defineNuxtPlugin } from '#app'
import defaultContent from '~/content/default.json'

export default defineNuxtPlugin((nuxtApp) => {
  // En mode serveur, on utilise le contenu par défaut
  // Le chargement dynamique se fera côté client
  nuxtApp.provide('contents', defaultContent)
})
