<template>
  <div class="content-display">
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  contentKey: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: 'Contenu non disponible'
  }
})

const { $contents } = useNuxtApp()

// Récupérer le contenu en fonction de la catégorie et de la clé
const content = computed(() => {
  if (!$contents) return props.fallback
  
  if (props.category && $contents[props.category]) {
    return $contents[props.category][props.contentKey] || props.fallback
  }
  
  return $contents[props.contentKey] || props.fallback
})

// Titre généré à partir de la clé
const title = computed(() => {
  return props.contentKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})
</script>

<style scoped>
.content-display {
  margin-bottom: 1.5rem;
}
</style>
