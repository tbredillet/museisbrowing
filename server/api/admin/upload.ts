import { defineEventHandler, readMultipartFormData, getQuery } from 'h3'
import fs from 'fs'
import path from 'path'
import { ADMIN_PASSWORD } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier le mot de passe dans les paramètres de requête
    const query = getQuery(event)
    if (query.password !== ADMIN_PASSWORD) {
      return {
        success: false,
        message: 'Mot de passe incorrect'
      }
    }

    // Lire les données du formulaire multipart
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      return {
        success: false,
        message: 'Aucun fichier n\'a été envoyé'
      }
    }

    const file = formData[0]
    const imageType = query.type as string

    if (!file.filename || !file.data) {
      return {
        success: false,
        message: 'Fichier invalide'
      }
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type as string)) {
      return {
        success: false,
        message: 'Type de fichier non autorisé. Seuls les formats JPEG, PNG et WebP sont acceptés.'
      }
    }

    // Déterminer le nom du fichier en fonction du type d'image
    let fileName = ''
    switch (imageType) {
      case 'salon':
        fileName = 'salon.jpg'
        break
      case 'header':
        fileName = 'header.jpg'
        break
      case 'client1':
        fileName = 'client1.jpg'
        break
      case 'client2':
        fileName = 'client2.jpg'
        break
      case 'client3':
        fileName = 'client3.jpg'
        break
      default:
        return {
          success: false,
          message: 'Type d\'image non reconnu'
        }
    }

    // Créer le répertoire des images s'il n'existe pas
    const imagesDir = path.resolve(process.cwd(), 'public/assets/images')
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }

    // Enregistrer le fichier
    const filePath = path.join(imagesDir, fileName)
    fs.writeFileSync(filePath, file.data)

    return {
      success: true,
      message: 'Image téléchargée avec succès',
      path: `/assets/images/${fileName}`
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error)
    return {
      success: false,
      message: 'Erreur lors du téléchargement de l\'image'
    }
  }
})
