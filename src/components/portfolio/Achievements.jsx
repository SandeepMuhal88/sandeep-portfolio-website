import React, { useEffect, useRef, useState } from 'react'
import { achievements } from '../../data/resumeData'
import { Trophy } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const ICONS  = ['🏆', '📈', '⚡', '🔬', '🐳', '🤖', '🚀']
const COLORS = ['#a78bfa', '#06b6d4', '#34d399', '#fb923c', '#ec4899', '#fbbf24', '#818cf8']

export default function Achievements() {
  const [headRef, headVis] = useScrollReveal()
  const [gridRef, gridVis] = useScrollReveal()

  return (
    <section id="achievements" className="section ds-section">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
          <span className="ds-label"><Trophy size={12} /> Milestones</span>
          <h2 className="ds-title">Achievements</h2>
          <p className="section-subtitle">Key highlights from my AI/ML journey — each step building toward the future</p>
        </div>

        <div ref={gridRef} className="achievements-grid">
          {achievements.map((ach, i) => (
            <AchievementCard
              key={i}
              ach={ach}
              index={i}
              color={COLORS[i % COLORS.length]}
              icon={ICONS[i % ICONS.length]}
              visible={gridVis}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementCard({ ach, index, color, icon, visible }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={`achievement-card-3d ${visible ? 'reveal' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        '--ach-color': color,
        borderLeft: `3px solid ${color}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), -2px 0 20px ${color}22`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="achievement-num"
        style={{ color, textShadow: `0 0 20px ${color}88` }}
      >
        {icon}
      </div>
      <p className="achievement-text">{ach}</p>
    </div>
  )
}
