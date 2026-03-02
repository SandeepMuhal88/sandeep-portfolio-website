import React from 'react'
import { achievements } from '../../data/resumeData'
import { Trophy } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

const ICONS = ['🏆', '📈', '⚡', '🔬', '🐳']
const COLORS = ['#00d4ff', '#a855f7', '#06ffa5', '#f97316', '#ec4899']

export default function Achievements() {
    const [ref, visible] = useScrollReveal()

    return (
        <section id="achievements" className="section ds-section">
            <div className="ds-grid-overlay" aria-hidden="true" />
            <div className="section-container">
                <div className="section-header">
                    <span className="ds-label"><Trophy size={12} /> Milestones</span>
                    <h2 className="ds-title">Achievements</h2>
                    <p className="section-subtitle">Key highlights from my AI/ML journey</p>
                </div>

                <div ref={ref} className="achievements-3d">
                    {achievements.map((ach, i) => (
                        <div
                            key={i}
                            className={`ach-card ${visible ? 'reveal' : ''}`}
                            style={{ '--ach-color': COLORS[i % COLORS.length], animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="ach-glow" aria-hidden="true" />
                            <div className="ach-num">{String(i + 1).padStart(2, '0')}</div>
                            <div className="ach-icon-wrap">{ICONS[i % ICONS.length]}</div>
                            <p className="ach-text">{ach}</p>
                            <div className="ach-accent-line" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
