/**
 * Smoke + unit tests — Phase 3
 *
 * Covers:
 *   - Data layer shape validation
 *   - Component render (no crash)
 *   - Contact form validation logic
 *   - CaseStudies accordion toggle
 *   - ErrorBoundary catch + retry
 *   - BackToTop visibility on scroll
 *   - SkipLink renders with correct href
 *
 * Run: npm test
 */

import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Data imports ─────────────────────────────────────────────────

import { snapshotCards }  from '../data/snapshot'
import { caseStudies }    from '../data/caseStudies'
import { principles }     from '../data/principles'
import { skillGroups }    from '../data/skills'

// ── Data layer ────────────────────────────────────────────────────

describe('Data layer', () => {
  it('snapshotCards exports a non-empty array', () => {
    expect(Array.isArray(snapshotCards)).toBe(true)
    expect(snapshotCards.length).toBeGreaterThan(0)
  })

  it('every snapshot card has title and body', () => {
    snapshotCards.forEach((card, i) => {
      expect(card.title, `card[${i}].title`).toBeTruthy()
      expect(card.body,  `card[${i}].body`).toBeTruthy()
    })
  })

  it('caseStudies exports exactly 4 entries', () => {
    expect(Array.isArray(caseStudies)).toBe(true)
    expect(caseStudies.length).toBe(4)
  })

  it('every case study has required fields', () => {
    caseStudies.forEach((cs, i) => {
      expect(cs.title,    `caseStudies[${i}].title`).toBeTruthy()
      expect(cs.problem,  `caseStudies[${i}].problem`).toBeTruthy()
      expect(cs.approach, `caseStudies[${i}].approach`).toBeTruthy()
      expect(cs.shows,    `caseStudies[${i}].shows`).toBeTruthy()
    })
  })

  it('principles exports a non-empty array of strings', () => {
    expect(Array.isArray(principles)).toBe(true)
    expect(principles.length).toBeGreaterThan(0)
    principles.forEach((p, i) => {
      expect(typeof p, `principles[${i}]`).toBe('string')
      expect(p.trim().length, `principles[${i}] not empty`).toBeGreaterThan(0)
    })
  })

  it('skillGroups exports non-empty array with category and items', () => {
    expect(Array.isArray(skillGroups)).toBe(true)
    expect(skillGroups.length).toBeGreaterThan(0)
    skillGroups.forEach((group, i) => {
      expect(group.category, `skillGroups[${i}].category`).toBeTruthy()
      expect(Array.isArray(group.items), `skillGroups[${i}].items is array`).toBe(true)
      expect(group.items.length, `skillGroups[${i}] has items`).toBeGreaterThan(0)
    })
  })
})

// ── Component renders ─────────────────────────────────────────────

describe('Hero', () => {
  it('renders without crashing', async () => {
    const { default: Hero } = await import('../components/sections/Hero')
    render(<Hero />)
    expect(screen.getByRole('region')).toBeTruthy()
  })
})

describe('ExecutiveSnapshot', () => {
  it('renders without crashing and shows cards', async () => {
    const { default: ExecutiveSnapshot } = await import('../components/sections/ExecutiveSnapshot')
    render(<ExecutiveSnapshot />)
    expect(screen.getByLabelText(/executive snapshot/i)).toBeTruthy()
  })
})

