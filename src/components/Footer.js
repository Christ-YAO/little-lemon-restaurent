import './Footer.css';

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservations', label: 'Reservations' },
  { href: '#order', label: 'Order online' },
  { href: '#login', label: 'Login' },
];

const SOCIAL = [
  { href: '#instagram', label: 'Instagram' },
  { href: '#facebook', label: 'Facebook' },
  { href: '#x', label: 'X / Twitter' },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons_assets/Logo.svg`}
            alt=""
            width={180}
            height={42}
          />
          <p>Petite cuisine méditerranéenne au grand cœur.</p>
        </div>

        <nav aria-label="Plan du site" className="site-footer__col">
          <h2 className="site-footer__title">Doormat Navigation</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer__col" aria-labelledby="footer-contact">
          <h2 className="site-footer__title" id="footer-contact">
            Contact
          </h2>
          <address>
            123 Mediterranean Ave
            <br />
            Chicago, IL 60601
            <br />
            <a href="tel:+13125550123">+1 (312) 555-0123</a>
            <br />
            <a href="mailto:bonjour@littlelemon.example">bonjour@littlelemon.example</a>
          </address>
        </section>

        <section className="site-footer__col" aria-labelledby="footer-social">
          <h2 className="site-footer__title" id="footer-social">
            Social Media Links
          </h2>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="site-footer__copy">
        © {new Date().getFullYear()} Little Lemon · Chicago
      </p>
    </footer>
  );
}
