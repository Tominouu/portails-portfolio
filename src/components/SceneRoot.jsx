import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Environment, Line } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import Portal from './Portal'
import OverlayPanel from './OverlayPanel'

const initialCameraPos = [0, 3, 8]

// ===== HOOK AUDIO AMÉLIORÉ =====
function useAudio(url, loop = false, volume = 0.2, enabled = true) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const audio = new Audio(url)
    audio.loop = loop
    audio.volume = volume
    audio.preload = 'auto'
    
    const playAudio = () => {
      audio.play().catch(e => console.log('Audio play failed:', e))
    }

    // Délai pour s'assurer que l'audio est chargé
    setTimeout(playAudio, 100)
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [url, loop, volume, enabled])

  return audioRef.current
}

// ===== PARTICULES AVANCÉES =====
function EnhancedParticles({ count = 300, activePortal }) {
  const meshRef = useRef()
  const materialRef = useRef()
  
  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Positions aléatoires
      positions[i3] = (Math.random() - 0.5) * 25
      positions[i3 + 1] = Math.random() * 8
      positions[i3 + 2] = (Math.random() - 0.5) * 25
      
      // Couleurs variées (cyan/magenta)
      const colorMix = Math.random()
      colors[i3] = colorMix * 0.8 + 0.2     // R
      colors[i3 + 1] = 0.9 + colorMix * 0.1 // G
      colors[i3 + 2] = 1.0                  // B
      
      // Tailles et vitesses variées
      sizes[i] = Math.random() * 0.08 + 0.02
      speeds[i] = Math.random() * 0.01 + 0.005
    }

    return { positions, colors, sizes, speeds }
  }, [count])

  useFrame(({ mouse, clock }) => {
    if (!meshRef.current) return

    const time = clock.getElapsedTime()
    const positions = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Mouvement organique
      positions[i3] += Math.sin(time * particlesData.speeds[i] + i) * 0.02
      positions[i3 + 1] += particlesData.speeds[i]
      positions[i3 + 2] += Math.cos(time * particlesData.speeds[i] + i) * 0.015

      // Reset si trop haut
      if (positions[i3 + 1] > 8) {
        positions[i3 + 1] = -2
      }
    }

    // Réaction au curseur
    const mouseInfluence = new THREE.Vector3(mouse.x * 8, mouse.y * 5, 0)
    meshRef.current.position.lerp(mouseInfluence, 0.02)
    
    // Rotation douce
    meshRef.current.rotation.y += 0.002

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={particlesData.positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={count} 
          array={particlesData.colors} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-size" 
          count={count} 
          array={particlesData.sizes} 
          itemSize={1} 
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={0.06} 
        vertexColors 
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ===== CAMERA WARP AVANCÉ =====
function CameraWarp({ target, isWarping, onWarpComplete }) {
  const { camera } = useThree()
  const originalPos = useRef([...initialCameraPos])

  useEffect(() => {
    if (target) {
      // Effet de shake avant le warp
      const shakeTimeline = gsap.timeline()
      
      shakeTimeline
        .to(camera.position, {
          x: camera.position.x + (Math.random() - 0.5) * 0.1,
          y: camera.position.y + (Math.random() - 0.5) * 0.1,
          duration: 0.1,
          repeat: 3,
          yoyo: true
        })
        .to(camera.position, {
          x: target[0] + 0.5,
          y: target[1] + 2,
          z: target[2] + 3,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: onWarpComplete
        })
    } else {
      // Retour à la position initiale
      gsap.to(camera.position, {
        x: originalPos.current[0],
        y: originalPos.current[1],
        z: originalPos.current[2],
        duration: 1.2,
        ease: "power2.out"
      })
    }
  }, [target, camera, onWarpComplete])

  return null
}

// ===== FLUX LUMINEUX AMÉLIORÉ =====
function EnhancedLightFlux({ start, end, active }) {
  const lineRef = useRef()
  
  useFrame(({ clock }) => {
    if (lineRef.current && active) {
      const time = clock.getElapsedTime()
      const opacity = (Math.sin(time * 4) + 1) * 0.3 + 0.4
      lineRef.current.material.opacity = opacity
    }
  })

  if (!start || !end || !active) return null

  return (
    <Line 
      ref={lineRef}
      points={[start, end]} 
      color="#00ffff" 
      lineWidth={6} 
      transparent
      opacity={0.7}
      dashed={false}
    />
  )
}

// ===== ENVIRONNEMENT ATMOSPHÉRIQUE =====
function AtmosphericEnvironment() {
  return (
    <>
      {/* Lumières principales */}
      <ambientLight intensity={0.4} color="#0066cc" />
      <pointLight 
        position={[0, 4, 0]} 
        intensity={2} 
        color="#00ffff" 
        distance={15}
        decay={2}
      />
      <pointLight 
        position={[-3, 2, -4]} 
        intensity={1.5} 
        color="#ff44aa" 
        distance={10}
        decay={2}
      />
      <pointLight 
        position={[3, 2, -4]} 
        intensity={1.2} 
        color="#44ff88" 
        distance={8}
        decay={2}
      />
      
      {/* Fog atmosphérique */}
      <fog attach="fog" args={['#050508', 3, 25]} />
      
      {/* Sol réfléchissant */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#0a0a0f" 
          roughness={0.8} 
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  )
}

// ===== COMPOSANT PRINCIPAL =====
export default function SceneRoot({ onOpenPortal, activePortal, onClosePortal, audioEnabled }) {
  const [warpTarget, setWarpTarget] = useState(null)
  const [fluxPoints, setFluxPoints] = useState(null)
  const [isWarping, setIsWarping] = useState(false)

  // Audio de fond
  useAudio('/audio/ambient-space.mp3', true, 0.15, audioEnabled)

  const handlePortalClick = (id, position) => {
    setFluxPoints([position, initialCameraPos])
    setWarpTarget(position)
    setIsWarping(true)
    onOpenPortal(id)
  }

  const handlePortalHover = (hovered) => {
    if (hovered && audioEnabled) {
      // Son de hover (optionnel)
      const hoverAudio = new Audio('/audio/hover.mp3')
      hoverAudio.volume = 0.3
      hoverAudio.play().catch(() => {})
    }
  }

  const handleClosePortal = () => {
    setWarpTarget(null)
    setFluxPoints(null)
    setIsWarping(false)
    onClosePortal()
  }

  const onWarpComplete = () => {
    setIsWarping(false)
  }

  // Masquer le loading après montage
  useEffect(() => {
    const timer = setTimeout(() => {
      const loading = document.getElementById('loading')
      if (loading) {
        loading.style.opacity = '0'
        setTimeout(() => loading.style.display = 'none', 500)
      }
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Canvas 
      shadows 
      camera={{ position: initialCameraPos, fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Environnement */}
      <AtmosphericEnvironment />
      
      {/* Environment HDR */}
      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
      </Suspense>

      {/* Particules améliorées */}
      <EnhancedParticles count={400} activePortal={activePortal} />

      {/* Groupe de portails */}
      <group position={[0, -1.8, 0]}>
        <Portal 
          position={[-4, 0.6, -2]} 
          label="Mes Projets" 
          id="projects" 
          onOpen={handlePortalClick}
          onHover={handlePortalHover}
          active={activePortal === 'projects'}
        />
        <Portal 
          position={[0, 0.6, -3]} 
          label="À Propos" 
          id="about" 
          onOpen={handlePortalClick}
          onHover={handlePortalHover}
          active={activePortal === 'about'}
        />
        <Portal 
          position={[4, 0.6, -2]} 
          label="Compétences" 
          id="skills" 
          onOpen={handlePortalClick}
          onHover={handlePortalHover}
          active={activePortal === 'skills'}
        />
        <Portal 
          position={[0, 0.6, 1]} 
          label="Contact" 
          id="contact" 
          onOpen={handlePortalClick}
          onHover={handlePortalHover}
          active={activePortal === 'contact'}
        />
      </group>

      {/* Flux lumineux */}
      <EnhancedLightFlux 
        start={fluxPoints?.[0]} 
        end={fluxPoints?.[1]} 
        active={!!activePortal}
      />

      {/* Camera warp */}
      <CameraWarp 
        target={warpTarget} 
        isWarping={isWarping}
        onWarpComplete={onWarpComplete}
      />

      {/* Overlay UI */}
      {activePortal && (
        <Html center>
          <OverlayPanel 
            portalId={activePortal} 
            onClose={handleClosePortal}
            isVisible={!!activePortal}
          />
        </Html>
      )}

      {/* Contrôles */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={12}
        autoRotate={!activePortal}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}