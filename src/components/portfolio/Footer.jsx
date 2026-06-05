import React from 'react'
import { personalInfo } from '../../data/resumeData'
import { Github, Linkedin, Mail, Heart, Youtube, Twitter, Instagram } from 'lucide-react'

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact']

export default function Footer({ onNav }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <button className="nav-brand" onClick={() => onNav('home')} aria-label="Go to top" style={{ marginBottom: '10px' }}>
              <span className="brand-dot" />
              <span className="brand-name">Sandeep<span className="brand-accent"> Muhal</span></span>
            </button>
            <p className="footer-tagline">Data Scientist &amp; AI Engineer · Building intelligent systems that matter.</p>
            <div className="footer-socials" style={{ marginTop: '16px' }}>
              {[
                { href: personalInfo.github,    icon: <Github size={16} />,    label: 'GitHub' },
                { href: personalInfo.linkedin,  icon: <Linkedin size={16} />,  label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: <Mail size={16} />, label: 'Email' },
                { href: personalInfo.youtube,   icon: <Youtube size={16} />,   label: 'YouTube' },
                { href: personalInfo.twitter,   icon: <Twitter size={16} />,   label: 'Twitter' },
                { href: personalInfo.instagram, icon: <Instagram size={16} />, label: 'Instagram' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '14px'
            }}>Navigation</div>
            <div className="footer-links">
              {NAV_SECTIONS.map(s => (
                <button key={s} className="footer-link" onClick={() => onNav(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick connect */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '14px'
            }}>Quick Connect</div>
            <div className="footer-links" style={{ flexDirection: 'column' }}>
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="footer-link">📄 Resume</a>
              <a href={personalInfo.kaggle} target="_blank" rel="noopener noreferrer" className="footer-link">🏆 Kaggle</a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">💻 GitHub</a>
              <a href={`mailto:${personalInfo.email}`} className="footer-link">✉️ Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} <span className="footer-copy-accent">Sandeep Muhal</span>. All rights reserved.</p>
          <p className="footer-tech">
            Made with <Heart size={12} style={{ display:'inline', color:'#ec4899', verticalAlign:'middle' }} /> &amp; Python 🐍
          </p>
        </div>
      </div>
    </footer>
  )
}
