import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import './Hero.css'

/* ── Count-up number — animates 0 → value when scrolled into view ─ */
function CountUp({ value, prefix = '', suffix = '', duration = 1200 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return

    // Respect reduced-motion: show the final value instantly, no animation.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }

    let start = null
    let raf
    const tick = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref}>{prefix}{n}{suffix}</span>
}

/* ── Signal flow visualization ──────────────────────────────────
   Inline SVG: scattered inputs → routing engine → clear outputs.
   Purely decorative; hidden on mobile via CSS.
──────────────────────────────────────────────────────────────── */
function SignalFlowDiagram() {
  const cx = 240
  const cy = 278

  const sources = [
    { x: 48,  y: 110, label: 'Jira'       },
    { x: 36,  y: 196, label: 'Teams'      },
    { x: 52,  y: 278, label: 'Confluence' },
    { x: 38,  y: 360, label: 'Calendar'   },
    { x: 50,  y: 442, label: 'Email'      },
  ]

  const outputs = [
    { x: 432, y: 172, label: 'Engineering'  },
    { x: 442, y: 278, label: 'Leadership'   },
    { x: 432, y: 384, label: 'Stakeholders' },
  ]

  return (
    <svg
      className="hero__signal-svg"
      viewBox="0 0 480 556"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="sfHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0D9488" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Center atmospheric halo */}
      <ellipse cx={cx} cy={cy} rx="96" ry="86" fill="url(#sfHalo)" />

      {/* Input lines — dashed, low opacity */}
      {sources.map((s, i) => (
        <line
          key={`si${i}`}
          x1={s.x + 11} y1={s.y}
          x2={cx - 46}  y2={cy}
          stroke="#0D9488"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray="5 8"
        />
      ))}

      {/* Output lines — solid, brighter */}
      {outputs.map((o, i) => (
        <line
          key={`oi${i}`}
          x1={cx + 46}  y1={cy}
          x2={o.x - 14} y2={o.y}
          stroke="#14B8A6"
          strokeWidth="2"
          strokeOpacity="0.7"
        />
      ))}

      {/* Source nodes */}
      {sources.map((s, i) => (
        <g key={`sn${i}`}>
          <circle cx={s.x} cy={s.y} r="7"
            fill="#141920" stroke="#2E3D4D" strokeWidth="1.5" />
          <circle cx={s.x} cy={s.y} r="3"
            fill="#14B8A6" fillOpacity="1" />
          <text x={s.x + 15} y={s.y + 4}
            fill="#8896A8" fontSize="11"
            fontFamily="Inter, -apple-system, sans-serif" fontWeight="500">
            {s.label}
          </text>
        </g>
      ))}

      {/* Center routing engine box */}
      <g className="sf-center">
        <rect x={cx - 46} y={cy - 34} width="92" height="68" rx="7"
          fill="#141920" stroke="#0D9488" strokeWidth="1.5" />
        <text x={cx} y={cy - 12} textAnchor="middle"
          fill="#14B8A6" fontSize="8.5"
          fontFamily="Inter, -apple-system, sans-serif"
          fontWeight="700" letterSpacing="1.8">
          SIGNAL
        </text>
        <text x={cx} y={cy + 2} textAnchor="middle"
          fill="#14B8A6" fontSize="8.5"
          fontFamily="Inter, -apple-system, sans-serif"
          fontWeight="700" letterSpacing="1.8">
          ROUTING
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle"
          fill="#8896A8" fontSize="8"
          fontFamily="Inter, -apple-system, sans-serif">
          Delivery Engine
        </text>
      </g>

      {/* Output nodes — ring + dot */}
      {outputs.map((o, i) => (
        <g key={`on${i}`}>
          <circle cx={o.x} cy={o.y} r="10"
            fill="#0D9488" fillOpacity="0.12"
            stroke="#14B8A6" strokeWidth="1.5" strokeOpacity="0.55" />
          <circle cx={o.x} cy={o.y} r="4"
            fill="#14B8A6" fillOpacity="0.75" />
          <text x={o.x - 18} y={o.y + 4} textAnchor="end"
            fill="#8896A8" fontSize="11"
            fontFamily="Inter, -apple-system, sans-serif" fontWeight="500">
            {o.label}
          </text>
        </g>
      ))}

      {/* Bottom caption */}
      <text x={cx} y={524} textAnchor="middle"
        fill="#8896A8" fontSize="9"
        fontFamily="Inter, -apple-system, sans-serif"
        letterSpacing="2.5" opacity="0.45">
        EXECUTION VISIBILITY
      </text>
    </svg>
  )
}

