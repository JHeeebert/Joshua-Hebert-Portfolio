import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './CaseStudies.css'
import { caseStudies } from '../../data/caseStudies'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

function CaseStudyCard({ number, label, title, problem, approach, shows, stack, image, isOpen, onToggle, onExpand }) {
  if (!title) return null

  return (
    <motion.div variants={fadeUp}>
      <article
        className={`cs-card ${isOpen ? 'cs-card--open' : ''}`}
        aria-expanded={isOpen}
      >
        <button
          className="cs-card__header"
          onClick={onToggle}
          aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
        >
          <div className="cs-card__meta">
            <span className="cs-card__number">{number}</span>
            {label && <span className="cs-card__label">{label}</span>}
          </div>
          <h3 className="cs-card__title heading-2">{title}</h3>
          <div className="cs-card__chevron" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        <div className="cs-card__body">
          <div className="cs-card__content">
            {problem && (
              <div className="cs-card__block">
                <p className="cs-card__block-label">The Problem</p>
                <p className="cs-card__block-text body-md">{problem}</p>
              </div>
            )}
            {approach && (
              <div className="cs-card__block">
                <p className="cs-card__block-label">Approach</p>
                <p className="cs-card__block-text body-md">{approach}</p>
              </div>
            )}
            {shows && (
              <div className="cs-card__block cs-card__block--shows">
                <p className="cs-card__block-label">What this shows</p>
                <p className="cs-card__block-text body-md">{shows}</p>
              </div>
            )}
            {image && (
              <div className="cs-card__block">
                <button
                  type="button"
                  className="cs-card__image-btn"
                  onClick={() => onExpand(image, `${title} — system architecture`)}
                  aria-label={`Enlarge diagram: ${title}`}
                >
                  <img className="cs-card__image" src={image} alt={`${title} — system architecture`} loading="lazy" />
                  <span className="cs-card__image-hint" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    Click to enlarge
                  </span>
                </button>
              </div>
            )}
            {Array.isArray(stack) && stack.length > 0 && (
              <ul className="cs-card__stack" aria-label="What's under the hood">
                {stack.map((tag, i) => (
                  <li key={i} className="cs-card__tag">{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [openIndex, setOpenIndex] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const studies = caseStudies ?? []
  const animate = inView ? 'show' : 'hidden'

  const handleToggle = (i) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

  const openLightbox = (src, alt) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  // Close on Escape; lock body scroll while open
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  return (
    <section ref={ref} id="case-studies" className="case-studies section section--light" aria-label="Featured work">
      <div className="container">

        <motion.div initial="hidden" animate={animate} variants={fadeUpFast}>
          <p className="section-label">Featured Work</p>
          <h2 className="case-studies__heading heading-1">
            Delivery systems in practice.
          </h2>
          <p className="case-studies__sub body-lg">
            How I think about delivery problems — and how that thinking
            becomes working infrastructure.
          </p>
        </motion.div>

        <motion.div
          className="case-studies__list"
          initial="hidden"
          animate={animate}
          variants={staggerContainer}
        >
          {studies.length > 0
            ? studies.map((study, i) => (
                <CaseStudyCard
                  key={i}
                  number={`0${i + 1}`}
                  {...study}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                  onExpand={openLightbox}
                />
              ))
            : null}
        </motion.div>

      </div>

      {lightbox && (
        <div
          className="cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
        >
          <button className="cs-lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <img
            className="cs-lightbox__img"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
