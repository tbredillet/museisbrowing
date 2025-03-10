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
          <h2>Images du site</h2>
          <div class="image-upload-section">
            <div class="image-preview-container">
              <h3>Image d'en-tête (header.jpg)</h3>
              <div class="image-preview">
                <img :src="'/assets/images/header.jpg?v=' + imageVersions.header" alt="Image d'en-tête">
              </div>
              <div class="form-group">
                <label for="headerImage">Changer l'image (format JPG recommandé)</label>
                <input type="file" id="headerImage" @change="handleImageChange($event, 'header')" accept="image/jpeg,image/jpg,image/png,image/webp">
              </div>
              <button @click="uploadImage('header')" class="btn btn-secondary" :disabled="!imageFiles.header">Télécharger</button>
              <div v-if="uploadStatus.header" class="upload-status" :class="{ 'status-success': uploadStatus.header.success, 'status-error': !uploadStatus.header.success }">
                {{ uploadStatus.header.message }}
              </div>
            </div>

            <div class="image-preview-container">
              <h3>Image du salon (salon.jpg)</h3>
              <div class="image-preview">
                <img :src="'/assets/images/salon.jpg?v=' + imageVersions.salon" alt="Image du salon">
              </div>
              <div class="form-group">
                <label for="salonImage">Changer l'image (format JPG recommandé)</label>
                <input type="file" id="salonImage" @change="handleImageChange($event, 'salon')" accept="image/jpeg,image/jpg,image/png,image/webp">
              </div>
              <button @click="uploadImage('salon')" class="btn btn-secondary" :disabled="!imageFiles.salon">Télécharger</button>
              <div v-if="uploadStatus.salon" class="upload-status" :class="{ 'status-success': uploadStatus.salon.success, 'status-error': !uploadStatus.salon.success }">
                {{ uploadStatus.salon.message }}
              </div>
            </div>

            <div class="image-preview-container">
              <h3>Image client 1 (client1.jpg)</h3>
              <div class="image-preview">
                <img :src="'/assets/images/client1.jpg?v=' + imageVersions.client1" alt="Image client 1">
              </div>
              <div class="form-group">
                <label for="client1Image">Changer l'image (format JPG recommandé)</label>
                <input type="file" id="client1Image" @change="handleImageChange($event, 'client1')" accept="image/jpeg,image/jpg,image/png,image/webp">
              </div>
              <button @click="uploadImage('client1')" class="btn btn-secondary" :disabled="!imageFiles.client1">Télécharger</button>
              <div v-if="uploadStatus.client1" class="upload-status" :class="{ 'status-success': uploadStatus.client1.success, 'status-error': !uploadStatus.client1.success }">
                {{ uploadStatus.client1.message }}
              </div>
            </div>

            <div class="image-preview-container">
              <h3>Image client 2 (client2.jpg)</h3>
              <div class="image-preview">
                <img :src="'/assets/images/client2.jpg?v=' + imageVersions.client2" alt="Image client 2">
              </div>
              <div class="form-group">
                <label for="client2Image">Changer l'image (format JPG recommandé)</label>
                <input type="file" id="client2Image" @change="handleImageChange($event, 'client2')" accept="image/jpeg,image/jpg,image/png,image/webp">
              </div>
              <button @click="uploadImage('client2')" class="btn btn-secondary" :disabled="!imageFiles.client2">Télécharger</button>
              <div v-if="uploadStatus.client2" class="upload-status" :class="{ 'status-success': uploadStatus.client2.success, 'status-error': !uploadStatus.client2.success }">
                {{ uploadStatus.client2.message }}
              </div>
            </div>

            <div class="image-preview-container">
              <h3>Image client 3 (client3.jpg)</h3>
              <div class="image-preview">
                <img :src="'/assets/images/client3.jpg?v=' + imageVersions.client3" alt="Image client 3">
              </div>
              <div class="form-group">
                <label for="client3Image">Changer l'image (format JPG recommandé)</label>
                <input type="file" id="client3Image" @change="handleImageChange($event, 'client3')" accept="image/jpeg,image/jpg,image/png,image/webp">
              </div>
              <button @click="uploadImage('client3')" class="btn btn-secondary" :disabled="!imageFiles.client3">Télécharger</button>
              <div v-if="uploadStatus.client3" class="upload-status" :class="{ 'status-success': uploadStatus.client3.success, 'status-error': !uploadStatus.client3.success }">
                {{ uploadStatus.client3.message }}
              </div>
            </div>
          </div>
        </div>

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

// État des images
const imageFiles = reactive({
  header: null,
  salon: null,
  client1: null,
  client2: null,
  client3: null
})

const imageVersions = reactive({
  header: Date.now(),
  salon: Date.now(),
  client1: Date.now(),
  client2: Date.now(),
  client3: Date.now()
})

const uploadStatus = reactive({
  header: null,
  salon: null,
  client1: null,
  client2: null,
  client3: null
})

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

// Fonction pour gérer le changement d'image
const handleImageChange = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    imageFiles[type] = file
  }
}

// Fonction pour télécharger une image
const uploadImage = async (type) => {
  if (!imageFiles[type]) return
  
  try {
    const formData = new FormData()
    formData.append('file', imageFiles[type])
    
    const response = await fetch(`/api/admin/upload?type=${type}&password=${ADMIN_PASSWORD}`, {
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    uploadStatus[type] = result
    
    if (result.success) {
      // Mettre à jour la version de l'image pour forcer le rechargement
      imageVersions[type] = Date.now()
      // Réinitialiser le fichier
      imageFiles[type] = null
      // Réinitialiser l'input file
      const fileInput = document.getElementById(`${type}Image`)
      if (fileInput) fileInput.value = ''
    }
  } catch (error) {
    console.error(`Erreur lors du téléchargement de l'image ${type}:`, error)
    uploadStatus[type] = {
      success: false,
      message: `Erreur lors du téléchargement de l'image: ${error.message}`
    }
  }
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

.image-upload-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.image-preview-container {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-preview {
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.upload-status {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
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
