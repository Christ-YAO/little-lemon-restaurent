import { render, screen } from '@testing-library/react';
import App from './App';

test('rend la page formulaire avec le titre principal', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /réserver une table/i })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /confirmer la réservation/i })).toBeInTheDocument();
});
