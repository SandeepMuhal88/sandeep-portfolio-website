import React from 'react'
import { personalInfo } from '../../data/resumeData'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer({ onNav }) {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <button className="nav-brand" onClick={() => onNav('home')}>
                            <span className="brand-dot" />
                            <span className="brand-name">Sandeep<span className="brand-accent"> Muhal</span></span>
                        </button>
                        <p className="footer-tagline">ML & Deep Learning Engineer · Building AI that matters.</p>
                    </div>

                    <div className="footer-links">
                        {['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'].map((s) => (
                            <button key={s} className="footer-nav-link" onClick={() => onNav(s)}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="footer-socials">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social">
                            <Github size={18} />
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social">
                            <Linkedin size={18} />
                        </a>
                        <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="footer-social">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>

                <div className="footer-divider" />

                <div className="footer-bottom">
                    <p>© {year} Sandeep Muhal. All rights reserved.</p>
                    <p className="footer-made">Made with <Heart size={12} className="footer-heart" /> &amp; Python 🐍</p>
                </div>
            </div>
        </footer>
    )
}
