import React, { useEffect, useRef, useState } from 'react'
import { achievements } from '../../data/resumeData'
import { Trophy } from 'lucide-react'

const ICONS  = ['🏆', '📈', '⚡', '🔬', '🐳', '🤖', '🚀']
const COLORS = ['#00d4ff', '#a855f7', '#06ffa5', '#f97316', '#ec4899', '#f59e0b', '#6366f1']

function AchEntry({ ach, index, color, icon }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`ach-entry ${visible ? 'visible' : ''}`}
      style={{ '--ach-color': color, transitionDelay: `${index * 0.12}s` }}
    >
      {/* Left/right card */}
      <div className="ach-card">
        <div className="ach-num">{String(index + 1).padStart(2, '0')}</div>
        <p className="ach-text">{ach}</p>
        <div className="ach-accent-line" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
      </div>

      {/* Center orb */}
      <div className="ach-orb" style={{ '--ach-color': color }}>
        {icon}
      </div>

      {/* Spacer for opposite side */}
      <div style={{ flex: 1 }} />
    </div>
  )
}

export default function Achievements() {
  const timelineRef = useRef(null)
  const [timelineVis, setTimelineVis] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimelineVis(true) },
      { threshold: 0.1 }
    )
    if (timelineRef.current) observer.observe(timelineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" className="section ds-section">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div className="section-header">
          <span className="ds-label"><Trophy size={12} /> Milestones</span>
          <h2 className="ds-title">Achievements</h2>
          <p className="section-subtitle">Key highlights from my AI/ML journey — each step forward</p>
        </div>

        <div
          ref={timelineRef}
          className={`achievements-timeline ${timelineVis ? 'reveal' : ''}`}
        >
          {achievements.map((ach, i) => (
            <AchEntry
              key={i}
              ach={ach}
              index={i}
              color={COLORS[i % COLORS.length]}
              icon={ICONS[i % ICONS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
