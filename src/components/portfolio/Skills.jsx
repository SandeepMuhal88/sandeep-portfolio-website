import React, { useState, useRef } from 'react'
import { skillCategories } from '../../data/resumeData'
import { Cpu } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const COLOR_MAP = {
  blue:   { primary: '#a78bfa', glow: 'rgba(167,139,250,0.32)', bg: 'rgba(167,139,250,0.07)' },
  purple: { primary: '#c084fc', glow: 'rgba(192,132,252,0.32)', bg: 'rgba(192,132,252,0.07)' },
  cyan:   { primary: '#06b6d4', glow: 'rgba(6,182,212,0.32)',   bg: 'rgba(6,182,212,0.07)' },
  violet: { primary: '#818cf8', glow: 'rgba(129,140,248,0.32)', bg: 'rgba(129,140,248,0.07)' },
  green:  { primary: '#34d399', glow: 'rgba(52,211,153,0.32)',  bg: 'rgba(52,211,153,0.07)' },
  orange: { primary: '#fb923c', glow: 'rgba(251,146,60,0.32)',  bg: 'rgba(251,146,60,0.07)' },
  pink:   { primary: '#f472b6', glow: 'rgba(244,114,182,0.32)', bg: 'rgba(244,114,182,0.07)' },
  yellow: { primary: '#fbbf24', glow: 'rgba(251,191,36,0.32)',  bg: 'rgba(251,191,36,0.07)' },
}

const PROFICIENCY = {
  'Programming':             92,
  'Machine Learning':        88,
  'Deep Learning':           85,
  'LLMs & NLP':              82,
  'Frameworks & Libraries':  87,
  'Backend & Deployment':    80,
  'Mobile Development':      72,
  'Tools & Visualization':   83,
}

/* ── Real Tech Logo URLs using devicons CDN ── */
const TECH_LOGOS = [
  { name: 'Python',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PyTorch',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Docker',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git',          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'JavaScript',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Flutter',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Dart',         url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'C++',          url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C',            url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'Jupyter',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  { name: 'VS Code',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'NumPy',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Pandas',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'Scikit-learn', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'OpenCV',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'SQLite',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'FastAPI',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Streamlit',    url: 'https://streamlit.io/images/brand/streamlit-mark-color.svg' },
  { name: 'Keras',        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg' },
  { name: 'Linux',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Matplotlib',   url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg' },
  { name: 'HuggingFace',  url: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
]

function SkillCard({ cat, index, color, visible }) {
  const cardRef = useRef(null)
  const pct = PROFICIENCY[cat.category] || 75

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 22
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-10px) scale(1.02)`
    card.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${color.glow}`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ''
    card.style.boxShadow = ''
  }

  return (
    <div
      ref={cardRef}
      className={`skill-card-3d ${visible ? 'reveal' : ''}`}
      style={{
        '--c':   color.primary,
        '--cg':  color.glow,
        '--cbg': color.bg,
        '--pct': `${pct}%`,
        animationDelay: `${index * 0.07}s`,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.3s, opacity 0.6s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow corner */}
      <div className="skill-card-glow" aria-hidden="true" />

      <div className="skill-card-top">
        <span className="skill-icon-3d">{cat.icon}</span>
        <div>
          <h3 className="skill-cat-name">{cat.category}</h3>
          <p className="skill-cat-count">{cat.skills.length} technologies</p>
        </div>
        <div className="skill-pct-label">{pct}%</div>
      </div>

      {/* Progress bar */}
      <div className="skill-progress-track">
        <div
          className="skill-progress-fill"
          style={{
            '--pct': `${pct}%`,
            background: `linear-gradient(90deg, ${color.primary}, ${color.glow})`,
          }}
        />
      </div>

      {/* Tags */}
      <div className="skill-tags-3d">
        {cat.skills.map((s, i) => (
          <span
            key={s}
            className="skill-tag-3d"
            style={{
              borderColor: `${color.primary}55`,
              color: color.primary,
              background: color.bg,
              animationDelay: `${i * 0.04}s`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [headRef, headVis] = useScrollReveal()
  const [logosRef, logosVis] = useScrollReveal()
  const [gridRef, gridVis] = useScrollReveal()

  return (
    <section id="skills" className="section ds-section ds-section--dark">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
          <span className="ds-label"><Cpu size={12} /> Tech Stack</span>
          <h2 className="ds-title">Technical Arsenal</h2>
          <p className="section-subtitle">Full spectrum of ML/AI/backend skills — real logos, 3D cards, hover for depth</p>
        </div>

        {/* ── Real Tech Logos Row ── */}
        <div ref={logosRef} className={`skill-logos-section ${logosVis ? 'reveal' : ''}`}>
          <div className="skill-logos-title">⚡ Core Technologies</div>
          <div className="skill-logos-grid">
            {TECH_LOGOS.map((tech, i) => (
              <div
                key={tech.name}
                className="skill-logo-item"
                style={{ animationDelay: `${i * 0.04}s` }}
                title={tech.name}
              >
                <img
                  src={tech.url}
                  alt={tech.name}
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none' }}
                />
                <span className="skill-logo-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3D Skill Cards ── */}
        <div ref={gridRef} className="skills-grid-3d">
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={cat.category}
              cat={cat}
              index={i}
              color={COLOR_MAP[cat.color] || COLOR_MAP.blue}
              visible={gridVis}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
