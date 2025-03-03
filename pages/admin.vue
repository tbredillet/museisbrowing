<template>
  <div class="admin-page">
    <div v-if="!isAuthenticated" class="login-container">
      <h1>Administration</h1>
      <div class="login-form">
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            @keyup.enter="authenticate"
          />
        </div>
        <button @click="authenticate" class="btn btn-primary">Se connecter</button>
        <div v-if="authError" class="error-message">{{ authError }}</div>
      </div>
    </div>

    <div v-else class="admin-container">
      <h1>Administration du site</h1>
      <div class="admin-actions">
        <button @click="saveContents" class="btn btn-primary" :disabled="isSaving">
          {{ isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder les modifications' }}
        </button>
        <button @click="generateSite" class="btn btn-secondary" :disabled="isGenerating">
          {{ isGenerating ? 'Génération en cours...' : 'Générer le site' }}
        </button>
        <button @click="resetToDefault" class="btn btn-danger">
          Réinitialiser aux valeurs par défaut
        </button>
        <button @click="logout" class="btn btn-outline">
          Déconnexion
        </button>
      </div>

      <div v-if="statusMessage" class="status-message" :class="{ 'status-success': statusSuccess, 'status-error': !statusSuccess }">
        {{ statusMessage }}
      </div>

      <div class="admin-content">
        <div class="section-container">
          <h2>Section Hero</h2>
          <div class="form-group">
            <label for="heroTitle">Titre</label>
            <input type="text" id="heroTitle" v-model="contents.hero.title" />
          </div>
          <div class="form-group">
            <label for="heroSubtitle">Sous-titre</label>
            <input type="text" id="heroSubtitle" v-model="contents.hero.subtitle" />
          </div>
          <div class="form-group">
            <label for="heroButton">Texte du bouton</label>
            <input type="text" id="heroButton" v-model="contents.hero.button" />
          </div>
        </div>

        <div class="section-container">
          <h2>Section Présentation</h2>
          <div class="form-group">
            <label for="presentationTitle">Titre</label>
            <input type="text" id="presentationTitle" v-model="contents.presentation.title" />
          </div>
          <div class="form-group">
            <label for="presentationText1">Paragraphe 1</label>
            <textarea id="presentationText1" v-model="contents.presentation.text1" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="presentationText2">Paragraphe 2</label>
            <textarea id="presentationText2" v-model="contents.presentation.text2" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="presentationText3">Paragraphe 3</label>
            <textarea id="presentationText3" v-model="contents.presentation.text3" rows="4"></textarea>
          </div>
        </div>

        <div class="section-container">
          <h2>Section Prestations</h2>
          <div class="form-group">
            <label for="prestationsTitle">Titre</label>
            <input type="text" id="prestationsTitle" v-model="contents.prestations.title" />
          </div>
        </div>

        <div class="section-container">
          <h2>Section FAQ</h2>
          <div class="form-group">
            <label for="faqTitle">Titre</label>
            <input type="text" id="faqTitle" v-model="contents.faq.title" />
          </div>
          
          <div v-for="(question, index) in contents.faq.questions" :key="index" class="faq-item">
            <div class="form-group">
              <label :for="'question' + index">Question {{ index + 1 }}</label>
              <input type="text" :id="'question' + index" v-model="question.question" />
            </div>
            <div class="form-group">
              <label :for="'answer' + index">Réponse {{ index + 1 }}</label>
              <textarea :id="'answer' + index" v-model="question.answer" rows="3"></textarea>
            </div>
            <button @click="removeFaqItem(index)" class="btn btn-small btn-danger">Supprimer</button>
          </div>
          
          <button @click="addFaqItem" class="btn btn-small btn-secondary">Ajouter une question</button>
        </div>

        <div class="section-container">
          <h2>Section Témoignages</h2>
          <div class="form-group">
            <label for="testimonialTitle">Titre</label>
            <input type="text" id="testimonialTitle" v-model="contents.testimonial.title" />
          </div>
          
          <div v-for="(testimonial, index) in contents.testimonial.items" :key="index" class="testimonial-item">
            <div class="form-group">
              <label :for="'testimonialName' + index">Nom {{ index + 1 }}</label>
              <input type="text" :id="'testimonialName' + index" v-model="testimonial.name" />
            </div>
            <div class="form-group">
              <label :for="'testimonialText' + index">Témoignage {{ index + 1 }}</label>
              <textarea :id="'testimonialText' + index" v-model="testimonial.text" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label :for="'testimonialRating' + index">Note (1-5) {{ index + 1 }}</label>
              <input type="number" :id="'testimonialRating' + index" v-model="testimonial.rating" min="1" max="5" />
            </div>
            <button @click="removeTestimonialItem(index)" class="btn btn-small btn-danger">Supprimer</button>
          </div>
          
          <button @click="addTestimonialItem" class="btn btn-small btn-secondary">Ajouter un témoignage</button>
        </div>

        <div class="section-container">
          <h2>Section Contact</h2>
          <div class="form-group">
            <label for="contactTitle">Titre</label>
            <input type="text" id="contactTitle" v-model="contents.contact.title" />
          </div>
          <div class="form-group">
            <label for="contactAddress">Adresse</label>
            <textarea id="contactAddress" v-model="contents.contact.address" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label for="contactPhone">Téléphone</label>
            <input type="text" id="contactPhone" v-model="contents.contact.phone" />
          </div>
          <div class="form-group">
            <label for="contactEmail">Email</label>
            <input type="email" id="contactEmail" v-model="contents.contact.email" />
          </div>
          <div class="form-group">
            <label for="contactHours">Horaires</label>
            <textarea id="contactHours" v-model="contents.contact.hours" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ADMIN_PASSWORD } from '~/utils/constants'

// État d'authentification
const isAuthenticated = ref(false)
const password = ref('')
const authError = ref('')

// État des contenus
const contents = reactive({
  hero: {
    title: '',
    subtitle: '',
    button: ''
  },
  presentation: {
    title: '',
    text1: '',
    text2: '',
    text3: ''
  },
  prestations: {
    title: ''
  },
  faq: {
    title: '',
    questions: []
  },
  testimonial: {
    title: '',
    items: []
  },
  contact: {
    title: '',
    address: '',
    phone: '',
    email: '',
    hours: ''
  }
})

// État des actions
const isSaving = ref(false)
const isGenerating = ref(false)
const statusMessage = ref('')
const statusSuccess = ref(false)

// Fonction d'authentification
const authenticate = () => {
  if (password.value === ADMIN_PASSWORD) {
    isAuthenticated.value = true
    authError.value = ''
    loadContents()
  } else {
    authError.value = 'Mot de passe incorrect'
  }
}

// Fonction de déconnexion
const logout = () => {
  isAuthenticated.value = false
  password.value = ''
}

// Fonction pour charger les contenus
const loadContents = async () => {
  try {
    const response = await fetch('/api/admin/contents')
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    const data = await response.json()
    
    // Mettre à jour les contenus
    Object.keys(data).forEach(key => {
      if (contents[key]) {
        Object.assign(contents[key], data[key])
      }
    })
    
    showStatus('Contenus chargés avec succès', true)
  } catch (error) {
    console.error('Erreur lors du chargement des contenus:', error)
    showStatus('Erreur lors du chargement des contenus', false)
  }
}

// Fonction pour sauvegarder les contenus
const saveContents = async () => {
  isSaving.value = true
  try {
    const response = await fetch('/api/admin/contents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: ADMIN_PASSWORD,
        content: contents
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      showStatus('Contenus sauvegardés avec succès', true)
    } else {
      showStatus(data.message || 'Erreur lors de la sauvegarde des contenus', false)
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des contenus:', error)
    showStatus('Erreur lors de la sauvegarde des contenus', false)
  } finally {
    isSaving.value = false
  }
}

// Fonction pour générer le site
const generateSite = async () => {
  isGenerating.value = true
  try {
    const response = await fetch('/api/admin/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: ADMIN_PASSWORD
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      showStatus('Génération du site lancée avec succès. Ce processus peut prendre quelques minutes.', true)
    } else {
      showStatus(data.message || 'Erreur lors de la génération du site', false)
    }
  } catch (error) {
    console.error('Erreur lors de la génération du site:', error)
    showStatus('Erreur lors de la génération du site', false)
  } finally {
    isGenerating.value = false
  }
}

// Fonction pour réinitialiser aux valeurs par défaut
const resetToDefault = async () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les contenus aux valeurs par défaut ?')) {
    loadContents()
  }
}

