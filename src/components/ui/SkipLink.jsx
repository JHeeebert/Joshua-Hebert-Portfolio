/**
 * SkipLink — hidden until focused via keyboard.
 * Lets keyboard/screen reader users jump straight to main content.
 * Place as the very first child of <body> (first element in App).
 */
export default function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}
