import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import Navbar from './components/portfolio/Navbar.jsx'
import Hero from './components/portfolio/Hero.jsx'
import About from './components/portfolio/About.jsx'
import Skills from './components/portfolio/Skills.jsx'
import Projects from './components/portfolio/Projects.jsx'
import Experience from './components/portfolio/Experience.jsx'
import Education from './components/portfolio/Education.jsx'
import Achievements from './components/portfolio/Achievements.jsx'
import Contact from './components/portfolio/Contact.jsx'
import Footer from './components/portfolio/Footer.jsx'
import './portfolio.css'
import { Analytics } from "@vercel/analytics/react"

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => { } })

export function useTheme() {
  return useContext(ThemeContext)
}

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact']

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress(docHeight > 0 ? (scrolled / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

function LoadingScreen() {
  return (
    <div className="loading-screen" aria-hidden="true">
      <div className="loading-logo">SM</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
      <div className="loading-text">Initializing…</div>
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark'
  })
  const [loaded, setLoaded] = useState(false)

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Hide loading screen after 2s
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  // Track active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 100
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="portfolio-root" data-theme={theme}>
        {!loaded && <LoadingScreen />}
        <ScrollProgressBar />
        <Navbar activeSection={activeSection} onNav={scrollTo} />
        <main>
          <Hero onNav={scrollTo} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <Footer onNav={scrollTo} />
        <Analytics />
      </div>
    </ThemeContext.Provider>
  )
}
