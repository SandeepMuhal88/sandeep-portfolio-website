import React from 'react'
import { personalInfo } from '../../data/resumeData'
import { MapPin, Mail, Phone, Github, Linkedin, BarChart2 } from 'lucide-react'
import { useScrollReveal, useCounter } from '../../hooks/useAnimations.js'

const STATS = [
    { raw: '10+', label: 'Projects Built', color: '#00d4ff' },
    { raw: '4+', label: 'AI Domains', color: '#7c3aed' },
    { raw: '7.93', label: 'CGPA / 10.0', color: '#06ffa5' },
    { raw: '2+', label: 'Years in ML', color: '#ff6b6b' },
]

const EXPERTISE = [
    'Machine Learning', 'Deep Learning', 'LLMs & RAG',
    'NLP', 'Computer Vision', 'FastAPI', 'Docker', 'Flutter AI',
]

function StatCard({ raw, label, color }) {
    const [ref, visible] = useScrollReveal()
    const count = useCounter(raw, visible)
    return (
        <div ref={ref} className={`stat-card-3d ${visible ? 'reveal' : ''}`} style={{ '--stat-color': color }}>
            <div className="stat-value-3d">{count}</div>
            <div className="stat-bar">
                <div className="stat-bar-fill" style={{ background: color }} />
            </div>
            <div className="stat-label-3d">{label}</div>
        </div>
    )
}

export default function About() {
    const [headRef, headVis] = useScrollReveal()
    const [textRef, textVis] = useScrollReveal()

    return (
        <section id="about" className="section ds-section">
            <div className="ds-grid-overlay" aria-hidden="true" />
            <div className="section-container">
                <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
                    <span className="ds-label"><BarChart2 size={12} /> About Me</span>
                    <h2 className="ds-title">Who Am I?</h2>
                    <p className="section-subtitle">Passionate about building AI systems that make a real difference</p>
                </div>

                <div className="about-grid">
                    <div ref={textRef} className={`about-text ${textVis ? 'reveal-left' : ''}`}>
                        <h3 className="about-heading">
                            <span className="heading-accent">&lt;</span> Data Scientist & AI Engineer
                            <span className="heading-accent"> /&gt;</span>
                        </h3>
                        <p className="about-para">
                            I'm <strong>Sandeep Muhal</strong>, a CS engineering student at Bikaner Technical University
                            with deep expertise in Machine Learning, Deep Learning, and Large Language Models.
                        </p>
                        <p className="about-para">
                            I engineer <strong>end-to-end AI systems</strong> — from raw data pipelines to production
                            FastAPI/Docker deployments, and mobile Flutter apps with on-device AI. My stack spans
                            PyTorch, LangChain, HuggingFace, FAISS, and OpenCV.
                        </p>
                        <p className="about-para">
                            When I'm not training models, I'm pushing my Kaggle rank, reading the latest AI papers,
                            or contributing to open-source ML tooling.
                        </p>

                        <div className="about-contact">
                            <div className="contact-item"><MapPin size={15} className="contact-icon" /><span>{personalInfo.location}</span></div>
                            <div className="contact-item"><Mail size={15} className="contact-icon" /><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></div>
                            <div className="contact-item"><Phone size={15} className="contact-icon" /><a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a></div>
                        </div>

                        <div className="about-links">
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="ds-link-btn"><Github size={14} /> GitHub</a>
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="ds-link-btn"><Linkedin size={14} /> LinkedIn</a>
                            <a href={personalInfo.kaggle} target="_blank" rel="noopener noreferrer" className="ds-link-btn">🏆 Kaggle</a>
                        </div>
                    </div>

                    <div className="about-right">
                        <div className="stats-grid">
                            {STATS.map(s => <StatCard key={s.label} {...s} />)}
                        </div>
                        <div className="expertise-card-3d">
                            <div className="expertise-card-header">Expertise Areas</div>
                            <div className="expertise-tags">
                                {EXPERTISE.map(e => <span key={e} className="expertise-tag-3d">{e}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
