import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer section--dark" role="contentinfo">
      <div className="footer__inner container">

        <div className="footer__brand">
          <div className="footer__logo-mark">JH</div>
          <div>
            <p className="footer__name">Joshua Hebert</p>
            <p className="footer__title">Technical Delivery Manager</p>
          </div>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <a href="#case-studies" className="footer__link">Work</a>
          <a href="#principles"   className="footer__link">Principles</a>
          <a href="#skills"       className="footer__link">Skills</a>
          <a href="#contact"      className="footer__link">Contact</a>
          <a
            href="https://www.linkedin.com/in/jheeebert/"
            className="footer__link footer__link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </nav>

        <p className="footer__copy">
          © {year} Joshua Hebert · Charlotte, NC · Remote
        </p>
      </div>
    </footer>
  )
}
