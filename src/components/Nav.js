import { useEffect, useId, useState } from 'react';
import './Nav.css';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservations', label: 'Reservations' },
  { href: '#order', label: 'Order online' },
  { href: '#login', label: 'Login' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="nav-bar">
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>
      <div className="nav-bar__inner">
        <a className="nav-brand" href="#home" aria-label="Little Lemon — Accueil">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons_assets/Logo.svg`}
            alt=""
            height={42}
            width={180}
          />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-controls={menuId}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">Menu</span>
          <span className="nav-toggle__bar" aria-hidden />
          <span className="nav-toggle__bar" aria-hidden />
          <span className="nav-toggle__bar" aria-hidden />
        </button>

        <nav
          id={menuId}
          className={`nav-menu${open ? ' nav-menu--open' : ''}`}
          aria-label="Navigation principale"
        >
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className="nav-scrim"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
