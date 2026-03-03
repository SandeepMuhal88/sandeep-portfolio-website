import React, { useState, useEffect } from 'react'
import { personalInfo } from '../../data/resumeData'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../App.jsx'

const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, onNav }) {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (id) => {
        onNav(id)
        setOpen(false)
    }

    return (
        <nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="nav-container">
                <button className="nav-brand" onClick={() => handleNav('home')} aria-label="Go to home">
                    <span className="brand-dot" />
                    <span className="brand-name">Sandeep<span className="brand-accent"> Muhal</span></span>
                </button>

                {/* Desktop */}
                <div className="nav-links" role="list">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            role="listitem"
                            className={`nav-link ${activeSection === link.id ? 'nav-link--active' : ''}`}
                            onClick={() => handleNav(link.id)}
                            aria-current={activeSection === link.id ? 'page' : undefined}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="nav-right">
                    {/* Theme toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        id="theme-toggle-btn"
                    >
                        {theme === 'dark'
                            ? <Sun size={18} className="theme-icon theme-icon--sun" />
                            : <Moon size={18} className="theme-icon theme-icon--moon" />
                        }
                    </button>

                    {/* Mobile toggle */}
                    <button
                        className="nav-toggle"
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="nav-drawer">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            className={`nav-drawer-link ${activeSection === link.id ? 'nav-drawer-link--active' : ''}`}
                            onClick={() => handleNav(link.id)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    )
}
