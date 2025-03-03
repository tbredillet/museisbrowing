// Ce fichier ne doit être utilisé que côté serveur
import fs from 'fs'
import path from 'path'
import { ContentData, ADMIN_PASSWORD } from './constants'

// Chemin vers les fichiers de contenu
const CONTENT_DIR = path.resolve(process.cwd(), 'content')
const DEFAULT_CONTENT_PATH = path.resolve(CONTENT_DIR, 'default.json')
const CUSTOM_CONTENT_PATH = path.resolve(CONTENT_DIR, 'custom.json')

// Réexporter le mot de passe pour compatibilité
export { ADMIN_PASSWORD }

/**
 * Charge les contenus depuis les fichiers JSON
 * Priorité au contenu personnalisé s'il existe
 */
export function loadContent(): ContentData {
  try {
    // Vérifier si le dossier content existe, sinon le créer
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true })
    }

    // Vérifier si le fichier de contenu personnalisé existe
    if (fs.existsSync(CUSTOM_CONTENT_PATH)) {
      const content = fs.readFileSync(CUSTOM_CONTENT_PATH, 'utf-8')
      return JSON.parse(content)
    }

    // Sinon, utiliser le contenu par défaut
    if (fs.existsSync(DEFAULT_CONTENT_PATH)) {
      const content = fs.readFileSync(DEFAULT_CONTENT_PATH, 'utf-8')
      return JSON.parse(content)
    }

    // Si aucun fichier n'existe, retourner un objet vide
    return {}
  } catch (error) {
    console.error('Erreur lors du chargement des contenus:', error)
    return {}
  }
}

/**
 * Sauvegarde les contenus dans le fichier JSON personnalisé
 */
export function saveContent(content: ContentData): boolean {
  try {
    // Vérifier si le dossier content existe, sinon le créer
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true })
    }

    // Sauvegarder le contenu dans le fichier personnalisé
    fs.writeFileSync(
      CUSTOM_CONTENT_PATH,
      JSON.stringify(content, null, 2),
      'utf-8'
    )

    // Copier également le contenu dans le dossier public pour la production
    const publicDir = path.resolve(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(
      path.resolve(publicDir, 'content.json'),
      JSON.stringify(content, null, 2),
      'utf-8'
    )

    return true
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des contenus:', error)
    return false
  }
}

/**
 * Réinitialise les contenus aux valeurs par défaut
 */
export function resetContent(): boolean {
  try {
    // Vérifier si le fichier personnalisé existe et le supprimer
    if (fs.existsSync(CUSTOM_CONTENT_PATH)) {
      fs.unlinkSync(CUSTOM_CONTENT_PATH)
    }

    // Copier le contenu par défaut dans le dossier public
    const publicDir = path.resolve(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    const defaultContent = fs.readFileSync(DEFAULT_CONTENT_PATH, 'utf-8')
    fs.writeFileSync(
      path.resolve(publicDir, 'content.json'),
      defaultContent,
      'utf-8'
    )

    return true
  } catch (error) {
    console.error('Erreur lors de la réinitialisation des contenus:', error)
    return false
  }
}
