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
  'HuggingFace', 'OpenCV', 'SQLite', 'Transformer',
]

/* ─────────────────────────────────────────────
   PROPER PYTHON LOGO — Official SVG, Monochrome
   ───────────────────────────────────────────── */
function Python3DLogo() {
  return (
    <div className="hero-python-3d">
      <div className="python-scene">
        {/* Ring 1 */}
        <div className="python-ring python-ring-1">
          <div className="ring-dot ring-dot-1" />
        </div>
        {/* Ring 2 */}
        <div className="python-ring python-ring-2">
          <div className="ring-dot ring-dot-2" />
        </div>
        {/* Ring 3 */}
        <div className="python-ring python-ring-3">
          <div className="ring-dot ring-dot-3" />
        </div>

        {/* Official Python Logo — proper snake design, rendered in white/gray */}
        <svg
          className="python-logo-svg"
          viewBox="0 0 256 255"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Python Programming Language"
          role="img"
        >
          <defs>
            <linearGradient id="py-body-top" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
              <stop offset="0%" stopColor="#5A9FD4" />
              <stop offset="100%" stopColor="#306998" />
            </linearGradient>
            <linearGradient id="py-body-bot" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
              <stop offset="0%" stopColor="#FFD43B" />
              <stop offset="100%" stopColor="#FFE873" />
            </linearGradient>
          </defs>

          {/* Top snake body — official Python blue */}
          <path
            fill="url(#py-body-top)"
            d="M127.559 0.047c-67.765 0-63.527 29.435-63.527 29.435l.075 30.51h64.728v9.153H40.692S0 64.114 0 132.573c0 68.453 37.862 66.023 37.862 66.023h22.61V169.44s-1.218-37.862 37.247-37.862h64.183s36.051.583 36.051-34.85V35.202S203.275.047 127.559.047zm-35.601 20.67a11.658 11.658 0 110 23.317 11.658 11.658 0 010-23.317z"
          />

          {/* Bottom snake body — official Python yellow */}
          <path
            fill="url(#py-body-bot)"
            d="M128.685 254.578c67.765 0 63.527-29.435 63.527-29.435l-.075-30.51h-64.728v-9.153h88.143s40.692 5.031 40.692-63.428c0-68.453-37.862-66.023-37.862-66.023h-22.61V85.185s1.218 37.862-37.247 37.862H94.341s-36.051-.583-36.051 34.85v62.487s-5.525 34.194 70.395 34.194zm35.601-20.67a11.658 11.658 0 110-23.317 11.658 11.658 0 010 23.317z"
          />
        </svg>

        <div className="python-glow-base" />
      </div>

      {/* Floating tech badges */}
      <div className="py-badge py-badge-1">⚡ FastAPI</div>
      <div className="py-badge py-badge-2">🤖 LLM</div>
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
      delay: i * 0.45,
      dur: 8 + (i % 5),
    }))
  )

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex]
    let t
    if (!deleting && charIndex <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1) }, 50)
    } else if (!deleting && charIndex > current.length) {
      t = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && charIndex > 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 26)
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
    }, 900)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax on hero card
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
      {/* Dot grid */}
      <div className="hero-mesh" aria-hidden="true" />
      {/* Neural network canvas */}
      <NeuralBackground />
      {/* Floating keywords */}
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
        {/* LEFT: Text */}
        <div className="hero-card-3d" ref={cardRef}>
          {/* Badge */}
          <div className="hero-badge">
            <Brain size={12} />
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

          {/* Typewriter */}
          <div className="hero-role" aria-live="polite">
            <span className="hero-role-prefix">{'> '}</span>
            <span className="hero-role-text">{displayed}</span>
            <span className="hero-cursor" aria-hidden="true">█</span>
          </div>

          <p className="hero-summary">{personalInfo.summary.slice(0, 195)}…</p>

          {/* CTA */}
          <div className="hero-cta">
            <button
              className="btn-3d btn-3d--primary"
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else onNav('projects')
              }}
              id="hero-explore-btn"
            >
              Explore My Work
            </button>
            <a
              className="btn-3d btn-3d--outline"
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-resume-btn"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>

          {/* Socials */}
          <div className="hero-socials">
            <a href={personalInfo.github}   target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="GitHub"><Github size={17} /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href={`mailto:${personalInfo.email}`}           className="social-orb" aria-label="Email"><Mail size={17} /></a>
            <a href={`tel:${personalInfo.phone}`}              className="social-orb" aria-label="Phone"><Phone size={17} /></a>
          </div>
        </div>

        {/* RIGHT: 3D Python Logo */}
        <Python3DLogo />
      </div>

      {/* Scroll cue */}
      <button className="hero-scroll" onClick={() => onNav('about')} aria-label="Scroll to About">
        <span className="hero-scroll-label">Scroll</span>
        <ChevronDown size={18} className="hero-scroll-icon" />
      </button>
    </section>
  )
}
