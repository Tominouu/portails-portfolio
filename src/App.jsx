import React, { useState, useEffect } from 'react'
import SceneRoot from './components/SceneRoot'
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
    setOpenPortal(id)
  }

  const closePortalHandler = () => {
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

  return (
    <div className="app">
      <SceneRoot 
        onOpenPortal={openPortalHandler} 
        activePortal={openPortal}
        onClosePortal={closePortalHandler}
        audioEnabled={audioEnabled}
      />
      
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