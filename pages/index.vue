<script setup>
  // Récupérer les contenus depuis le plugin
  const { $contents } = useNuxtApp()
  
  // Définir les contenus avec des valeurs par défaut
  const heroTitle = computed(() => $contents?.hero?.title || "")
  const heroSubtitle = computed(() => $contents?.hero?.subtitle || "")
  const heroButton = computed(() => $contents?.hero?.button || "")
  
  const presentationTitle = computed(() => $contents?.presentation?.title || "")
  const presentationText1 = computed(() => $contents?.presentation?.text1 || "")
  const presentationText2 = computed(() => $contents?.presentation?.text2 || "")
  const presentationText3 = computed(() => $contents?.presentation?.text3 || "")
  
  const prestationsTitle = computed(() => $contents?.prestations?.title || "")
  
  const faqTitle = computed(() => $contents?.faq?.title || "")
  const faqQuestions = computed(() => $contents?.faq?.questions || [])
  
  const testimonialTitle = computed(() => $contents?.testimonial?.title || "")
  const testimonials = computed(() => $contents?.testimonial?.items || [])
  const testimonialGoogleRatingText = computed(() => $contents?.testimonial?.googleRatingText || "4.8/5 basé sur 127 avis Google")
  const testimonialGoogleReviewLinkText = computed(() => $contents?.testimonial?.googleReviewLinkText || "Voir tous les avis sur Google")
  const testimonialGoogleReviewLink = computed(() => $contents?.testimonial?.googleReviewLink || "#")
  
  const contactTitle = computed(() => $contents?.contact?.title || "")
  const contactAddress = computed(() => $contents?.contact?.address || "")
  const contactPhone = computed(() => $contents?.contact?.phone || "")
  const contactEmail = computed(() => $contents?.contact?.email || "")
  const contactHours = computed(() => $contents?.contact?.hours || "")
  
  // Réseaux sociaux
  const socialTitle = computed(() => $contents?.social?.title || "Suivez-nous")
  const socialItems = computed(() => $contents?.social?.items || [])
  
  onMounted(() => {
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const mobileNavLinks = document.querySelectorAll('nav ul li a');
    
    // Fonction pour basculer le menu
    const toggleMenu = () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    };
    
    // Ajouter les écouteurs d'événements
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Fermer le menu quand on clique sur un lien
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
    
    // Gestion des images cils.png aléatoires sur les prestations
    const serviceCardsForCils = document.querySelectorAll('.prestation-card');
    
    serviceCardsForCils.forEach(card => {
      // Créer l'image des cils
      const cilsImg = document.createElement('img');
      cilsImg.src = '/assets/images/cils.png';
      cilsImg.classList.add('cils-image');
      cilsImg.style.display = 'none';
      card.appendChild(cilsImg);
      
      // Variables pour l'animation
      let animationId = null;
      let initialX, initialY, initialRotation, initialSize;
      
      card.addEventListener('mouseenter', () => {
        // Générer des positions aléatoires sur toute la carte
        // Récupérer les dimensions de la carte
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        
        // Position X: n'importe où sur la largeur de la carte (avec marge de 20px)
        initialX = Math.floor(Math.random() * (cardWidth - 40)) - (cardWidth / 2) + 20;
        
        // Position Y: n'importe où sur la hauteur de la carte (avec marge de 20px)
        initialY = Math.floor(Math.random() * (cardHeight - 40)) - cardHeight + 20;
        
        initialRotation = Math.floor(Math.random() * 360); // rotation complète possible
        initialSize = (Math.floor(Math.random() * 60) + 40) / 100; // entre 0.4 et 1.0
        
        // Appliquer les styles directement sur l'image
        cilsImg.style.position = 'absolute';
        cilsImg.style.width = '80px';
        cilsImg.style.height = '80px';
        cilsImg.style.bottom = '0';
        cilsImg.style.left = '50%';
        cilsImg.style.transform = `translate(${initialX}px, ${initialY}px) rotate(${initialRotation}deg) scale(${initialSize})`;
        cilsImg.style.zIndex = '10';
        cilsImg.style.display = 'block';
        cilsImg.style.opacity = '0';
        cilsImg.style.transition = 'opacity 0.3s ease';
        
        // Effet de fondu à l'apparition
        setTimeout(() => {
          cilsImg.style.opacity = '0.85';
        }, 10);
        
        // Animation de flottement plus dynamique
        let time = 0;
        const animate = () => {
          time += 0.03;
          // Mouvements plus amples et plus aléatoires
          const offsetX = Math.sin(time) * 8 + Math.cos(time * 1.5) * 4;
          const offsetY = Math.cos(time) * 6 + Math.sin(time * 1.3) * 3;
          const offsetRotation = Math.sin(time) * 5 + Math.cos(time * 0.7) * 3;
          // Légère variation de taille pour un effet de respiration
          const sizeVariation = Math.sin(time * 0.8) * 0.05;
          
          cilsImg.style.transform = `translate(${initialX + offsetX}px, ${initialY + offsetY}px) rotate(${initialRotation + offsetRotation}deg) scale(${initialSize + sizeVariation})`;
          
          animationId = requestAnimationFrame(animate);
        };
        
        animate();
      });
      
      // Réinitialiser lorsque la souris quitte la carte
      card.addEventListener('mouseleave', () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        
        // Effet de fondu à la disparition
        cilsImg.style.opacity = '0';
        setTimeout(() => {
          cilsImg.style.display = 'none';
        }, 300);
      });
    });
    
    // Accordion functionality for FAQ section
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current accordion item
            item.classList.toggle('active');
        });
    });
    
    // Open first accordion item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Testimonial slider (simplified version)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0.3';
                testimonial.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // Only initialize if there are testimonials
    if (testimonials.length > 1) {
        // Set initial styles
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transition = 'all 0.5s ease';
            if (i !== 0) {
                testimonial.style.opacity = '0.3';
                testimonial.style.transform = 'translateX(20px)';
            }
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Add animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    
    function checkScroll() {
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for service cards
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Check on scroll and initial load
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    // Fonction pour mettre à jour les liens actifs en fonction de la section visible
    function updateActiveLinks() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('nav ul li a');
      
      // Obtenir la position de défilement actuelle
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Supprimer d'abord la classe active de tous les liens
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Trouver la section actuellement visible
      let currentSection = null;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          currentSection = section;
        }
      });
      
      // Si une section est visible, activer le lien correspondant
      if (currentSection) {
        const sectionId = currentSection.getAttribute('id');
        const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
    
    // Mettre à jour les liens actifs lors du défilement
    window.addEventListener('scroll', updateActiveLinks);
    updateActiveLinks();
  })
