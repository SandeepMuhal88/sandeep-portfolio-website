import React from 'react'
import { personalInfo } from '../../data/resumeData'
import { Github, Linkedin, Mail, Heart, Youtube, Twitter, Instagram } from 'lucide-react'

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact']

export default function Footer({ onNav }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Animated gradient beam */}
      <div className="footer-beam" aria-hidden="true" />

      {/* Decorative background text */}
      <div className="footer-bg-text" aria-hidden="true">SANDEEP MUHAL</div>

      <div className="footer-container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <button className="nav-brand" onClick={() => onNav('home')} aria-label="Go to top">
              <span className="brand-dot" />
              <span className="brand-name">Sandeep<span className="brand-accent"> Muhal</span></span>
            </button>
            <p className="footer-tagline">
              Data Scientist &amp; AI Engineer · Building intelligent systems that matter.
            </p>
            <div className="footer-socials-row">
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
          <div className="footer-socials">
            <div className="footer-links-label">Navigation</div>
            <div className="footer-links">
              {NAV_SECTIONS.map(s => (
                <button key={s} className="footer-nav-link" onClick={() => onNav(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick connect */}
          <div className="footer-socials">
            <div className="footer-links-label">Quick Connect</div>
            <div className="footer-links">
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="footer-nav-link">📄 Download Resume</a>
              <a href={personalInfo.kaggle} target="_blank" rel="noopener noreferrer" className="footer-nav-link">🏆 Kaggle Profile</a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-nav-link">💻 GitHub Repos</a>
              <a href={`mailto:${personalInfo.email}`} className="footer-nav-link">✉️ Send Email</a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {year} Sandeep Muhal. All rights reserved.</p>
          <p className="footer-made">
            Made with <Heart size={12} className="footer-heart" /> &amp; Python 🐍
          </p>
        </div>
      </div>
    </footer>
  )
}
