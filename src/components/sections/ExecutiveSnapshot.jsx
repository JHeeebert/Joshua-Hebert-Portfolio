import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './ExecutiveSnapshot.css'
import { snapshotCards } from '../../data/snapshot'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

function SnapshotCard({ icon, title, body }) {
  if (!title || !body) return null
  return (
    <motion.article className="snapshot-card" variants={fadeUp}>
      {icon && (
        <div className="snapshot-card__icon" aria-hidden="true">{icon}</div>
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
