import React from 'react'

// Test ultra simple
export default function OverlayPanel({ portalId, onClose, isVisible }) {
  
  console.log('OverlayPanel rendu avec:', { portalId, isVisible })

  if (!isVisible) {
    console.log('Overlay pas visible, pas de rendu')
    return null
  }

  const handleBackdropClick = (e) => {
    // Fermer seulement si on clique sur le backdrop
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000, // Z-index très élevé
        backdropFilter: 'blur(5px)'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 230, 255, 0.1), rgba(255, 73, 193, 0.1))',
          border: '2px solid rgba(0, 230, 255, 0.3)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          color: 'white',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 50px rgba(0, 230, 255, 0.3)'
        }}
      >
        <h1 style={{
          fontSize: '36px',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00e6ff, #ff49c1)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🚀 PORTAIL {portalId?.toUpperCase()}
        </h1>
        
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          Vous avez ouvert le portail <strong>{portalId}</strong> ! 
          <br />
          Le contenu est bien affiché.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ color: '#00e6ff', marginBottom: '10px' }}>🎯 Status</h3>
            <p style={{ fontSize: '14px' }}>Overlay fonctionne correctement</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ color: '#44ff88', marginBottom: '10px' }}>📍 Portail</h3>
            <p style={{ fontSize: '14px' }}>ID: {portalId}</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #00e6ff, #0099cc)',
            border: 'none',
            borderRadius: '12px',
            padding: '15px 30px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 230, 255, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🔙 Fermer le Portail
        </button>
      </div>
    </div>
  )
}

// Contenu riche pour chaque portail
const PORTAL_CONTENT = {
  projects: {
    title: "🚀 Mes Projets",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #00e6ff, #0099cc)",
    content: [
      {
        name: "Portfolio 3D Immersif",
        desc: "Expérience interactive avec React + Three.js, shaders GLSL personnalisés, particules dynamiques et navigation immersive.",
        tech: ["React", "Three.js", "GLSL", "GSAP", "Vite"],
        highlight: true
      },
      {
        name: "Application E-commerce",
        desc: "Plateforme complète avec panier intelligent, paiements sécurisés Stripe et interface admin dashboard.",
        tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"]
      },
      {
        name: "Dashboard Analytics",
        desc: "Visualisation de données temps réel avec graphiques D3.js, métriques personnalisables et exports PDF.",
        tech: ["Vue.js", "D3.js", "WebSocket", "Python", "Docker"]
      }
    ]
  },
  
  about: {
    title: "👨‍💻 À Propos",
    icon: "🌟",
    gradient: "linear-gradient(135deg, #ff49c1, #c73650)",
    content: {
      intro: "Développeur Full-Stack passionné par la création d'expériences web innovantes et immersives. Je combine créativité technique et vision artistique pour donner vie aux projets les plus ambitieux.",
      journey: "5+ années d'expérience dans le développement web moderne. Spécialisé dans les interfaces 3D, les animations complexes et l'optimisation des performances. Formé aux dernières technologies, toujours en quête d'innovation.",
      philosophy: "Chaque ligne de code est une opportunité de repousser les limites du possible. J'aime créer des expériences qui marquent les esprits, en alliant esthétique moderne et fonctionnalité parfaite.",
      stats: [
        { number: "50+", label: "Projets Réalisés", icon: "🎯" },
        { number: "5", label: "Années d'Expérience", icon: "⏱️" },
        { number: "15+", label: "Technologies Maîtrisées", icon: "💻" },
        { number: "98%", label: "Satisfaction Client", icon: "⭐" }
      ]
    }
  },

  skills: {
    title: "⚡ Compétences",
    icon: "🛠️", 
    gradient: "linear-gradient(135deg, #44ff88, #2d8f47)",
    content: {
      categories: [
        {
          name: "Frontend",
          color: "#00e6ff",
          skills: [
            { name: "React / Next.js", level: "expert", years: "4+" },
            { name: "Three.js / R3F", level: "expert", years: "3+" },
            { name: "Vue.js / Nuxt", level: "advanced", years: "3+" },
            { name: "TypeScript", level: "expert", years: "3+" },
            { name: "GSAP / Framer", level: "advanced", years: "2+" }
          ]
        },
        {
          name: "Backend", 
          color: "#44ff88",
          skills: [
            { name: "Node.js / Express", level: "expert", years: "4+" },
            { name: "Python / Django", level: "advanced", years: "3+" },
            { name: "REST / GraphQL", level: "expert", years: "3+" },
            { name: "WebSockets", level: "advanced", years: "2+" },
            { name: "Docker", level: "intermediate", years: "2+" }
          ]
        },
        {
          name: "Base de Données",
          color: "#ff49c1", 
          skills: [
            { name: "MongoDB", level: "expert", years: "4+" },
            { name: "PostgreSQL", level: "advanced", years: "3+" },
            { name: "Redis", level: "advanced", years: "2+" },
            { name: "Firebase", level: "intermediate", years: "2+" }
          ]
        },
        {
          name: "Créatif / 3D",
          color: "#ffaa00",
          skills: [
            { name: "GLSL Shaders", level: "expert", years: "2+" },
            { name: "Blender", level: "advanced", years: "3+" },
            { name: "WebGL", level: "expert", years: "3+" },
            { name: "After Effects", level: "advanced", years: "4+" }
          ]
        }
      ]
    }
  },

  contact: {
    title: "📧 Contact", 
    icon: "🌐",
    gradient: "linear-gradient(135deg, #ffaa00, #cc7700)",
    content: {
      intro: "Vous avez un projet ambitieux ? Créons quelque chose d'extraordinaire ensemble. Je suis disponible pour des collaborations, du freelance ou des opportunités permanentes.",
      contacts: [
        { 
          icon: "📧", 
          label: "Email", 
          value: "contact@portfolio.dev",
          action: "mailto:contact@portfolio.dev",
          color: "#00e6ff"
        },
        { 
          icon: "💼", 
          label: "LinkedIn", 
          value: "@mon-portfolio",
          action: "https://linkedin.com/in/mon-portfolio",
          color: "#0077b5"
        },
        { 
          icon: "🐱", 
          label: "GitHub", 
          value: "@mon-username",
          action: "https://github.com/mon-username", 
          color: "#333"
        },
        { 
          icon: "🌍", 
          label: "Localisation", 
          value: "La Teste-de-Buch, FR",
          action: null,
          color: "#44ff88"
        }
      ],
      availability: "Disponible pour nouveaux projets",
      responseTime: "Réponse sous 24h"
    }
  }
}

export { PORTAL_CONTENT }

