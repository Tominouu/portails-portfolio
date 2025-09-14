import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Environment } from '@react-three/drei'
import Portal from './Portal'

export default function SceneRoot({ onOpenPortal, activePortal }){
  return (
    <div style={{width:'100%',height:'100%'}}>
      <Canvas shadows camera={{ position: [0, 2.5, 7], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <Suspense fallback={<Html center><div style={{color:'white'}}>Chargement...</div></Html>}>
          <group position={[0, -1.4, 0]}>
            <Portal position={[-3, 0.4, -1]} label="Projets" id="projects" onOpen={onOpenPortal} />
            <Portal position={[0, 0.4, -2.5]} label="À propos" id="about" onOpen={onOpenPortal} />
            <Portal position={[3, 0.4, -1]} label="Compétences" id="skills" onOpen={onOpenPortal} />
          </group>
          <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.5,0]}>
            <planeGeometry args={[40,40]} />
            <meshStandardMaterial color="#06060a" roughness={1} />
          </mesh>
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI/2.1} />
      </Canvas>
    </div>
  )
}
