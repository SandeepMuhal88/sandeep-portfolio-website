import React, { useState } from 'react'
import { personalInfo } from '../../data/resumeData'
import { Mail, Phone, MapPin, Github, Linkedin, Send, Youtube, Twitter, Instagram, FileText, MessageSquare } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useAnimations.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [headRef, headVis] = useScrollReveal()
  const [bodyRef, bodyVis] = useScrollReveal()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`
    setTimeout(() => setStatus('sent'), 800)
  }

  const SOCIALS = [
    { icon: <Github size={16} />,    href: personalInfo.github,    label: 'GitHub' },
    { icon: <Linkedin size={16} />,  href: personalInfo.linkedin,  label: 'LinkedIn' },
    { icon: <Instagram size={16} />, href: personalInfo.instagram, label: 'Instagram' },
    { icon: <Youtube size={16} />,   href: personalInfo.youtube,   label: 'YouTube' },
    { icon: <Twitter size={16} />,   href: personalInfo.twitter,   label: 'X (Twitter)' },
    { icon: <FileText size={16} />,  href: personalInfo.resume,    label: 'Resume' },
  ]

  return (
    <section id="contact" className="section ds-section ds-section--dark">
      <div className="ds-grid-overlay" aria-hidden="true" />
      <div className="section-container">
        <div ref={headRef} className={`section-header ${headVis ? 'reveal' : ''}`}>
          <span className="ds-label"><MessageSquare size={12} /> Let's Talk</span>
          <h2 className="ds-title">Get In Touch</h2>
          <p className="section-subtitle">Open to collaborations, opportunities, and interesting AI projects</p>
        </div>

        <div ref={bodyRef} className={`contact-grid-3d ${bodyVis ? 'reveal' : ''}`}>
          {/* Info panel */}
          <div className="contact-info-3d">
            <div className="contact-info-card">
              {/* Avatar header */}
              <div className="contact-avatar">
                <img
                  src="images/profile_pna.jpg"
                  alt="Sandeep Muhal"
                  onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, var(--electric), var(--violet-b))'; e.target.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-family:Space Grotesk,sans-serif;font-size:1.8rem;font-weight:900;color:#020617">SM</span>' }}
                />
              </div>
              <div className="contact-avatar-name">{personalInfo.name}</div>
              <div className="contact-avatar-title">{personalInfo.title}</div>

              <h3 className="contact-info-title">Contact Details</h3>
              <div className="contact-info-list">
                {[
                  { icon: <Mail size={15} />,   val: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                  { icon: <Phone size={15} />,   val: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
                  { icon: <MapPin size={15} />,  val: personalInfo.location, href: null },
                ].map((item, i) => (
                  <div key={i} className="contact-row">
                    <div className="contact-row-icon">{item.icon}</div>
                    {item.href
                      ? <a href={item.href}>{item.val}</a>
                      : <span>{item.val}</span>}
                  </div>
                ))}
              </div>

              <div className="contact-social-title">Find Me On</div>
              <div className="contact-socials-3d">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-orb-sm"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-3d">
            <h3 className="contact-form-title">Send a Message</h3>
            <form onSubmit={onSubmit} className="ds-form" noValidate>
              <div className="ds-form-row">
                <div className="ds-form-group">
                  <label htmlFor="c-name" className="ds-label-text">Name</label>
                  <input
                    id="c-name" name="name" type="text" className="ds-input"
                    placeholder="John Doe"
                    value={form.name} onChange={onChange} required
                  />
                </div>
                <div className="ds-form-group">
                  <label htmlFor="c-email" className="ds-label-text">Email</label>
                  <input
                    id="c-email" name="email" type="email" className="ds-input"
                    placeholder="john@example.com"
                    value={form.email} onChange={onChange} required
                  />
                </div>
              </div>
              <div className="ds-form-group">
                <label htmlFor="c-subject" className="ds-label-text">Subject</label>
                <input
                  id="c-subject" name="subject" type="text" className="ds-input"
                  placeholder="Project Inquiry / Collaboration"
                  value={form.subject} onChange={onChange} required
                />
              </div>
              <div className="ds-form-group">
                <label htmlFor="c-message" className="ds-label-text">Message</label>
                <textarea
                  id="c-message" name="message"
                  className="ds-input ds-textarea"
                  placeholder="Tell me about your project or idea…"
                  rows={6}
                  value={form.message} onChange={onChange} required
                />
              </div>
              <button
                type="submit"
                className="ds-submit-btn"
                disabled={status === 'sending'}
                id="contact-submit-btn"
              >
                {status === 'sent'
                  ? '✓ Ready to send!'
                  : status === 'sending'
                    ? 'Opening…'
                    : <><Send size={15} /> Send Message</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
