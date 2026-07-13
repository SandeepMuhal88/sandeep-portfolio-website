import React from 'react'
import { education } from '../../data/resumeData'
import { GraduationCap, Calendar, MapPin, BookOpen, Star } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

// CGPA arc: circumference of r=41 = 2*pi*41 ≈ 257.6
// 8.88/10 = 88.8% → offset = 257.6 * (1 - 0.888) = 29.4
const CIRC = 257.6
const CGPA_PCT = 8.88/ 10
const CGPA_OFFSET = CIRC * (1 - CGPA_PCT)

export default function Education() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="education" className="section ds-section ds-section--dark">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div className="section-header">
          <span className="ds-label"><GraduationCap size={12} /> Academic</span>
          <h2 className="ds-title">Education</h2>
          <p className="section-subtitle">Building a strong theoretical foundation in Computer Science</p>
        </div>

        <div ref={ref} className={`edu-3d-wrapper ${visible ? 'reveal' : ''}`}>
          <div className="edu-card-3d">
            {/* Animated conic rotating border */}
            <div className="edu-border-glow" aria-hidden="true" />

            <div className="edu-inner">
              <div className="edu-top-row">
                <div className="edu-icon-3d">
                  <GraduationCap size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h3 className="edu-degree-3d">{education.degree}</h3>
                    <span className="live-badge">
                      <span className="live-dot" />
                      Currently Pursuing
                    </span>
                  </div>
                  <p className="edu-uni-3d">{education.university}</p>
                </div>
              </div>

              {/* Meta chips */}
              <div className="edu-meta-row">
                <div className="edu-chip"><Calendar size={13} />{education.duration}</div>
                <div className="edu-chip"><MapPin size={13} />{education.location}</div>
              </div>

              {/* CGPA arc + info */}
              <div className="edu-cgpa-row">
                <div className="edu-cgpa-ring">
                  <svg className="cgpa-svg" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="cgpa-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle className="cgpa-bg" cx="50" cy="50" r="41" />
                    <circle
                      className="cgpa-fill"
                      cx="50" cy="50" r="41"
                      strokeDasharray={CIRC}
                      strokeDashoffset={visible ? CGPA_OFFSET : CIRC}
                      style={{
                        strokeDashoffset: visible ? CGPA_OFFSET : CIRC,
                        transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.5s',
                      }}
                    />
                    <text
                      x="50" y="50"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#2dd4bf"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '14px',
                        fontWeight: '900',
                        transform: 'rotate(90deg)',
                        transformOrigin: '50px 50px',
                      }}
                    >
                      {education.cgpa}
                    </text>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    CGPA Score
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: '900', color: 'var(--electric)', textShadow: '0 0 20px var(--electric-g)' }}>
                    {education.cgpa}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>out of 10.0</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                    {[1,2,3,4].map(i => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }} />
                    ))}
                    <Star size={14} fill="none" color="#f59e0b" />
                  </div>
                </div>
              </div>

              {/* Coursework */}
              <div className="edu-courses-header"><BookOpen size={13} /> Relevant Coursework</div>
              <div className="edu-hex-grid">
                {education.courses.map(c => (
                  <div key={c} className="edu-hex">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
