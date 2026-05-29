import { Component } from 'react'
import './ErrorBoundary.css'

/**
 * ErrorBoundary wraps any section of the app.
 * If a section throws, it shows a contained fallback
 * rather than crashing the entire page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Swap for a real error reporting service (Sentry, etc.) in production
    console.error(
      `[Portfolio Error] Section: ${this.props.section || 'unknown'}`,
      error,
      info
    )
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const section = this.props.section || 'This section'
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary__inner">
            <div className="error-boundary__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="error-boundary__label">
              {section} couldn't load.
            </p>
            <p className="error-boundary__hint">
              Try refreshing the page, or continue scrolling — other sections are unaffected.
            </p>
            <button
              className="btn btn--outline-dark error-boundary__retry"
              onClick={this.handleRetry}
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
