import React, { useState, useEffect, useRef } from 'react'
import { personalInfo } from '../../data/resumeData'
import NeuralBackground from './NeuralBackground.jsx'
import { Github, Linkedin, Mail, Phone, Download, ChevronDown, Brain } from 'lucide-react'

const ROLES = [
  'Data Scientist & AI Engineer',
  'LLM & On-Device AI Specialist',
  'Machine Learning Engineer',
  'RAG Pipeline Architect',
  'Deep Learning Specialist',
  'Responsible AI Developer',
  'FastAPI & Docker Developer',
  'Flutter AI App Builder',
]

const FLOATING_WORDS = [
  'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'FAISS',
  'FastAPI', 'Docker', 'RAG', 'CNN', 'LSTM', 'BERT', 'GPT',
  'LLaMA', 'Flutter', 'llama.cpp', 'GGUF', 'RLHF', 'Scikit-learn',
  'HuggingFace', 'OpenCV', 'SQLite', 'Dart FFI', 'Transformer',
]

export default function Hero({ onNav }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const cardRef = useRef(null)
  const avatarRef = useRef(null)
  const sectionRef = useRef(null)

  const [floaters] = useState(() =>
    FLOATING_WORDS.map((w, i) => ({
      word: w,
      x: 5 + ((i * 37) % 88),
      y: 8 + ((i * 53) % 82),
      delay: i * 0.4,
      dur: 7 + (i % 5),
    }))
  )

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex]
    let t
    if (!deleting && charIndex <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1) }, 52)
    } else if (!deleting && charIndex > current.length) {
      t = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIndex > 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 28)
    } else {
      setDeleting(false)
      setRoleIndex(r => (r + 1) % ROLES.length)
    }
    return () => clearTimeout(t)
  }, [charIndex, deleting, roleIndex])

  // Glitch on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 350)
    }, 800)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax — hero card & avatar tilt
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`
      }
      if (avatarRef.current) {
        avatarRef.current.style.transform = `perspective(700px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateY(${Math.sin(Date.now() / 1000) * 12}px)`
      }
    }

    const onLeave = () => {
      if (cardRef.current) cardRef.current.style.transform = ''
      if (avatarRef.current) avatarRef.current.style.transform = ''
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      {/* Animated gradient mesh */}
      <div className="hero-mesh" aria-hidden="true" />
      {/* Neural network canvas */}
      <NeuralBackground />
      {/* Floating data words */}
      <div className="hero-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span
            key={i}
            className="hero-float-word"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
            }}
          >
            {f.word}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="hero-content">
        {/* 3D text card */}
        <div className="hero-card-3d" ref={cardRef}>
          {/* Sonar status badge */}
          <div className="hero-badge">
            <Brain size={13} />
            <span className="hero-badge-dot-wrap">
              <span className="hero-badge-dot" />
            </span>
            Data Scientist &amp; AI Engineer · Open to Roles
          </div>

          <p className="hero-greeting">Hello, I'm</p>

          <h1 className="hero-name">
            <span
              className={`hero-name-glitch ${glitching ? 'glitching' : ''}`}
              data-text="Sandeep"
            >
              <span className="hero-name-outline">Sandeep</span>
            </span>
            <span className="hero-name-filled"> Muhal</span>
          </h1>

          {/* Typewriter — terminal style */}
          <div className="hero-role" aria-live="polite">
            <span className="hero-role-prefix">{'>>> '}</span>
            <span className="hero-role-text">{displayed}</span>
            <span className="hero-cursor" aria-hidden="true">_</span>
          </div>

          <p className="hero-summary">{personalInfo.summary.slice(0, 195)}…</p>

          {/* CTA */}
          <div className="hero-cta" style={{ position: 'relative', zIndex: 10 }}>
            <button
              className="btn-3d btn-3d--primary"
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else onNav('projects')
              }}
              id="hero-explore-btn"
            >
              <span>Explore My Work</span>
            </button>
            <a
              className="btn-3d btn-3d--outline"
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-resume-btn"
            >
              <Download size={15} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Socials */}
          <div className="hero-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="GitHub"><Github size={18} /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={`mailto:${personalInfo.email}`} className="social-orb" aria-label="Email"><Mail size={18} /></a>
            <a href={`tel:${personalInfo.phone}`} className="social-orb" aria-label="Phone"><Phone size={18} /></a>
          </div>
        </div>

        {/* Avatar 3D */}
        <div className="hero-avatar-3d" ref={avatarRef}>
          <div className="avatar-ring-1" aria-hidden="true" />
          <div className="avatar-ring-2" aria-hidden="true" />
          <div className="avatar-ring-3" aria-hidden="true" />
          <div className="avatar-core">
            <img
              src="images/profile_pna.jpg"
              alt="Sandeep Muhal"
              className="avatar-img"
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="avatar-fallback">SM</span>' }}
            />
          </div>
          {/* Orbiting tags */}
          <div className="orbit-tag orbit-tag--1">ML</div>
          <div className="orbit-tag orbit-tag--2">AI</div>
          <div className="orbit-tag orbit-tag--3">DL</div>
        </div>
      </div>

      {/* Scroll cue */}
      <button className="hero-scroll" onClick={() => onNav('about')} aria-label="Scroll to About">
        <span className="hero-scroll-label">Scroll</span>
        <ChevronDown size={20} className="hero-scroll-icon" />
      </button>
    </section>
  )
}
