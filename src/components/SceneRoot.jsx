import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Environment } from '@react-three/drei'
import Portal from './Portal'
import * as THREE from 'three'

// Particle system
function Particles({ count = 150 }) {
  const meshRef = useRef()
  const positions = React.useMemo(() => {
    const arr = []
    for(let i = 0; i < count; i++){
      arr.push((Math.random()-0.5)*20, Math.random()*5, (Math.random()-0.5)*20)
    }
    return new Float32Array(arr)
  }, [count])

  useFrame(({ clock }) => {
    if(meshRef.current){
      meshRef.current.rotation.y += 0.001
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

export default function SceneRoot({ onOpenPortal }) {
  return (
    <Canvas shadows camera={{ position: [0, 2.5, 6], fov: 50 }}>
      {/* Ambient + Point Lights */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0,3,0]} intensity={1.5} color="cyan" />
      <pointLight position={[-2,1,-3]} intensity={1} color="magenta" />

      {/* Fog */}
      <fog attach="fog" args={['#0b0b0f', 2, 20]} />

      {/* Background Environment */}
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
        <Portal position={[-3,0.4,-1]} label="Projets" id="projects" onOpen={onOpenPortal}/>
        <Portal position={[0,0.4,-2.5]} label="À propos" id="about" onOpen={onOpenPortal}/>
        <Portal position={[3,0.4,-1]} label="Compétences" id="skills" onOpen={onOpenPortal}/>
      </group>

      <OrbitControls enablePan={false} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI/2.1} />
    </Canvas>
  )
}