</script>

<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap">
    
    <!-- Composant NuxtPage pour la gestion des routes -->
    <NuxtPage v-if="$route.path !== '/'"/>
    
    <!-- Contenu principal du site (page d'accueil) -->
    <div v-if="$route.path === '/'">


    <div class="overlay"></div>
    <header>
      <div class="container">
        <div class="logo">
          <a href="#">
            <h1>Muse is Browing</h1>
            <p>Bar à Sourcils</p>
          </a>
        </div>
        <div class="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#presentation">Présentation
                <div class="nav-icon"><i class="fas fa-info-circle"></i></div>
              </a>
            </li>
            <li>
              <a href="#prestations">Prestations
                <div class="nav-icon"><i class="fas fa-spa"></i></div>
              </a>
            </li>
            <li>
              <a href="#faq">FAQ
                <div class="nav-icon"><i class="fas fa-question-circle"></i></div>
              </a>
            </li>
            <li>
              <a href="#avis">Avis
                <div class="nav-icon"><i class="fas fa-star"></i></div>
              </a>
            </li>
            <li>
              <a href="#contact">Contact
                <div class="nav-icon"><i class="fas fa-envelope"></i></div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="container">
        <h2 class="hero-title">{{ heroTitle }}</h2>
        <p>{{ heroSubtitle }}</p>
        <a href="#contact" class="btn">{{ heroButton }}</a>
      </div>
    </section>

    <section id="presentation" class="presentation">
      <div class="container">
        <h2>{{ presentationTitle }}</h2>
        <div class="presentation-content">
          <div class="presentation-text">
            <p>{{ presentationText1 }}</p>
            <p>{{ presentationText2 }}</p>
            <p>{{ presentationText3 }}</p>
          </div>
          <div class="presentation-image">
            <img src="/public/assets/images/salon.jpg" alt="Intérieur du salon Muse is Browing">
          </div>
        </div>
      </div>
    </section>

    <section id="prestations" class="prestations-section">
      <div class="container">
        <h2>{{ prestationsTitle }}</h2>
        
        <div class="prestations-grid">
          <div v-for="(prestation, index) in $contents.prestations.items" 
               :key="index" 
               class="prestation-card">
            <h3>{{ prestation.title }}</h3>
            <p class="prestation-description">{{ prestation.description }}</p>
            <div class="prestation-details">
              <span class="prestation-price">{{ prestation.price }}</span>
              <span class="prestation-duration">{{ prestation.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="faq">
      <div class="container">
        <h2>{{ faqTitle }}</h2>
        <div class="accordion">
          <div v-for="(item, index) in faqQuestions" :key="index" class="accordion-item">
            <div class="accordion-header">{{ item.question }}</div>
            <div class="accordion-content">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="avis" class="testimonials">
      <div class="container">
        <h2>{{ testimonialTitle }}</h2>
        <div class="google-rating">
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <p class="rating">{{ testimonialGoogleRatingText }}</p>
          <a v-if="testimonialGoogleReviewLink && testimonialGoogleReviewLink !== '#'" :href="testimonialGoogleReviewLink" class="google-link" target="_blank">{{ testimonialGoogleReviewLinkText }} <i class="fab fa-google"></i></a>
          <p v-else class="google-link">{{ testimonialGoogleReviewLinkText }} <i class="fab fa-google"></i></p>
        </div>
        <div class="testimonial-slider">
          <!-- Témoignage 1 -->
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"{{ testimonials[0].text }}"</p>
            </div>
            <div class="testimonial-author">
              <img src="/public/assets/images/client1.jpg" :alt="testimonials[0].name">
              <div>
                <h4>{{ testimonials[0].name }}</h4>
                <div class="stars">
                  <i v-for="star in testimonials[0].rating" :key="star" class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Témoignage 2 -->
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"{{ testimonials[1].text }}"</p>
            </div>
            <div class="testimonial-author">
              <img src="/public/assets/images/client2.jpg" :alt="testimonials[1].name">
              <div>
                <h4>{{ testimonials[1].name }}</h4>
                <div class="stars">
                  <i v-for="star in testimonials[1].rating" :key="star" class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Témoignage 3 -->
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"{{ testimonials[2].text }}"</p>
            </div>
            <div class="testimonial-author">
              <img src="/public/assets/images/client3.jpg" :alt="testimonials[2].name">
              <div>
                <h4>{{ testimonials[2].name }}</h4>
                <div class="stars">
                  <i v-for="star in testimonials[2].rating" :key="star" class="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container">
        <h2>{{ contactTitle }}</h2>
        <div class="contact-content">
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h3>Adresse</h3>
                <p v-html="contactAddress.replace(/\n/g, '<br>')"></p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-phone-alt"></i>
              <div>
                <h3>Téléphone</h3>
                <p>{{ contactPhone }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>{{ contactEmail }}</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-clock"></i>
              <div>
                <h3>Horaires</h3>
                <p v-html="contactHours.replace(/\n/g, '<br>')"></p>
              </div>
            </div>
            <div class="social-media">
              <h3>{{ socialTitle }}</h3>
              <div class="social-icons">
                <a v-for="(item, index) in socialItems" :key="index" :href="item.url" target="_blank" rel="noopener noreferrer">
                  <i v-if="item.icon === 'envelope'" class="fas fa-envelope"></i>
                  <i v-else :class="`fab fa-${item.icon}`"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14549.388734203081!2d5.543913302186859!3d46.67507846018469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478cd7ac2387393d%3A0xe5ff27c496e38979!2sMUSE!5e0!3m2!1sfr!2sfr!4v1742309728986!5m2!1sfr!2sfr" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; 2025 Muse is Browing. Tous droits réservés.</p>
          <div class="footer-bottom-links">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">CGV</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  </div>
</template>

<style scoped>
.prestations-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.prestations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.prestation-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.prestation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.prestation-card h3 {
  color: #333;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.prestation-description {
  margin: 1rem 0;
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.95rem;
}

.prestation-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.prestation-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #9f7a2e;
  font-family: 'Playfair Display', serif;
}

.prestation-duration {
  color: #6c757d;
  font-size: 0.9rem;
  background: #f8f9fa;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .prestations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .prestation-card {
    padding: 1.5rem;
  }
}
</style>
