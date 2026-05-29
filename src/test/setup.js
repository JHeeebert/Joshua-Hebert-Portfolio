import '@testing-library/jest-dom'

/**
 * IntersectionObserver mock for jsdom.
 * Framer Motion's useInView uses this API, which jsdom doesn't support.
 * Mock immediately fires with isIntersecting: true so animated sections
 * render in their visible state during tests.
 */
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(el) {
    // Fire immediately — sections are "in view" in the test environment
    this.callback([{ isIntersecting: true, target: el }], this)
  }
  unobserve() {}
  disconnect() {}
}
