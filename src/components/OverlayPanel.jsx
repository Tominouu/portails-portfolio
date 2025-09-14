import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

// Contenu des portails
const PORTAL_CONTENT = {
  projects: {
    title: "🚀 Mes Projets",
    icon: "⚡",
    content: (
      <div className="portal-content">
        <div className="content-section">
          <h3>Portfolio 3D Immersif</h3>
          <p>Expérience interactive en React + Three.js avec shaders personnalisés, particules dynamiques et navigation immersive. Optimisé pour les performances avec des effets visuels avancés.</p>
          <div className="tech-stack">
            <span>React</span>
            <span>Three.js</span>
            <span>GLSL</span>
            <span>GSAP</span>
          </div>
        </div>
        
        <div className="content-section">
          <h3>Application E-commerce</h3>
          <p>Plateforme complète avec panier intelligent, paiements sécurisés et interface admin. Architecture moderne avec base de données optimisée.</p>
          <div className="tech-stack">
            <span>Next.js</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Stripe</span>
          </div>
        </div>

        <div className="content-section">
          <h3>Dashboard Analytics</h3>
          <p>Interface de visualisation de données en temps réel avec graphiques interactifs et métriques personnalisables pour le suivi d'activité.</p>
          <div className="tech-stack">
            <span>Vue.js</span>
            <span>D3.js</span>
            <span>WebSocket</span>
            <span>Chart.js</span>
          </div>
        </div>
      </div>
    )
  },
  
  about: {
    title: "👨‍💻 À Propos",
    icon: "🌟",
    content: (
      <div className="portal-content">
        <div className="content-section">
          <h3>Développeur Full-Stack Passionné</h3>
          <p>Spécialisé dans la création d'expériences web innovantes et immersives. Je combine créativité et technique pour donner vie à des projets ambitieux.</p>
        </div>
        
        <div className="content-section">
          <h3>Mon Parcours</h3>
          <p>5 ans d'expérience dans le développement web moderne. Formé aux dernières technologies, je me spécialise dans les interfaces 3D, les animations complexes et l'optimisation des performances.</p>
        </div>

        <div className="content-section">
          <h3>Ma Philosophie</h3>
          <p>Chaque projet est une opportunité de repousser les limites du possible. J'aime créer des expériences qui marquent et inspirent, en alliant esthétique moderne et fonctionnalité parfaite.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projets Réalisés</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Années d'Expérience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Technologies Maîtrisées</div>
          </div>
        </div>
      </div>
    )
  },

  skills: {
    title: "⚡ Compétences",
    icon: "🛠️",
    content: (
      <div className="portal-content">
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <div className="skill-items">
              <div className="skill-item expert">React / Next.js</div>
              <div className="skill-item expert">Three.js / R3F</div>
              <div className="skill-item advanced">Vue.js / Nuxt</div>
              <div className="skill-item expert">TypeScript</div>
              <div className="skill-item advanced">GSAP / Framer</div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Backend</h3>
            <div className="skill-items">
              <div className="skill-item expert">Node.js / Express</div>
              <div className="skill-item advanced">Python / Django</div>
              <div className="skill-item expert">REST / GraphQL</div>
              <div className="skill-item advanced">WebSockets</div>
              <div className="skill-item intermediate">Docker</div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Base de Données</h3>
            <div className="skill-items">
              <div className="skill-item expert">MongoDB</div>
              <div className="skill-item advanced">PostgreSQL</div>
              <div className="skill-item advanced">Redis</div>
              <div className="skill-item intermediate">Firebase</div>
            </div>
          </div>

          <div className="skill-category">
            <h3>Créatif / 3D</h3>
            <div className="skill-items">
              <div className="skill-item expert">GLSL Shaders</div>
              <div className="skill-item advanced">Blender</div>
              <div className="skill-item expert">WebGL</div>
              <div className="skill-item advanced">After Effects</div>
              <div className="skill-item intermediate">Unity</div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  contact: {
    title: "📧 Contact",
    icon: "🌐",
    content: (
      <div className="portal-content">
        <div className="content-section">
          <h3>Travaillons Ensemble</h3>
          <p>Vous avez un projet ambitieux ? Créons quelque chose d'extraordinaire ensemble. Je suis disponible pour des collaborations, du freelance ou des opportunités permanentes.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-info">
              <div className="contact-label">Email</div>
              <div className="contact-value">contact@portfolio.dev</div>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div className="contact-info">
              <div className="contact-label">LinkedIn</div>
              <div className="contact-value">@mon-portfolio</div>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">🐱</div>
            <div className="contact-info">
              <div className="contact-label">GitHub</div>
              <div className="contact-value">@mon-username</div>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">🌍</div>
            <div className="contact-info">
              <div className="contact-label">Localisation</div>
              <div className="contact-value">La Teste-de-Buch, FR</div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button primary">
            Démarrer un Projet
          </button>
          <button className="cta-button secondary">
            Télécharger CV
          </button>
        </div>
      </div>
    )
  }
}

// Particules de fond pour l'overlay
const BackgroundParticles = () => {
  const particlesRef = useRef()

  useEffect(() => {
    const particles = particlesRef.current
    if (!particles) return

    // Créer les particules
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.className = 'bg-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(0, 230, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `
      particles.appendChild(particle)
    }

    return () => {
      if (particles) {
        particles.innerHTML = ''
      }
    }
  }, [])

  return <div ref={particlesRef} className="background-particles" />
}

export default function OverlayPanel({ portalId, onClose, isVisible }) {
  const panelRef = useRef()
  const contentRef = useRef()
  const [isClosing, setIsClosing] = useState(false)

  const portalData = PORTAL_CONTENT[portalId] || PORTAL_CONTENT.about

  // Animation d'entrée
  useEffect(() => {
    if (isVisible && panelRef.current) {
      const tl = gsap.timeline()
      
      // Animation du panel
      tl.fromTo(panelRef.current,
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 50,
          rotationX: -15 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.4)" 
        }
      )
      
      // Animation du contenu avec délai
      .fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out" 
        },
        "-=0.6"
      )
    }
  }, [isVisible])

  const handleClose = () => {
    if (isClosing) return
    
    setIsClosing(true)
    
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.9,
      y: -30,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onClose()
        setIsClosing(false)
      }
    })
  }

  if (!isVisible) return null

  return (
    <div className="overlay-backdrop" onClick={handleClose}>
      <div 
        ref={panelRef}
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <BackgroundParticles />
        
        {/* Header avec icône et titre */}
        <div className="panel-header">
          <div className="header-content">
            <div className="portal-icon">{portalData.icon}</div>
            <h2 className="panel-title">{portalData.title}</h2>
          </div>
          <button 
            className="close-button"
            onClick={handleClose}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Contenu principal */}
        <div ref={contentRef} className="panel-content">
          {portalData.content}
        </div>

        {/* Footer avec bouton retour */}
        <div className="panel-footer">
          <button 
            className="back-button"
            onClick={handleClose}
          >
            <span className="button-icon">←</span>
            Retour aux Portails
          </button>
        </div>

        {/* Effet de glow autour du panel */}
        <div className="panel-glow"></div>
      </div>
    </div>
  )
}