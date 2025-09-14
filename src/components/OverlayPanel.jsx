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