/* ── Hero section ─────────────────────────────────────────────── */

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero section--dark" aria-label="Introduction">

      {/* Background: grid + atmospheric glows */}
      <div className="hero__grid-bg"  aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__layout">

          {/* Left: copy */}
          <div className="hero__content">

            <p className="hero__name animate-fade-up animate-fade-up--delay-1">
              Joshua Hebert
            </p>

            <p className="hero__eyebrow animate-fade-up animate-fade-up--delay-1">
              Technical Delivery Manager&nbsp;&nbsp;·&nbsp;&nbsp;TPM&nbsp;&nbsp;·&nbsp;&nbsp;Delivery Systems
            </p>

            <h1 className="hero__headline display-1 animate-fade-up animate-fade-up--delay-2">
              Turning fragmented <span className="hero__headline-accent">technical work</span> into clear execution.
            </h1>

            <p className="hero__voice animate-fade-up animate-fade-up--delay-2">
              I don't just manage delivery — I <em>build the systems</em> that make it clear.
            </p>

            <p className="hero__sub body-lg animate-fade-up animate-fade-up--delay-3">
              I help product, engineering, and leadership teams move through ambiguity
              with clearer visibility, better decision flow, and lightweight operating
              systems—across UI, API, platform, analytics, and enterprise delivery environments.
            </p>

            <div className="hero__ctas animate-fade-up animate-fade-up--delay-4">
              <button
                className="btn btn--primary"
                onClick={() => scrollTo('case-studies')}
              >
                View Case Studies
              </button>

              <span className="hero__cta-divider" aria-hidden="true" />

              <a
                href="/assets/Joshua_Hebert_Resume.pdf"
                className="btn btn--outline-light"
                download
              >
                Download Resume
              </a>
              <a
                href="/assets/Joshua_Hebert_Portfolio_Brief.pdf"
                className="btn btn--outline-light"
                download
              >
                Portfolio Brief
              </a>
              <a
                href="https://www.linkedin.com/in/jheeebert/"
                className="btn btn--outline-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            {/* Proof band — real, verifiable signals of built work */}
            <dl className="hero__proof animate-fade-up animate-fade-up--delay-4" aria-label="Delivery systems built">
              <div className="hero__proof-item">
                <dt className="hero__proof-num"><CountUp value={42} suffix="+" /></dt>
                <dd className="hero__proof-label">delivery scripts on live Jira data</dd>
              </div>
              <div className="hero__proof-item">
                <dt className="hero__proof-num"><CountUp value={10} suffix="+" /></dt>
                <dd className="hero__proof-label">AI skills adopted by other teams</dd>
              </div>
              <div className="hero__proof-item">
                <dt className="hero__proof-num"><CountUp value={2} prefix="<" suffix=" min" /></dt>
                <dd className="hero__proof-label">full sprint picture, one command</dd>
              </div>
              <div className="hero__proof-item">
                <dt className="hero__proof-num"><CountUp value={5} /></dt>
                <dd className="hero__proof-label">delivery categories synthesized</dd>
              </div>
            </dl>
          </div>

          {/* Right: signal flow diagram */}
          <div className="hero__visual animate-fade-up animate-fade-up--delay-3" aria-hidden="true">
            <SignalFlowDiagram />
          </div>

        </div>

        {/* Scroll cue */}
        <div className="hero__scroll-cue" aria-hidden="true">
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  )
}
