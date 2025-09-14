import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Environment, Line } from '@react-three/drei'
import gsap from 'gsap'
import Portal from './Portal'
import * as THREE from 'three'

// ----------------------------
// Hook audio
function useAudio(url, loop=false, volume=0.3){
  useEffect(()=>{
    const audio = new Audio(url)
    audio.loop = loop
    audio.volume = volume
    audio.play()
    return ()=> audio.pause()
  }, [url])
}

// ----------------------------
// Particles flottantes
function Particles({ count = 200 }) {
  const meshRef = useRef()
  const positions = React.useMemo(() => {
    const arr = []
    for(let i = 0; i < count; i++){
      arr.push((Math.random()-0.5)*20, Math.random()*5, (Math.random()-0.5)*20)
    }
    return new Float32Array(arr)
  }, [count])

  useFrame(({ mouse }) => {
    if(meshRef.current){
      meshRef.current.rotation.y += 0.001
      // Particules réactives au mouvement de la souris
      meshRef.current.position.x = mouse.x * 5
      meshRef.current.position.z = mouse.y * 5
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length/3} array={positions} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00e6ff" />
    </points>
  )
}

// ----------------------------
// Camera warp effect
function CameraWarp({ target }) {
  const { camera } = useThree()
  useEffect(()=>{
    if(target){
      gsap.to(camera.position, { x: target[0], y: target[1]+1, z: target[2]+2, duration:1.2, ease:"power2.inOut" })
    }
  }, [target])
  return null
}

// ----------------------------
// Flux lumineux entre portail et caméra
function LightFlux({ start, end }) {
  if(!start || !end) return null
  return (
    <Line points={[start,end]} color="#00e6ff" lineWidth={4} dashed={false} />
  )
}

// ----------------------------
// Scene principale
export default function SceneRoot({ onOpenPortal }) {
  const [warpTarget, setWarpTarget] = useState(null)
  const [fluxPoints, setFluxPoints] = useState(null)

  // Audio de fond
  useAudio('/ambient.mp3', true, 0.2)

  // Callback pour les portails
  const handlePortalClick = (id, pos) => {
    setFluxPoints([pos, [0,2,6]]) // du portail vers caméra
    setWarpTarget(pos)
    if(onOpenPortal) onOpenPortal(id)
  }

  return (
    <Canvas shadows camera={{ position: [0, 2.5, 6], fov: 50 }}>
      {/* Lumières */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0,3,0]} intensity={1.5} color="cyan" />
      <pointLight position={[-2,1,-3]} intensity={1} color="magenta" />

      {/* Fog */}
      <fog attach="fog" args={['#0b0b0f', 2, 20]} />

      {/* Environment */}
      <Suspense fallback={<Html center style={{color:'white'}}>Chargement...</Html>}>
        <Environment preset="sunset" />
      </Suspense>

      {/* Ground */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.5,0]}>
        <planeGeometry args={[40,40]} />
        <meshStandardMaterial color="#06060a" roughness={1} />
      </mesh>

      {/* Particles */}
      <Particles count={200} />

      {/* Portals */}
      <group position={[0,-1.4,0]}>
        <Portal position={[-3,0.4,-1]} label="Projets" id="projects" onOpen={handlePortalClick}/>
        <Portal position={[0,0.4,-2.5]} label="À propos" id="about" onOpen={handlePortalClick}/>
        <Portal position={[3,0.4,-1]} label="Compétences" id="skills" onOpen={handlePortalClick}/>
      </group>

      {/* Flux lumineux */}
      <LightFlux start={fluxPoints ? fluxPoints[0] : null} end={fluxPoints ? fluxPoints[1] : null} />

      {/* Caméra dynamique */}
      <CameraWarp target={warpTarget} />

      {/* Contrôle */}
      <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI/2.1} />
    </Canvas>
  )
}
