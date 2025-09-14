import React, { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

// Simple shader material using fragment code from vortex.frag via THREE.ShaderMaterial
import vortexFrag from '../shaders/vortex.frag?raw'

function ShaderPortalMaterial(){
  const matRef = useRef()
  useFrame(({ clock }) => {
    if(matRef.current){
      matRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })
  return (
    <shaderMaterial
      ref={matRef}
      args={[{
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 0.6 },
          uColor: { value: new THREE.Color(0x00e6ff) }
        },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: vortexFrag
      }]}
      transparent
    />
  )
}

export default function Portal({ position=[0,0,0], label='Portal', id, onOpen }){
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(()=>{
    gsap.to(ref.current.scale, { x: scale, y: scale, z: scale, duration: 0.6, ease: 'elastic.out(1,0.6)' })
  }, [scale])

  useFrame((state, delta) => {
    if(ref.current){
      ref.current.rotation.y += 0.0025
      const t = state.clock.getElapsedTime()
      ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e)=>{ e.stopPropagation(); setHovered(true); setScale(1.06) }}
        onPointerOut={(e)=>{ e.stopPropagation(); setHovered(false); setScale(1) }}
        onClick={(e)=>{ e.stopPropagation(); if(onOpen) onOpen(id) }}
        castShadow
      >
        <torusGeometry args={[1.0, 0.28, 32, 128]} />
        <ShaderPortalMaterial />
      </mesh>

      <Html position={[0,-1.45,0]} center>
        <div style={{
          padding:'6px 10px', borderRadius:8, background:'rgba(10,10,12,0.45)', border:'1px solid rgba(255,255,255,0.03)',
          color:'#cfefff', fontSize:13, minWidth:64, textAlign:'center', backdropFilter:'blur(6px)'
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}
