import { defineEventHandler, readBody } from 'h3'
import { loadContent, saveContent } from '~/utils/contentManager'
import { ADMIN_PASSWORD } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  // Gérer les différentes méthodes HTTP
  const method = event.node.req.method

  // GET - Récupérer les contenus
  if (method === 'GET') {
    return loadContent()
  }

  // POST - Mettre à jour les contenus
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Vérifier le mot de passe
      if (body.password !== ADMIN_PASSWORD) {
        return {
          success: false,
          message: 'Mot de passe incorrect'
        }
      }

      // Sauvegarder les contenus
      const success = saveContent(body.content)
      
      return {
        success,
        message: success ? 'Contenus mis à jour avec succès' : 'Erreur lors de la mise à jour des contenus'
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des contenus:', error)
      return {
        success: false,
        message: 'Erreur lors de la mise à jour des contenus'
      }
    }
  }

  // Méthode non supportée
  return {
    success: false,
    message: 'Méthode non supportée'
  }
})
