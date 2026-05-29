import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Skills.css'
import { skillGroups } from '../../data/skills'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

function SkillGroup({ category, items }) {
  if (!category || !Array.isArray(items) || items.length === 0) return null
  return (
    <motion.div className="skill-group" variants={fadeUp}>
      <h3 className="skill-group__category label">{category}</h3>
      <ul className="skill-group__list" role="list">
        {items.map((skill, i) => (
          <li key={i} className="skill-group__item">{skill}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const groups = skillGroups ?? []
  const animate = inView ? 'show' : 'hidden'

  return (
    <section ref={ref} id="skills" className="skills section section--white" aria-label="Skills and systems">
      <div className="container">

        <motion.div initial="hidden" animate={animate} variants={fadeUpFast}>
          <p className="section-label">Capabilities</p>
          <h2 className="skills__heading heading-1">
            Skills &amp; systems.
          </h2>
        </motion.div>

        <motion.div
          className="skills__grid"
          initial="hidden"
          animate={animate}
          variants={staggerContainer}
        >
          {groups.length > 0
            ? groups.map((group, i) => <SkillGroup key={i} {...group} />)
            : null}
        </motion.div>

      </div>
    </section>
  )
}
