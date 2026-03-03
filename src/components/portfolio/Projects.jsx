import React, { useState } from 'react'
import { projects } from '../../data/resumeData'
import { Github, ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const CATEGORIES = ['All', 'Computer Vision', 'Medical AI', 'ML Deployment', 'LLMs & NLP', 'Machine Learning', 'NLP', 'Deep Learning']

const CAT_ICONS = {
    'Computer Vision': '👁️',
    'Medical AI': '🧬',
    'ML Deployment': '🚀',
    'LLMs & NLP': '🤖',
    'Machine Learning': '📊',
    'NLP': '💬',
    'Deep Learning': '🧠',
}

const CAT_COLORS = {
    'Computer Vision': '#00d4ff',
    'Medical AI': '#06ffa5',
    'ML Deployment': '#f97316',
    'LLMs & NLP': '#a855f7',
    'Machine Learning': '#3b82f6',
    'NLP': '#ec4899',
    'Deep Learning': '#6366f1',
}

function ProjectCard({ project, index, visible }) {
    const [open, setOpen] = useState(false)
    const accent = CAT_COLORS[project.category] || '#00d4ff'
    const icon = CAT_ICONS[project.category] || '🔬'

    return (
        <article
            className={`project-card-3d ${project.featured ? 'project-card-3d--featured' : ''} ${visible ? 'reveal' : ''}`}
            style={{ '--accent': accent, animationDelay: `${index * 0.08}s` }}
        >
            {/* Top stripe */}
            <div className="project-stripe" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

            {/* Header */}
            <div className="project-card-header">
                <span className="project-cat-icon">{icon}</span>
                <span className="project-cat-label" style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}>
                    {project.category}
                </span>
                {project.featured && <span className="project-badge-3d">⭐ FEATURED</span>}
            </div>

            <h3 className="project-title-3d">{project.title}</h3>
            <p className="project-desc-3d">{project.description}</p>

            {/* Tech */}
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
            >
                Key Highlights
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

            {/* Glow footer */}
            <div className="project-glow-footer" style={{ background: `radial-gradient(ellipse at center, ${accent}22, transparent 70%)` }} />
        </article>
    )
}

export default function Projects() {
    const [filter, setFilter] = useState('All')
    const [headRef, headVis] = useScrollReveal()
    const [gridRef, gridVis] = useScrollReveal()

    const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

    return (
        <section id="projects" className="section ds-section">
            <div className="ds-grid-overlay" aria-hidden="true" />
            <div className="section-container">
                <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
                    <span className="ds-label"><Layers size={12} /> My Work</span>
                    <h2 className="ds-title">AI/ML Projects</h2>
                    <p className="section-subtitle">End-to-end systems spanning Computer Vision, NLP, LLMs & more</p>
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

                <div ref={gridRef} className="projects-grid-3d">
                    {filtered.map((p, i) => (
                        <ProjectCard key={p.title} project={p} index={i} visible={gridVis} />
                    ))}
                </div>
            </div>
        </section>
    )
}
