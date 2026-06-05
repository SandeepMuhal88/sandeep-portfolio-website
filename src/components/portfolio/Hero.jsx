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

/* ─── Big Animated 3D Python Logo SVG ─── */
function Python3DLogo() {
  return (
    <div className="hero-python-3d">
      <div className="python-scene">
        {/* Orbital rings */}
        <div className="python-ring python-ring-1">
          <div className="ring-dot ring-dot-1" />
        </div>
        <div className="python-ring python-ring-2">
          <div className="ring-dot ring-dot-2" />
        </div>
        <div className="python-ring python-ring-3">
          <div className="ring-dot ring-dot-3" />
        </div>

        {/* Python SVG Logo */}
        <svg
          className="python-logo-svg"
          viewBox="0 0 110.3 110.4"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Python Programming Language Logo"
        >
          <defs>
            <linearGradient id="py-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="py-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#py-blue-grad)"
            d="M54.8 0C44.2 0 43.4 4.6 43.4 4.6l0 4.8h11.8v1.4H37.4S27 9.5 27 20.3s8.8 10.4 8.8 10.4h5.2v-5s-0.3-8.8 8.7-8.8h15s8.4 0.1 8.4-8.1V8.9S71.7 0 54.8 0z M48.9 5.1c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7-2.7-1.2-2.7-2.7S47.4 5.1 48.9 5.1z"
          />
          <path
            fill="url(#py-yellow-grad)"
            d="M55.5 110.4c10.6 0 11.5-4.6 11.5-4.6l0-4.8H55.2v-1.4h17.7s10.4 1.3 10.4-9.5-8.8-10.4-8.8-10.4h-5.2v5s0.3 8.8-8.7 8.8H45.1s-8.4-0.1-8.4 8.1v7.9S38.6 110.4 55.5 110.4z M61.4 105.3c-1.5 0-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7S62.9 105.3 61.4 105.3z"
          />
          <path
            fill="url(#py-blue-grad)"
            opacity="0.6"
            d="M43.4 9.4v10.9c0 0 0 8.4 8.4 8.4h15.3c0 0 8.1 0 8.1 8.1v15.2c0 0 0 8.5-8.5 8.5H51.4c0 0-8.5 0-8.5 8.5v0l0 0H35c0 0-8-0.1-8-8.1V37c0 0 0.1-8.5 8.5-8.5h13.2V18.4C48.7 18.4 48.8 9.4 43.4 9.4z"
          />
          <path
            fill="url(#py-yellow-grad)"
            opacity="0.6"
            d="M66.9 101.1V90.2c0 0 0-8.4-8.4-8.4H43.2c0 0-8.1 0-8.1-8.1V58.5c0 0 0-8.5 8.5-8.5h15.3c0 0 8.5 0 8.5-8.5v0l0 0h8c0 0 8 0.1 8 8.1v16.9c0 0-0.1 8.5-8.5 8.5H61.6v10.1C61.6 85.1 61.5 94.1 66.9 94.1l0 7.1z"
          />
        </svg>

        {/* Glow base shadow */}
        <div className="python-glow-base" />
      </div>

      {/* Floating badges */}
      <div className="py-badge py-badge-1">🤖 LLM</div>
      <div className="py-badge py-badge-2">⚡ FastAPI</div>
      <div className="py-badge py-badge-3">🔥 PyTorch</div>
      <div className="py-badge py-badge-4">🐳 Docker</div>
      <div className="py-badge py-badge-5">🧠 Deep Learning</div>
      <div className="py-badge py-badge-6">✨ RAG</div>
    </div>
  )
}

export default function Hero({ onNav }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [glitching, setGlitching] = useState(false)
  const cardRef = useRef(null)
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

  // Mouse parallax
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
    }
    const onLeave = () => {
      if (cardRef.current) cardRef.current.style.transform = ''
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
      {/* Gradient mesh */}
      <div className="hero-mesh" aria-hidden="true" />
      {/* Neural network canvas */}
      <NeuralBackground />
      {/* Floating tech words */}
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
        {/* Left: Text card */}
        <div className="hero-card-3d" ref={cardRef}>
          {/* Status badge */}
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

          {/* Typewriter terminal */}
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

        {/* Right: Big 3D Python Logo */}
        <Python3DLogo />
      </div>

      {/* Scroll cue */}
      <button className="hero-scroll" onClick={() => onNav('about')} aria-label="Scroll to About">
        <span className="hero-scroll-label">Scroll</span>
        <ChevronDown size={20} className="hero-scroll-icon" />
      </button>
    </section>
  )
}
