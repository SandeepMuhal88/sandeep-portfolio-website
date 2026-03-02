import React from 'react'
import { education } from '../../data/resumeData'
import { GraduationCap, Calendar, MapPin, BookOpen, Star } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

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
                        {/* Animated border gradient */}
                        <div className="edu-border-glow" aria-hidden="true" />

                        <div className="edu-inner">
                            <div className="edu-top-row">
                                <div className="edu-icon-3d">
                                    <GraduationCap size={26} />
                                </div>
                                <div>
                                    <h3 className="edu-degree-3d">{education.degree}</h3>
                                    <p className="edu-uni-3d">{education.university}</p>
                                </div>
                            </div>

                            <div className="edu-meta-row">
                                <div className="edu-chip"><Calendar size={13} />{education.duration}</div>
                                <div className="edu-chip"><MapPin size={13} />{education.location}</div>
                                <div className="edu-chip edu-chip--gpa"><Star size={13} />CGPA: <b>{education.cgpa}</b></div>
                            </div>

                            {/* Hexagonal coursework */}
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
