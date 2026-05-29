import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './CaseStudies.css'
import { caseStudies } from '../../data/caseStudies'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

function CaseStudyCard({ number, label, title, problem, approach, shows, stack, image, isOpen, onToggle }) {
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
                <img className="cs-card__image" src={image} alt={`${title} — system artifact`} loading="lazy" />
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const studies = caseStudies ?? []
  const animate = inView ? 'show' : 'hidden'

  const handleToggle = (i) => {
    setOpenIndex(prev => prev === i ? null : i)
  }

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
                />
              ))
            : null}
        </motion.div>

      </div>
    </section>
  )
}
