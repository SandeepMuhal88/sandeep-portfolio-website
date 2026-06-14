import React from 'react'
import { experience } from '../../data/resumeData'
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

export default function Experience() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="experience" className="section ds-section">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div className="section-header">
          <span className="ds-label"><Briefcase size={12} /> Career</span>
          <h2 className="ds-title">Experience</h2>
          <p className="section-subtitle">
            Professional experience building real-world AI & Data Science solutions
          </p>
        </div>

        <div ref={ref} className={`exp-timeline ${visible ? 'reveal' : ''}`}>
          {experience.map((job, idx) => (
            <div key={idx} className="exp-card-wrapper">
              {/* Timeline line + dot */}
              <div className="exp-timeline-track" aria-hidden="true">
                <div className="exp-timeline-dot">
                  {job.current && <div className="exp-timeline-pulse" />}
                </div>
                {idx < experience.length - 1 && <div className="exp-timeline-line" />}
              </div>

              {/* Card */}
              <div className="exp-card">
                {/* Glow border */}
                <div className="exp-card-glow" aria-hidden="true" />

                <div className="exp-card-inner">
                  {/* Header row */}
                  <div className="exp-header">
                    <div className="exp-logo-wrap">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="exp-logo"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </div>

                    <div className="exp-title-block">
                      <div className="exp-role-row">
                        <h3 className="exp-role">{job.role}</h3>
                        {job.current && (
                          <span className="live-badge">
                            <span className="live-dot" />
                            Currently Working
                          </span>
                        )}
                      </div>
                      <a
                        href={job.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-company-link"
                      >
                        {job.company}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Meta chips */}
                  <div className="exp-meta-row">
                    <div className="edu-chip"><Calendar size={13} />{job.duration}</div>
                    <div className="edu-chip"><MapPin size={13} />{job.location}</div>
                    <div className="edu-chip exp-type-chip">{job.type}</div>
                  </div>

                  {/* Highlights */}
                  <ul className="exp-highlights">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="exp-highlight-item">
                        <CheckCircle2 size={14} className="exp-check-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="exp-tech-row">
                    {job.tech.map((t) => (
                      <span key={t} className="exp-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
