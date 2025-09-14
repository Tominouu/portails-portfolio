import React, { useState, useEffect } from 'react'
import SceneRoot from './components/SceneRoot'
import OverlayPanel from './components/OverlayPanel'
import './styles.css'

export default function App() {
  const [openPortal, setOpenPortal] = useState(null)
  const [audioEnabled, setAudioEnabled] = useState(false)

  // Initialiser l'audio après une première interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true)
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
    }
    
    document.addEventListener('click', enableAudio)
    document.addEventListener('touchstart', enableAudio)
    
    return () => {
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
    }
  }, [])

  const openPortalHandler = (id) => {
    console.log('App: Opening portal:', id) // Debug
    setOpenPortal(id)
  }

  const closePortalHandler = () => {
    console.log('App: Closing portal') // Debug
    setOpenPortal(null)
  }

  // Gestion de la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePortalHandler()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Debug: afficher l'état actuel
  console.log('App state:', { openPortal, audioEnabled })

  return (
    <div className="app">
      <SceneRoot 
        onOpenPortal={openPortalHandler} 
        activePortal={openPortal}
        onClosePortal={closePortalHandler}
        audioEnabled={audioEnabled}
      />
      
      {/* Overlay Panel en dehors du Canvas Three.js */}
      {openPortal && (
        <OverlayPanel 
          portalId={openPortal} 
          onClose={closePortalHandler}
          isVisible={!!openPortal}
        />
      )}
      
      {/* Debug info en développement */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 9999
        }}>
          <div>Portal actif: {openPortal || 'aucun'}</div>
          <div>Audio: {audioEnabled ? 'activé' : 'désactivé'}</div>
        </div>
      )}
      
      {/* UI Hint amélioré */}
      <div className="ui-hint">
        <div className="hint-content">
          <span className="hint-icon">◉</span>
          Cliquez sur un portail pour explorer • <kbd>ESC</kbd> pour revenir
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="loading-overlay" id="loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Initialisation des portails...</div>
        </div>
      </div>
    </div>
  )
}