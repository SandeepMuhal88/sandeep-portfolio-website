import React, { useState, useEffect } from 'react'
import { personalInfo } from '../../data/resumeData'
import NeuralBackground from './NeuralBackground.jsx'
import { Github, Linkedin, Mail, Phone, Download, ChevronDown, Brain } from 'lucide-react'

const ROLES = [
    'Machine Learning Engineer',
    'Deep Learning Specialist',
    'LLM & RAG Architect',
    'Computer Vision Engineer',
    'FastAPI & Docker Developer',
    'Flutter AI App Builder',
]

const FLOATING_WORDS = [
    'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'FAISS',
    'FastAPI', 'Docker', 'RAG', 'CNN', 'LSTM', 'BERT', 'GPT',
    'LLaMA', 'Flutter', 'Scikit-learn', 'HuggingFace', 'OpenCV',
]

export default function Hero({ onNav }) {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [charIndex, setCharIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [floaters] = useState(() =>
        FLOATING_WORDS.map((w, i) => ({
            word: w,
            x: 5 + ((i * 37) % 88),
            y: 8 + ((i * 53) % 82),
            delay: i * 0.4,
            dur: 5 + (i % 4),
        }))
    )

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIndex]
        let t
        if (!deleting && charIndex <= current.length) {
            t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1) }, 55)
        } else if (!deleting && charIndex > current.length) {
            t = setTimeout(() => setDeleting(true), 2000)
        } else if (deleting && charIndex > 0) {
            t = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 30)
        } else {
            setDeleting(false)
            setRoleIndex(r => (r + 1) % ROLES.length)
        }
        return () => clearTimeout(t)
    }, [charIndex, deleting, roleIndex])

    return (
        <section id="home" className="hero-section">
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
                {/* 3-D card wrapper */}
                <div className="hero-card-3d">
                    {/* Status */}
                    <div className="hero-badge">
                        <Brain size={13} />
                        <span className="hero-badge-dot" />
                        Available for AI/ML roles
                    </div>

                    <p className="hero-greeting">Hello, I'm</p>
                    <h1 className="hero-name">
                        <span className="hero-name-outline">Sandeep</span>
                        <span className="hero-name-filled"> Muhal</span>
                    </h1>

                    {/* Typewriter */}
                    <div className="hero-role" aria-live="polite">
                        <span className="hero-role-prefix">{">>> "}</span>
                        <span className="hero-role-text">{displayed}</span>
                        <span className="hero-cursor" aria-hidden="true">_</span>
                    </div>

                    <p className="hero-summary">{personalInfo.summary.slice(0, 190)}…</p>

                    {/* CTA */}
                    <div className="hero-cta">
                        <button className="btn-3d btn-3d--primary" onClick={() => onNav('skills')} id="hero-explore-btn">
                            <span>Explore My Work</span>
                        </button>
                        <a className="btn-3d btn-3d--outline" href={personalInfo.resume} target="_blank" rel="noopener noreferrer" id="hero-resume-btn">
                            <Download size={15} />
                            <span>Download CV</span>
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="hero-socials">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="GitHub">  <Github size={18} /></a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-orb" aria-label="LinkedIn"><Linkedin size={18} /></a>
                        <a href={`mailto:${personalInfo.email}`} className="social-orb" aria-label="Email"><Mail size={18} /></a>
                        <a href={`tel:${personalInfo.phone}`} className="social-orb" aria-label="Phone"><Phone size={18} /></a>
                    </div>
                </div>

                {/* Avatar 3D */}
                <div className="hero-avatar-3d">
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
                <ChevronDown size={20} className="hero-scroll-icon" />
            </button>
        </section>
    )
}
