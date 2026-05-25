import React, { useState, useRef } from 'react'
import { projects } from '../../data/resumeData'
import { Github, ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const CATEGORIES = ['All', 'Mobile AI', 'Responsible AI', 'Computer Vision', 'Medical AI', 'ML Deployment', 'LLMs & NLP', 'Machine Learning', 'NLP', 'Deep Learning']

const CAT_ICONS = {
  'Mobile AI':       '📱',
  'Responsible AI':  '🛡️',
  'Computer Vision': '👁️',
  'Medical AI':      '🧬',
  'ML Deployment':   '🚀',
  'LLMs & NLP':      '🤖',
  'Machine Learning':'📊',
  'NLP':             '💬',
  'Deep Learning':   '🧠',
}

const CAT_COLORS = {
  'Mobile AI':       '#06ffa5',
  'Responsible AI':  '#f59e0b',
  'Computer Vision': '#00d4ff',
  'Medical AI':      '#10b981',
  'ML Deployment':   '#f97316',
  'LLMs & NLP':      '#a855f7',
  'Machine Learning':'#3b82f6',
  'NLP':             '#ec4899',
  'Deep Learning':   '#6366f1',
}

function ProjectCard({ project, index, visible }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef(null)
  const accent = CAT_COLORS[project.category] || '#00d4ff'
  const icon = CAT_ICONS[project.category] || '🔬'

  // 3D tilt on hover
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-10px) scale(1.01)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <article
      ref={cardRef}
      className={`project-card-3d ${project.featured ? 'project-card-3d--featured' : ''} ${visible ? 'reveal' : ''}`}
      style={{
        '--accent': accent,
        animationDelay: `${index * 0.08}s`,
        transition: 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s, opacity 0.6s, translateY 0.6s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top colored stripe */}
      <div className="project-stripe" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)` }} />

      <div className="project-body">
        {/* Header */}
        <div className="project-card-header">
          <span className="project-cat-icon">{icon}</span>
          <span
            className="project-cat-label"
            style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
          >
            {project.category}
          </span>
          {project.featured && <span className="project-badge-3d">⭐ FEATURED</span>}
        </div>

        <h3 className="project-title-3d">{project.title}</h3>
        <p className={`project-desc-3d ${open ? 'project-desc-3d--open' : ''}`}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="project-tech-3d">
          {project.tech.map(t => (
            <span key={t} className="tech-chip" style={{ borderColor: `${accent}55`, color: accent }}>
              {t}
            </span>
          ))}
        </div>

        {/* Highlights toggle */}
        <button
          className="expand-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          style={{ color: accent }}
        >
          {open ? 'Hide Highlights' : 'Key Highlights'}
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {open && (
          <ul className="highlight-list">
            {project.highlights.map(h => (
              <li key={h}>
                <span className="hl-dot" style={{ background: accent }} />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="project-actions-3d">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-btn" aria-label="View code">
            <Github size={14} /> Code
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="action-btn" aria-label="View demo">
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>

      {/* Glow footer */}
      <div className="project-glow-footer" style={{ background: `radial-gradient(ellipse at center, ${accent}22, transparent 70%)` }} />
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [headRef, headVis] = useScrollReveal()
  const [gridRef, gridVis] = useScrollReveal()

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  const filteredFeatured = filter === 'All' ? featured : featured.filter(p => p.category === filter)
  const filteredRest = filter === 'All' ? rest : rest.filter(p => p.category === filter)
  const allFiltered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section ds-section">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
          <span className="ds-label"><Layers size={12} /> My Work</span>
          <h2 className="ds-title">Data Science &amp; AI Projects</h2>
          <p className="section-subtitle">End-to-end intelligent systems — from on-device LLMs &amp; responsible AI to Computer Vision, NLP &amp; production deployment</p>
        </div>

        {/* Filters */}
        <div className="project-filters-3d">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'filter-chip--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {CAT_ICONS[cat] || '📌'} {cat}
            </button>
          ))}
        </div>

        {/* Featured projects — 2-column spotlight */}
        {filteredFeatured.length > 0 && (
          <div className="projects-featured-row">
            {filteredFeatured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} visible={gridVis} />
            ))}
          </div>
        )}

        {/* Regular projects grid */}
        {filteredRest.length > 0 && (
          <div ref={gridRef} className="projects-grid-3d">
            {filteredRest.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} visible={gridVis} />
            ))}
          </div>
        )}

        {/* If filter has no results */}
        {allFiltered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-dim)' }}>
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}
