import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'
import { fadeUp, fadeUpFast } from '../../utils/motionVariants'

const FORM_INIT = { name: '', email: '', message: '' }

/* ── Contact form endpoint ────────────────────────────────────────
   Real submission via Formspree (free, no backend required).
   SETUP (one time, ~3 min):
     1. Sign up at https://formspree.io with jheeebertwd@gmail.com
     2. New form → copy its endpoint, e.g. https://formspree.io/f/abcdwxyz
     3. Replace YOUR_FORM_ID below with that ID.
   If left unconfigured, the form safely falls back to opening the
   visitor's email client instead of silently pretending to send.
─────────────────────────────────────────────────────────────────── */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojbylkq'
const CONTACT_EMAIL      = 'jheeebertwd@gmail.com'

function validate(fields) {
  const errors = {}
  if (!fields.name.trim())                                          errors.name    = 'Name is required.'
  if (!fields.email.trim())                                         errors.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))       errors.email   = 'Enter a valid email address.'
  if (!fields.message.trim())                                       errors.message = 'Message is required.'
  else if (fields.message.trim().length < 20)                       errors.message = 'Message should be at least 20 characters.'
  return errors
}

export default function Contact() {
  const [fields, setFields]   = useState(FORM_INIT)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [touched, setTouched] = useState({})

  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const animate = inView ? 'show' : 'hidden'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const fieldErrors = validate(fields)
    if (fieldErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fieldErrors = validate(fields)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setTouched({ name: true, email: true, message: true })
      return
    }

    // Fallback: if the endpoint hasn't been configured yet, open the
    // visitor's email client instead of faking a successful send.
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${fields.name}`)
      const body    = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fields.name,
          email:   fields.email,
          message: fields.message,
          _subject: `Portfolio inquiry from ${fields.name}`,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setFields(FORM_INIT)
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="contact" className="contact section section--white" aria-label="Contact">
      <div className="container">
        <div className="contact__layout">

          {/* Left: info */}
          <motion.div
            className="contact__info"
            initial="hidden"
            animate={animate}
            variants={fadeUpFast}
          >
            <p className="section-label">Get in touch</p>
            <h2 className="contact__heading heading-1">
              Let's talk delivery.
            </h2>
            <p className="contact__sub body-lg">
              Open to senior Technical Delivery, TPM, Engineering Operations,
              and Delivery Systems roles — remote or Charlotte, NC.
            </p>

            <div className="contact__links">
              <a
                href="https://www.linkedin.com/in/jheeebert/"
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__link-label">LinkedIn</span>
                <span className="contact__link-value">in/jheeebert ↗</span>
              </a>
              <a href="mailto:jheeebertwd@gmail.com" className="contact__link">
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">jheeebertwd@gmail.com</span>
              </a>
              <div className="contact__link contact__link--static">
                <span className="contact__link-label">Location</span>
                <span className="contact__link-value">Charlotte, NC · Remote</span>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="contact__form-wrap"
            initial="hidden"
            animate={animate}
            variants={fadeUp}
          >
            {status === 'success' ? (
              <div className="contact__success" role="alert">
                <div className="contact__success-icon" aria-hidden="true">✓</div>
                <h3 className="heading-3">Message sent.</h3>
                <p className="body-md">Thanks for reaching out — I'll be in touch shortly.</p>
                <button
                  className="btn btn--outline-dark"
                  onClick={() => setStatus('idle')}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Your name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error" role="alert">{errors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="you@company.com"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error" role="alert">{errors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="What are you working on? What kind of role or conversation are you looking for?"
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="form-error" role="alert">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="form-error form-error--submit" role="alert">
                    Something went wrong. Try emailing directly at{' '}
                    <a href="mailto:jheeebertwd@gmail.com" className="form-error__link">
                      jheeebertwd@gmail.com
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === 'sending'}
                  aria-label={status === 'sending' ? 'Sending message...' : 'Send message'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact__spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
