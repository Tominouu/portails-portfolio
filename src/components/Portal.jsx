import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Portal({ position=[0,0,0], label='Portal', id, onOpen }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(()=>{
    gsap.to(ref.current.scale, { x: scale, y: scale, z: scale, duration:0.6, ease:'elastic.out(1,0.6)' })
  }, [scale])

  useFrame(({ clock }) => {
    if(ref.current){
      ref.current.rotation.y += 0.003
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime()*0.8)*0.08
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e)=>{ e.stopPropagation(); setHovered(true); setScale(1.08) }}
        onPointerOut={(e)=>{ e.stopPropagation(); setHovered(false); setScale(1) }}
        onClick={(e)=>{ e.stopPropagation(); if(onOpen) onOpen(id) }}
      >
        <torusGeometry args={[1,0.28,32,128]} />
        <meshStandardMaterial
          color={hovered ? '#00e6ff' : '#0e0e1a'}
          emissive={hovered ? new THREE.Color('#00e6ff') : new THREE.Color('#000000')}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label */}
      <Html position={[0,-1.45,0]} center>
        <div style={{
          padding:'6px 10px',
          borderRadius:10,
          background:'rgba(10,10,12,0.45)',
          border:'1px solid rgba(255,255,255,0.03)',
          color:'#cfefff',
          fontSize:13,
          minWidth:64,
          textAlign:'center',
          backdropFilter:'blur(6px)'
        }}>{label}</div>
      </Html>
    </group>
  )
}
