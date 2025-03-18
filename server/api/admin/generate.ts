import { defineEventHandler, readBody } from 'h3'
import { exec } from 'child_process'
import { promisify } from 'util'
import { ADMIN_PASSWORD } from '~/utils/constants'

const execPromise = promisify(exec)

export default defineEventHandler(async (event) => {
  // Vérifier que la méthode est POST
  if (event.node.req.method !== 'POST') {
    return {
      success: false,
      message: 'Méthode non supportée'
    }
  }

  try {
    const body = await readBody(event)
    
    // Vérifier le mot de passe
    if (body.password !== ADMIN_PASSWORD) {
      return {
        success: false,
        message: 'Mot de passe incorrect'
      }
    }

    // Lancer la commande npm run generate
    try {
      // Exécuter la commande de génération en arrière-plan et redémarrer le serveur avec PM2
      await execPromise('npm run build && /usr/local/bin/pm2 restart /var/www/museisbrowing/ecosystem.config.cjs')
      
      return {
        success: true,
        message: 'Génération du site lancée avec succès et serveur redémarré. Ce processus peut prendre quelques minutes.'
      }
    } catch (error) {
      console.error('Erreur lors de la génération du site:', error)
      return {
        success: false,
        message: `Erreur lors de la génération du site: ${error.message}`
      }
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la requête:', error)
    return {
      success: false,
      message: 'Erreur lors du traitement de la requête'
    }
  }
})
