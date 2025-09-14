import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { Html, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

// ===== SHADER VORTEX AVANCÉ =====
const VortexShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x00e6ff),
    uIntensity: 1.0,
    uPulse: 1.0,
    uDistortion: 0.5,
    uResolution: new THREE.Vector2(512, 512)
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    precision highp float;
    
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uPulse;
    uniform float uDistortion;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Fonction de bruit
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g; g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = vUv - 0.5;
      float r = length(uv);
      float angle = atan(uv.y, uv.x);
      
      // Vortex spiral
      float spiral = sin(r * 15.0 - uTime * 3.0 + angle * 4.0) * uDistortion;
      angle += spiral;
      
      // Coordonnées polaires modifiées
      vec2 newUv = vec2(cos(angle), sin(angle)) * r + 0.5;
      
      // Pulsation organique
      float pulse = sin(uTime * 2.0) * 0.3 + 0.7;
      float heartbeat = sin(uTime * 6.0) * 0.1 + 0.9;
      
      // Glow principal
      float glow = smoothstep(0.8, 0.0, r) * uIntensity * pulse;
      glow += smoothstep(0.5, 0.1, r) * 0.6 * heartbeat;
      
      // Bruit pour texture organique
      float noise = snoise(newUv * 8.0 + uTime * 0.5) * 0.2;
      glow += noise * smoothstep(0.6, 0.2, r);
      
      // Couleur base
      vec3 color = uColor * glow;
      
      // Rim lighting neon
      float rim = 1.0 - smoothstep(0.4, 0.35, r);
      color += vec3(0.0, 0.8, 1.0) * rim * 0.8;
      
      // Centre plus intense
      float center = smoothstep(0.15, 0.05, r);
      color += vec3(1.0, 1.0, 1.0) * center * 0.5;
      
      // Particules scintillantes
      vec2 sparkleUv = vUv * 20.0;
      float sparkle = sin(sparkleUv.x * 15.0 + uTime * 8.0) * sin(sparkleUv.y * 15.0 + uTime * 6.0);
      sparkle = smoothstep(0.95, 1.0, sparkle) * smoothstep(0.5, 0.1, r);
      color += vec3(1.0) * sparkle * 0.3;
      
      // Effet de profondeur
      float depth = smoothstep(0.0, 0.3, r) * smoothstep(0.6, 0.3, r);
      color = mix(color, color * 0.3, depth * 0.5);
      
      gl_FragColor = vec4(color, glow + rim * 0.5 + center);
    }
  `
)

extend({ VortexShaderMaterial })

// ===== DISTORSION ATMOSPHÉRIQUE =====
const AtmosphericDistortion = ({ position, intensity = 0.5 }) => {
  const meshRef = useRef()
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime()
      meshRef.current.rotation.z = time * 0.5
      meshRef.current.material.opacity = intensity * (Math.sin(time * 2) * 0.3 + 0.7)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <ringGeometry args={[1.4, 1.8, 32]} />
      <meshBasicMaterial 
        color="#001133"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ===== COMPOSANT PORTAIL PRINCIPAL =====
export default function Portal({ 
  position = [0, 0, 0], 
  label = 'Portal', 
  id, 
  onOpen, 
  onHover,
  active = false 
}) {
  const portalRef = useRef()
  const shaderRef = useRef()
  const ringRef = useRef()
  const groupRef = useRef()
  
  const [hovered, setHovered] = useState(false)
  const [scale, setScale] = useState(1)
  
  const { mouse } = useThree()

  // Animation d'entrée
  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(groupRef.current.scale, 
        { x: 0, y: 0, z: 0 },
        { 
          x: 1, y: 1, z: 1, 
          duration: 1.2, 
          ease: "back.out(1.7)",
          delay: Math.random() * 0.5
        }
      )
    }
  }, [])

  // Animation de scale au hover
  useEffect(() => {
    if (portalRef.current) {
      gsap.to(portalRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.8,
        ease: "elastic.out(1, 0.6)"
      })
    }
  }, [scale])

  // Animation continue
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    if (portalRef.current) {
      // Rotation continue
      portalRef.current.rotation.y += 0.005
      portalRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
      
      // Flottement vertical
      portalRef.current.position.y = Math.sin(time * 0.8) * 0.1
      
      // Réaction au curseur
      portalRef.current.rotation.z = mouse.x * 0.1
    }

    // Animation du shader
    if (shaderRef.current) {
      shaderRef.current.uTime = time
      shaderRef.current.uPulse = active ? 1.5 : 1.0
      shaderRef.current.uIntensity = hovered ? 1.8 : 1.0
      shaderRef.current.uDistortion = hovered ? 0.8 : 0.5
    }

    // Ring extérieur
    if (ringRef.current) {
      ringRef.current.rotation.y -= 0.003
      ringRef.current.rotation.z = Math.sin(time * 0.6) * 0.2
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    setScale(1.15)
    document.body.style.cursor = 'pointer'
    if (onHover) onHover(true)
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    setScale(1)
    document.body.style.cursor = 'default'
    if (onHover) onHover(false)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (onOpen) {
      // Animation de clic
      gsap.to(portalRef.current.scale, {
        x: 0.9, y: 0.9, z: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
      onOpen(id, position)
    }
  }

  // Couleurs dynamiques selon l'ID
  const portalColor = useMemo(() => {
    const colors = {
      projects: new THREE.Color(0x00e6ff),
      about: new THREE.Color(0xff49c1),
      skills: new THREE.Color(0x44ff88),
      contact: new THREE.Color(0xffaa00)
    }
    return colors[id] || new THREE.Color(0x00e6ff)
  }, [id])

  return (
    <group ref={groupRef} position={position}>
      {/* Distorsion atmosphérique */}
      <AtmosphericDistortion position={[0, 0, 0]} intensity={hovered ? 0.8 : 0.3} />
      
      {/* Ring extérieur décoratif */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.6, 1.8, 64]} />
        <meshBasicMaterial 
          color={portalColor}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Portail principal */}
      <mesh
        ref={portalRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <torusGeometry args={[1, 0.3, 32, 128]} />
        <vortexShaderMaterial 
          ref={shaderRef}
          uColor={portalColor}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label flottant */}
      <Html position={[0, -1.8, 0]} center>
        <div 
          className={`portal-label ${hovered ? 'hovered' : ''} ${active ? 'active' : ''}`}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            background: active 
              ? 'rgba(0, 230, 255, 0.2)' 
              : hovered 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(10, 10, 12, 0.6)',
            border: `1px solid ${active ? '#00e6ff' : hovered ? '#ffffff44' : '#ffffff11'}`,
            color: active ? '#00ffff' : hovered ? '#ffffff' : '#a0f0ff',
            fontFamily: '"Orbitron", "SF Pro Display", sans-serif',
            fontSize: '13px',
            fontWeight: active ? '600' : '400',
            textAlign: 'center',
            letterSpacing: '0.5px',
            textShadow: active ? '0 0 8px #00ffff' : hovered ? '0 0 4px #ffffff' : 'none',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            transform: hovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: active 
              ? '0 0 20px rgba(0, 230, 255, 0.5), inset 0 0 10px rgba(0, 230, 255, 0.1)'
              : hovered
                ? '0 0 15px rgba(255, 255, 255, 0.2)'
                : '0 0 5px rgba(0, 0, 0, 0.3)'
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}