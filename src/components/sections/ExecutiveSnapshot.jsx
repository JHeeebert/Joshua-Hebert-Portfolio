import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './ExecutiveSnapshot.css'
import { snapshotCards } from '../../data/snapshot'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

/* Distinct, meaningful line icons — one per capability */
const ICONS = {
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="12" r="2" />
      <path d="M7 6.8 17 11.2 M7 17.2 17 12.8" />
    </svg>
  ),
  visibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M2 12l10 5 10-5" /><path d="M2 16l10 5 10-5" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 13.7 10.3 20.5 12 13.7 13.7 12 20.5 10.3 13.7 3.5 12 10.3 10.3Z" />
    </svg>
  ),
}

function SnapshotCard({ icon, title, body }) {
  if (!title || !body) return null
  return (
    <motion.article className="snapshot-card" variants={fadeUp}>
      {icon && ICONS[icon] && (
        <div className="snapshot-card__icon" aria-hidden="true">{ICONS[icon]}</div>
      )}
      <h3 className="snapshot-card__title heading-3">{title}</h3>
      <p className="snapshot-card__body body-md">{body}</p>
    </motion.article>
  )
}

export default function ExecutiveSnapshot() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const cards = snapshotCards ?? []
  const animate = inView ? 'show' : 'hidden'

  return (
    <section ref={ref} id="snapshot" className="snapshot section section--white" aria-label="Executive snapshot">
      <div className="container">

        <motion.div initial="hidden" animate={animate} variants={fadeUpFast}>
          <p className="section-label">What I do</p>
          <h2 className="snapshot__heading heading-1">
            Delivery leadership<br />across the full stack of execution.
          </h2>
        </motion.div>

        <motion.div
          className="snapshot__grid"
          initial="hidden"
          animate={animate}
          variants={staggerContainer}
        >
          {cards.length > 0
            ? cards.map((card, i) => <SnapshotCard key={i} {...card} />)
            : null}
        </motion.div>

      </div>
    </section>
  )
}
