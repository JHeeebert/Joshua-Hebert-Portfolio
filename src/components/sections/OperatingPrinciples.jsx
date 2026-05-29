import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './OperatingPrinciples.css'
import { principles } from '../../data/principles'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

function PrincipleItem({ number, text }) {
  if (!text) return null
  return (
    <motion.li className="principle" variants={fadeUp}>
      <span className="principle__number" aria-hidden="true">{number}</span>
      <p className="principle__text body-lg">{text}</p>
    </motion.li>
  )
}

export default function OperatingPrinciples() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const items = principles ?? []
  const animate = inView ? 'show' : 'hidden'

  return (
    <section ref={ref} id="principles" className="principles section section--dark" aria-label="Operating principles">
      <div className="container">

        <motion.div initial="hidden" animate={animate} variants={fadeUpFast}>
          <p className="section-label">How I work</p>
          <h2 className="principles__heading heading-1">
            Operating principles.
          </h2>
        </motion.div>

        <motion.ul
          className="principles__list"
          role="list"
          initial="hidden"
          animate={animate}
          variants={staggerContainer}
        >
          {items.length > 0
            ? items.map((text, i) => (
                <PrincipleItem
                  key={i}
                  number={String(i + 1).padStart(2, '0')}
                  text={text}
                />
              ))
            : null}
        </motion.ul>

      </div>
    </section>
  )
}
