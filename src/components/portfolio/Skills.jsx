import React, { useState, useRef } from 'react'
import { skillCategories } from '../../data/resumeData'
import { Cpu } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const COLOR_MAP = {
  blue:   { primary: '#00d4ff', glow: 'rgba(0,212,255,0.3)',   bg: 'rgba(0,212,255,0.07)' },
  purple: { primary: '#a855f7', glow: 'rgba(168,85,247,0.3)',  bg: 'rgba(168,85,247,0.07)' },
  cyan:   { primary: '#06b6d4', glow: 'rgba(6,182,212,0.3)',   bg: 'rgba(6,182,212,0.07)' },
  violet: { primary: '#8b5cf6', glow: 'rgba(139,92,246,0.3)',  bg: 'rgba(139,92,246,0.07)' },
  green:  { primary: '#06ffa5', glow: 'rgba(6,255,165,0.3)',   bg: 'rgba(6,255,165,0.07)' },
  orange: { primary: '#f97316', glow: 'rgba(249,115,22,0.3)',  bg: 'rgba(249,115,22,0.07)' },
  pink:   { primary: '#ec4899', glow: 'rgba(236,72,153,0.3)',  bg: 'rgba(236,72,153,0.07)' },
  yellow: { primary: '#eab308', glow: 'rgba(234,179,8,0.3)',   bg: 'rgba(234,179,8,0.07)' },
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

function SkillCard({ cat, index, color, visible }) {
  const cardRef = useRef(null)
  const pct = PROFICIENCY[cat.category] || 75

  // 3D tilt on mouse move
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.02)`
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${color.glow}`
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
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.3s, opacity 0.6s ease, translateY 0.6s ease',
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

      {/* Shimmer progress bar */}
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
  const [gridRef, gridVis] = useScrollReveal()

  return (
    <section id="skills" className="section ds-section ds-section--dark">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
          <span className="ds-label"><Cpu size={12} /> Tech Stack</span>
          <h2 className="ds-title">Technical Arsenal</h2>
          <p className="section-subtitle">Full spectrum of ML/AI/backend skills — hover cards for 3D depth</p>
        </div>

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
