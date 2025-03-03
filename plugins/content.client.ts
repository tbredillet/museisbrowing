import { defineNuxtPlugin } from '#app'
import defaultContent from '~/content/default.json'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Fonction pour charger les contenus
  const loadContents = async () => {
    try {
      // En développement, charger depuis l'API
      if (process.env.NODE_ENV !== 'production') {
        try {
          const response = await fetch('/api/admin/contents')
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
          }
          return await response.json()
        } catch (error) {
          console.error('Erreur lors du chargement des contenus depuis l\'API:', error)
          // Fallback: utiliser le contenu par défaut importé
          return defaultContent
        }
      } else {
        // En production, charger depuis le fichier JSON statique
        try {
          const response = await fetch('/content.json')
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`)
          }
          return await response.json()
        } catch (error) {
          console.error('Erreur lors du chargement des contenus depuis le fichier statique:', error)
          // Fallback: utiliser le contenu par défaut importé
          return defaultContent
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des contenus:', error)
      return defaultContent
    }
  }

  // Charger les contenus
  const contents = await loadContents()

  // Fournir les contenus à l'application
  nuxtApp.provide('contents', contents)
})
