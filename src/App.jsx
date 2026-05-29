import './styles/globals.css'
import './styles/animations.css'
import './components/ui/SkipLink.css'

import SkipLink            from './components/ui/SkipLink'
import BackToTop           from './components/ui/BackToTop'
import Navbar              from './components/layout/Navbar'
import Footer              from './components/layout/Footer'
import ErrorBoundary       from './components/ui/ErrorBoundary'

import Hero                from './components/sections/Hero'
import ExecutiveSnapshot   from './components/sections/ExecutiveSnapshot'
import CaseStudies         from './components/sections/CaseStudies'
import OperatingPrinciples from './components/sections/OperatingPrinciples'
import Skills              from './components/sections/Skills'
import Downloads           from './components/sections/Downloads'
import Contact             from './components/sections/Contact'

export default function App() {
  return (
    <>
      {/* Accessibility: keyboard users skip to content */}
      <SkipLink />

      <ErrorBoundary section="Navigation">
        <Navbar />
      </ErrorBoundary>

      <main id="main-content">
        <ErrorBoundary section="Hero">
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary section="Executive Snapshot">
          <ExecutiveSnapshot />
        </ErrorBoundary>

        <ErrorBoundary section="Case Studies">
          <CaseStudies />
        </ErrorBoundary>

        <ErrorBoundary section="Operating Principles">
          <OperatingPrinciples />
        </ErrorBoundary>

        <ErrorBoundary section="Skills">
          <Skills />
        </ErrorBoundary>

        <ErrorBoundary section="Downloads">
          <Downloads />
        </ErrorBoundary>

        <ErrorBoundary section="Contact">
          <Contact />
        </ErrorBoundary>
      </main>

      <ErrorBoundary section="Footer">
        <Footer />
      </ErrorBoundary>

      {/* Back to top — appears after 400px scroll */}
      <BackToTop />
    </>
  )
}
