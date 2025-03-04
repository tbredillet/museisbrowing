<script setup>
  // Récupérer les contenus depuis le plugin
  const { $contents } = useNuxtApp()
  
  // Définir les contenus avec des valeurs par défaut
  const heroTitle = computed(() => $contents?.hero?.title || "L'art du sourcil parfait")
  const heroSubtitle = computed(() => $contents?.hero?.subtitle || "Révélez votre beauté naturelle avec nos services de soin des sourcils sur mesure")
  const heroButton = computed(() => $contents?.hero?.button || "Prendre rendez-vous")
  
  const presentationTitle = computed(() => $contents?.presentation?.title || "Bienvenue chez Muse is Browing")
  const presentationText1 = computed(() => $contents?.presentation?.text1 || "Chez Muse is Browing, nous sommes passionnés par l'art de sublimer votre regard à travers des sourcils parfaitement dessinés et entretenus. Notre salon, situé au cœur de la ville, est un espace dédié à votre beauté et votre bien-être.")
  const presentationText2 = computed(() => $contents?.presentation?.text2 || "Notre équipe de professionnels qualifiés utilise des techniques modernes et des produits de haute qualité pour vous offrir des résultats exceptionnels qui mettent en valeur vos traits naturels.")
  const presentationText3 = computed(() => $contents?.presentation?.text3 || "Que vous souhaitiez une restructuration complète, un entretien régulier ou une solution semi-permanente, nous vous proposons un service personnalisé adapté à vos besoins et à votre morphologie.")
  
  const prestationsTitle = computed(() => $contents?.prestations?.title || "Nos Prestations et Tarifs")
  
  const faqTitle = computed(() => $contents?.faq?.title || "Questions Fréquentes")
  const faqQuestions = computed(() => $contents?.faq?.questions || [
    { question: "Combien de temps dure une séance ?", answer: "La durée varie selon le service choisi. Une restructuration simple prend environ 30 minutes, tandis qu'un microblading peut durer jusqu'à 2 heures pour la première séance." },
    { question: "À quelle fréquence dois-je entretenir mes sourcils ?", answer: "Pour un entretien optimal, nous recommandons une visite toutes les 4 à 6 semaines. Cela peut varier selon la vitesse de repousse de vos poils et le résultat souhaité." },
    { question: "Le microblading est-il douloureux ?", answer: "Nous appliquons une crème anesthésiante avant la procédure pour minimiser l'inconfort. La plupart des clients décrivent une sensation de légère pression plutôt qu'une douleur vive." },
    { question: "Comment prendre soin de mes sourcils après une séance ?", answer: "Nous vous fournirons des instructions détaillées selon le service reçu. En général, il est recommandé d'éviter l'eau, les produits cosmétiques et l'exposition au soleil pendant les premières 24-48 heures." },
    { question: "Proposez-vous des consultations gratuites ?", answer: "Oui, nous offrons une consultation gratuite de 15 minutes pour discuter de vos attentes et vous recommander les services les plus adaptés à votre visage et à vos besoins." }
  ])
  
  const testimonialTitle = computed(() => $contents?.testimonial?.title || "Ce que nos clients disent")
  const testimonials = computed(() => $contents?.testimonial?.items || [
    { name: "Marie L.", text: "J'ai enfin trouvé LA spécialiste des sourcils ! Sophie a su exactement comment restructurer mes sourcils pour mettre en valeur mon regard. Je ne vais nulle part ailleurs maintenant !", rating: 5 },
    { name: "Isabelle D.", text: "Le microblading réalisé chez Muse is Browing a changé ma vie ! Après avoir perdu mes sourcils suite à une chimiothérapie, j'ai retrouvé confiance en moi. Merci infiniment pour votre professionnalisme et votre bienveillance.", rating: 5 },
    { name: "Thomas B.", text: "Ambiance relaxante, personnel attentif et résultat impeccable. La lamination a donné du volume à mes sourcils clairsemés. Je recommande vivement !", rating: 5 }
  ])
  
  const contactTitle = computed(() => $contents?.contact?.title || "Contactez-nous")
  const contactAddress = computed(() => $contents?.contact?.address || "15 Rue des Beaux Arts\n75006 Paris")
  const contactPhone = computed(() => $contents?.contact?.phone || "01 23 45 67 89")
  const contactEmail = computed(() => $contents?.contact?.email || "contact@browbeauty.fr")
  const contactHours = computed(() => $contents?.contact?.hours || "Lundi - Vendredi: 10h - 19h\nSamedi: 10h - 18h\nDimanche: Fermé")
  
  onMounted(() => {
    // Gestion des images cils.png aléatoires sur les prestations
    const serviceCardsForCils = document.querySelectorAll('.service-card');
    
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


    <header>
      <div class="container">
        <div class="logo">
          <a href="#">
            <h1>Muse is Browing</h1>
            <p>Salon de Sourcils</p>
          </a>
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
        <h2>{{ heroTitle }}</h2>
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
            <img src="/assets/images/salon.jpg" alt="Intérieur du salon Muse is Browing">
          </div>
        </div>
      </div>
    </section>

    <section id="prestations" class="prestations">
      <div class="container">
        <h2>{{ prestationsTitle }}</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-pencil-alt"></i></div>
            <h3>Restructuration des Sourcils</h3>
            <p>Redéfinition complète de la ligne des sourcils selon votre morphologie</p>
            <div class="price">35€</div>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-paint-brush"></i></div>
            <h3>Teinture des Sourcils</h3>
            <p>Coloration adaptée à votre teint pour un regard plus intense</p>
            <div class="price">25€</div>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-feather"></i></div>
            <h3>Épilation au Fil</h3>
            <p>Technique précise pour une finition impeccable</p>
            <div class="price">20€</div>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-magic"></i></div>
            <h3>Microblading</h3>
            <p>Technique semi-permanente pour des sourcils parfaits jusqu'à 18 mois</p>
            <div class="price">180€</div>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-spa"></i></div>
            <h3>Brow Lamination</h3>
            <p>Lissage et mise en forme pour des sourcils disciplinés</p>
            <div class="price">60€</div>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-gem"></i></div>
            <h3>Forfait Complet</h3>
            <p>Restructuration + Teinture + Soin nourrissant</p>
            <div class="price">55€</div>
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
          <p class="rating">4.8/5 basé sur 127 avis Google</p>
          <a href="#" class="google-link">Voir tous les avis sur Google <i class="fab fa-google"></i></a>
        </div>
        <div class="testimonial-slider">
          <!-- Témoignage 1 -->
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"{{ testimonials[0].text }}"</p>
            </div>
            <div class="testimonial-author">
              <img src="/assets/images/client1.jpg" :alt="testimonials[0].name">
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
              <img src="/assets/images/client2.jpg" :alt="testimonials[1].name">
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
              <img src="/assets/images/client3.jpg" :alt="testimonials[2].name">
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
                <p v-html="contactAddress.replace(/\n/g, '<br>')" />
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
                <p v-html="contactHours.replace(/\n/g, '<br>')" />
              </div>
            </div>
            <div class="social-media">
              <h3>Suivez-nous</h3>
              <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-pinterest-p"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.2758592175266!2d2.3331544!3d48.8534951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d9f7f8b3d1%3A0x5720ac519f7d503a!2s15%20Rue%20des%20Beaux%20Arts%2C%2075006%20Paris!5e0!3m2!1sfr!2sfr!4v1646000000000!5m2!1sfr!2sfr"
            width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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
