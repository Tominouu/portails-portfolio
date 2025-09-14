import React, { useState } from 'react'
import SceneRoot from './components/SceneRoot'
import OverlayPanel from './components/OverlayPanel'

export default function App(){
  const [openPortal, setOpenPortal] = useState(null) // null | 'projects' | 'about' | ...
  const open = (id) => setOpenPortal(id)
  const close = () => setOpenPortal(null)

  return (
    <div className="app">
      <SceneRoot onOpenPortal={open} activePortal={openPortal} />
      <OverlayPanel openPortal={openPortal} onClose={close} />
      <div className="ui-hint">Clique / Tape un portail pour explorer • ESC pour revenir</div>
    </div>
  )
}