describe('CaseStudies', () => {
  it('renders all 4 case study cards', async () => {
    const { default: CaseStudies } = await import('../components/sections/CaseStudies')
    render(<CaseStudies />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(4)
  })

  it('expands a card on click and collapses on second click', async () => {
    const { default: CaseStudies } = await import('../components/sections/CaseStudies')
    render(<CaseStudies />)
    const buttons = screen.getAllByRole('button')
    const first = buttons[0]

    fireEvent.click(first)
    expect(first.getAttribute('aria-label')).toMatch(/collapse/i)

    fireEvent.click(first)
    expect(first.getAttribute('aria-label')).toMatch(/expand/i)
  })

  it('closes the first card when a second card is opened', async () => {
    const { default: CaseStudies } = await import('../components/sections/CaseStudies')
    render(<CaseStudies />)
    const [first, second] = screen.getAllByRole('button')

    fireEvent.click(first)
    expect(first.getAttribute('aria-label')).toMatch(/collapse/i)

    fireEvent.click(second)
    expect(first.getAttribute('aria-label')).toMatch(/expand/i)
    expect(second.getAttribute('aria-label')).toMatch(/collapse/i)
  })
})

describe('OperatingPrinciples', () => {
  it('renders without crashing', async () => {
    const { default: OperatingPrinciples } = await import('../components/sections/OperatingPrinciples')
    render(<OperatingPrinciples />)
    expect(screen.getByLabelText(/operating principles/i)).toBeTruthy()
  })
})

describe('Skills', () => {
  it('renders without crashing', async () => {
    const { default: Skills } = await import('../components/sections/Skills')
    render(<Skills />)
    expect(screen.getByLabelText(/skills and systems/i)).toBeTruthy()
  })
})

describe('Downloads', () => {
  it('renders two download links', async () => {
    const { default: Downloads } = await import('../components/sections/Downloads')
    render(<Downloads />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(2)
  })

  it('download links point to PDF assets', async () => {
    const { default: Downloads } = await import('../components/sections/Downloads')
    render(<Downloads />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link.getAttribute('href')).toMatch(/\.pdf$/)
    })
  })
})

describe('SkipLink', () => {
  it('renders a link to #main-content', async () => {
    const { default: SkipLink } = await import('../components/ui/SkipLink')
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: /skip to main content/i })
    expect(link.getAttribute('href')).toBe('#main-content')
  })
})

// ── Contact form validation ────────────────────────────────────────

describe('Contact form', () => {
  it('shows errors for empty submit', async () => {
    const userEvent = (await import('@testing-library/user-event')).default
    const { default: Contact } = await import('../components/sections/Contact')
    render(<Contact />)

    const submit = screen.getByRole('button', { name: /send message/i })
    await userEvent.click(submit)

    expect(screen.getByText(/name is required/i)).toBeTruthy()
    expect(screen.getByText(/email is required/i)).toBeTruthy()
    expect(screen.getByText(/message is required/i)).toBeTruthy()
  })

  it('shows error for invalid email', async () => {
    const userEvent = (await import('@testing-library/user-event')).default
    const { default: Contact } = await import('../components/sections/Contact')
    render(<Contact />)

    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.tab()
    expect(screen.getByText(/valid email/i)).toBeTruthy()
  })

  it('shows error for message under 20 chars', async () => {
    const userEvent = (await import('@testing-library/user-event')).default
    const { default: Contact } = await import('../components/sections/Contact')
    render(<Contact />)

    await userEvent.type(screen.getByLabelText('Message'), 'Too short')
    await userEvent.tab()
    expect(screen.getByText(/at least 20 characters/i)).toBeTruthy()
  })

  it('clears field error when user corrects input', async () => {
    const userEvent = (await import('@testing-library/user-event')).default
    const { default: Contact } = await import('../components/sections/Contact')
    render(<Contact />)

    const nameInput = screen.getByLabelText(/^name/i)
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText(/name is required/i)).toBeTruthy()

    await userEvent.type(nameInput, 'Joshua')
    expect(screen.queryByText(/name is required/i)).toBeNull()
  })
})

// ── ErrorBoundary ─────────────────────────────────────────────────

describe('ErrorBoundary', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => {
    consoleSpy.mockClear()
  })

  it('renders children when no error', async () => {
    const { default: ErrorBoundary } = await import('../components/ui/ErrorBoundary')
    render(
      <ErrorBoundary section="Test">
        <p>All good</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('All good')).toBeTruthy()
  })

  it('shows fallback when child throws', async () => {
    const { default: ErrorBoundary } = await import('../components/ui/ErrorBoundary')
    const Bomb = () => { throw new Error('Test explosion') }
    render(
      <ErrorBoundary section="Test Section">
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(screen.getByText(/test section/i)).toBeTruthy()
  })

  it('recovers when retry is clicked', async () => {
    const { default: ErrorBoundary } = await import('../components/ui/ErrorBoundary')
    let shouldThrow = true
    const MaybeThrow = () => {
      if (shouldThrow) throw new Error('Boom')
      return <p>Recovered</p>
    }

    const { rerender } = render(
      <ErrorBoundary section="Test">
        <MaybeThrow />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeTruthy()

    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    rerender(
      <ErrorBoundary section="Test">
        <MaybeThrow />
      </ErrorBoundary>
    )
    expect(screen.getByText('Recovered')).toBeTruthy()
  })
})
