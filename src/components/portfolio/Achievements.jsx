import React, { useRef } from 'react'
import { achievements } from '../../data/resumeData'
import { Trophy } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const ICONS = ['🏆', '📈', '⚡', '🔬', '🐳', '🤖', '🚀']

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
              icon={ICONS[i % ICONS.length]}
              visible={gridVis}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AchievementCard({ ach, index, icon, visible }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-7px) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={`achievement-card-3d ${visible ? 'reveal' : ''}`}
      style={{ animationDelay: `${index * 0.09}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="achievement-num">{icon}</div>
      <p className="achievement-text">{ach}</p>
    </div>
  )
}
