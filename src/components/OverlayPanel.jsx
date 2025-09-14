import React, { useEffect } from 'react'
import { projects } from '../data/projects'

export default function OverlayPanel({ openPortal, onClose }){
  useEffect(()=>{
    function handler(e){
      if(e.key === 'Escape') onClose && onClose()
    }
    window.addEventListener('keydown', handler)
    return ()=> window.removeEventListener('keydown', handler)
  },[onClose])

  if(!openPortal) return null

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <div className="panel">
        <header>
          <div>
            <h2>{openPortal === 'projects' ? 'Projets' : openPortal === 'about' ? 'À propos' : 'Compétences'}</h2>
            <div style={{opacity:0.8,fontSize:13}}>
              {openPortal === 'projects' ? 'Explore mes travaux récents' : openPortal === 'about' ? 'Qui je suis' : 'Tech & mini-demos'}
            </div>
          </div>
          <div>
            <button className="btn" onClick={onClose}>Retour</button>
          </div>
        </header>

        <div className="content">
          {openPortal === 'projects' && (
            <div>
              {projects.map(p=>(
                <article key={p.id} style={{padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <h3 style={{margin:'0 0 6px 0'}}>{p.title}</h3>
                  <p style={{margin:0,color:'rgba(255,255,255,0.8)'}}>{p.desc}</p>
                </article>
              ))}
            </div>
          )}

          {openPortal === 'about' && (
            <div>
              <p>Salut — je suis Tom, futur développeur fullstack. J’aime créer des expériences interactives et des interfaces immersives.</p>
              <p>Ce prototype montre un hub avec des portails et des transitions shader/3D.</p>
            </div>
          )}

          {openPortal === 'skills' && (
            <div>
              <ul>
                <li>Front: React, R3F, Three.js</li>
                <li>Back: Node, Express</li>
                <li>Outils: GSAP, GLSL, Vite</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
