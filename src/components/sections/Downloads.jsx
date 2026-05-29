import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Downloads.css'
import { fadeUp, fadeUpFast, staggerContainer } from '../../utils/motionVariants'

const DOWNLOADS = [
  {
    title: 'Resume',
    description: 'Senior TPM / Technical Delivery Manager resume. Covers cross-functional delivery, program leadership, and delivery systems experience.',
    file: '/assets/Joshua_Hebert_Resume.pdf',
    label: 'Download Resume',
  },
  {
    title: 'Portfolio Brief',
    description: 'A concise delivery systems portfolio brief — case studies, operating model, and delivery philosophy in a single document.',
    file: '/assets/Joshua_Hebert_Portfolio_Brief.pdf',
    label: 'Download Portfolio Brief',
  },
]

function DownloadCard({ title, description, file, label }) {
  if (!file || !label) return null

  return (
    <motion.div className="download-card" variants={fadeUp}>
      <div className="download-card__content">
        <h3 className="download-card__title heading-3">{title}</h3>
        {description && (
          <p className="download-card__desc body-md">{description}</p>
        )}
      </div>
      <a
        href={file}
        className="btn btn--primary download-card__btn"
        download
        aria-label={`${label} (PDF)`}
        onError={(e) => {
          e.currentTarget.setAttribute('aria-disabled', 'true')
          e.currentTarget.textContent = 'File unavailable'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {label}
      </a>
    </motion.div>
  )
}

export default function Downloads() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const animate = inView ? 'show' : 'hidden'

  return (
    <section ref={ref} id="downloads" className="downloads section section--light" aria-label="Resume and portfolio brief downloads">
      <div className="container">

        <motion.div initial="hidden" animate={animate} variants={fadeUpFast}>
          <p className="section-label">Documents</p>
          <h2 className="downloads__heading heading-1">
            Resume &amp; Portfolio Brief.
          </h2>
        </motion.div>

        <motion.div
          className="downloads__grid"
          initial="hidden"
          animate={animate}
          variants={staggerContainer}
        >
          {DOWNLOADS.map((item, i) => (
            <DownloadCard key={i} {...item} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
