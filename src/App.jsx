import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './components/portfolio/Navbar.jsx'
import Hero from './components/portfolio/Hero.jsx'
import About from './components/portfolio/About.jsx'
import Skills from './components/portfolio/Skills.jsx'
import Projects from './components/portfolio/Projects.jsx'
import Education from './components/portfolio/Education.jsx'
import Achievements from './components/portfolio/Achievements.jsx'
import Contact from './components/portfolio/Contact.jsx'
import Footer from './components/portfolio/Footer.jsx'
import './portfolio.css'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

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
    <div className="portfolio-root">
      <Navbar activeSection={activeSection} onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />
    </div>
  )
}
