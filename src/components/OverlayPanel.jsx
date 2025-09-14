import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function OverlayPanel({ children }) {
  const ref = useRef()
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: 'min(900px,90%)',
        maxHeight: '85%',
        overflowY: 'auto',
        padding: 24,
        borderRadius: 16,
        background: 'rgba(10,10,12,0.45)',
        border: '1px solid rgba(0,255,255,0.1)',
        boxShadow: '0 0 20px rgba(0,255,255,0.2), 0 0 40px rgba(0,255,255,0.1)',
        color: '#a0f0ff',
        fontFamily: '"Orbitron", sans-serif',
        fontSize: 14,
        letterSpacing: '0.5px',
        lineHeight: 1.6,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        pointerEvents: 'auto'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}
