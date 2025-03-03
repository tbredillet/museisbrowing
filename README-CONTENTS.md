# Système de Gestion de Contenu avec Supabase

Ce projet utilise Supabase comme système de gestion de contenu (CMS) pour stocker et récupérer les textes du site. Les contenus sont chargés au moment du build pour une performance optimale.

## Configuration

1. Créez une base de données Supabase avec une table `contents` ayant la structure suivante :
   - `id` (uuid, clé primaire)
   - `key` (text, unique, non-null) - identifiant unique du contenu
   - `value` (text) - contenu textuel (peut contenir du HTML)
   - `category` (text, nullable) - catégorie optionnelle pour organiser les contenus
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

2. Copiez le fichier `.env.example` en `.env` et remplissez les variables :
   ```
   SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_KEY=votre-clé-anon-supabase
   ```

3. Assurez-vous que ces variables sont disponibles lors du build :
   - En développement local : le fichier `.env` est utilisé
   - En production : configurez ces variables dans votre environnement de déploiement

## Utilisation

### Ajouter des contenus dans Supabase

1. Connectez-vous à votre dashboard Supabase
2. Accédez à la table `contents`
3. Ajoutez des entrées avec des clés uniques, par exemple :
   - `hero_title` → "Bienvenue sur notre site"
   - `about_description` → "Notre histoire commence..."

### Utiliser les contenus dans l'application

Vous pouvez utiliser le composant `ContentDisplay` pour afficher les contenus :

```vue
<template>
  <ContentDisplay 
    contentKey="hero_title" 
    fallback="Titre par défaut" 
  />
  
  <ContentDisplay 
    contentKey="about_description" 
    category="home" 
    fallback="Description par défaut" 
  />
</template>
```

Ou accéder directement aux contenus via l'injection :

```vue
<script setup>
const { $contents } = useNuxtApp()

// Accès direct
const heroTitle = computed(() => $contents.hero_title || 'Titre par défaut')

// Accès via catégorie
const aboutDesc = computed(() => 
  $contents.home?.about_description || 'Description par défaut'
)
</script>
```

## Fonctionnement

1. **En développement** : les contenus sont chargés dynamiquement depuis Supabase à chaque requête
2. **En production** : les contenus sont chargés une seule fois au moment du build et sauvegardés dans un fichier JSON statique

Cette approche permet d'avoir :
- Des performances optimales en production (pas de requêtes API)
- Une expérience de développement fluide avec des contenus à jour
- Une séparation claire entre le code et le contenu