// Fonctions pour gérer les FAQ
const addFaqItem = () => {
  contents.faq.questions.push({
    question: 'Nouvelle question',
    answer: 'Nouvelle réponse'
  })
}

const removeFaqItem = (index) => {
  contents.faq.questions.splice(index, 1)
}

// Fonctions pour gérer les témoignages
const addTestimonialItem = () => {
  contents.testimonial.items.push({
    name: 'Nouveau client',
    text: 'Nouveau témoignage',
    rating: 5
  })
}

const removeTestimonialItem = (index) => {
  contents.testimonial.items.splice(index, 1)
}

// Fonction pour afficher un message de statut
const showStatus = (message, success) => {
  statusMessage.value = message
  statusSuccess.value = success
  
  // Effacer le message après 5 secondes
  setTimeout(() => {
    statusMessage.value = ''
  }, 5000)
}

// Charger les contenus au montage si authentifié
onMounted(() => {
  if (isAuthenticated.value) {
    loadContents()
  }
})
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.admin-container {
  margin-top: 2rem;
}

.admin-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.admin-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 2rem;
}

.section-container {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #6c757d;
}

.btn-outline:hover {
  background-color: #f8f9fa;
}

.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.faq-item, .testimonial-item {
  border: 1px solid #ced4da;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: white;
}

.status-message {
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-weight: bold;
}

.status-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.error-message {
  color: #dc3545;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .admin-content {
    grid-template-columns: 1fr;
  }
  
  .admin-actions {
    flex-direction: column;
  }
  
  .admin-page {
    padding: 1rem;
  }
}
</style>
