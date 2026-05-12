import { render, screen } from '@testing-library/react';
import App from './App';

test('rend les sections principales (nav, hero, spécialités, témoignages, à propos, réservation, footer)', () => {
  render(<App />);
  expect(screen.getByRole('navigation', { name: /principale/i })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 1, name: /little lemon/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /specials/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /testimonials/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /réserver une table/i })).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('le bouton "Reserve a table" du hero pointe vers la section réservations', () => {
  render(<App />);
  const cta = screen.getByRole('link', { name: /reserve a table/i });
  expect(cta).toHaveAttribute('href', '#reservations');
});
