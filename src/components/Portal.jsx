import React, { useRef, useState, useEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { gsap } from 'gsap'

// Shader Material
const PortalShaderMaterial = shaderMaterial(
  { uTime:0, uColor:new THREE.Color(0x00e6ff) },
  `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main(){
    vec2 uv = vUv - 0.5;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    angle += sin(r*10.0 - uTime*2.0)*0.3;
    float glow = smoothstep(0.6,0.1,r) + 0.5*sin(uTime*4.0 + r*12.0);
    vec3 col = mix(vec3(0.01), uColor, glow);
    float rim = smoothstep(0.4,0.35,r);
    col += vec3(0.5,0.2,1.0)*rim*0.2;
    gl_FragColor = vec4(col,1.0);
  }
`
)
extend({ PortalShaderMaterial })

export default function Portal({ position=[0,0,0], label='Portal', id, onOpen }) {
  const meshRef = useRef()
  const shaderRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(()=>{
    gsap.to(meshRef.current.scale, { x: scale, y: scale, z: scale, duration:0.6, ease:'elastic.out(1,0.6)' })
  }, [scale])

  useFrame(({ clock })=>{
    if(meshRef.current){
      meshRef.current.rotation.y += 0.003
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()*0.8)*0.08
    }
    if(shaderRef.current){
      shaderRef.current.uTime = clock.getElapsedTime()
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e)=>{ e.stopPropagation(); setHovered(true); setScale(1.08) }}
        onPointerOut={(e)=>{ e.stopPropagation(); setHovered(false); setScale(1) }}
        onClick={(e)=>{ e.stopPropagation(); if(onOpen) onOpen(id, position) }}
      >
        <torusGeometry args={[1,0.28,32,128]} />
        <portalShaderMaterial ref={shaderRef} uColor={hovered ? new THREE.Color(0x00ffff) : new THREE.Color(0x00e6ff)} />
      </mesh>

      <Html position={[0,-1.45,0]} center>
        <div style={{
          padding:'6px 10px',
          borderRadius:10,
          background:'rgba(10,10,12,0.45)',
          border:'1px solid rgba(255,255,255,0.03)',
          color:'#a0f0ff',
          fontFamily:'"Orbitron",sans-serif',
          fontSize:12,
          textAlign:'center'
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}
