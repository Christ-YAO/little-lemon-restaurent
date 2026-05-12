import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

test('affiche des erreurs de validation lorsque les champs requis sont vides', async () => {
  render(<BookingForm />);
  await userEvent.click(screen.getByRole('button', { name: /confirmer la réservation/i }));
  expect(await screen.findByText(/nom d’au moins/i)).toBeInTheDocument();
  expect(screen.getByText(/adresse e-mail invalide/i)).toBeInTheDocument();
});

test('soumet une réservation valide et affiche le message de succès', async () => {
  render(<BookingForm />);

  await userEvent.type(screen.getByLabelText(/^nom complet$/i), 'Jean Dupont');
  await userEvent.type(screen.getByLabelText(/^adresse e-mail$/i), 'jean@example.com');
  await userEvent.type(screen.getByLabelText(/^téléphone$/i), '+33123456789');

  fireEvent.change(screen.getByLabelText(/^date$/i), {
    target: { value: '2099-08-20' },
  });

  await userEvent.selectOptions(screen.getByLabelText(/^heure$/i), '19:00');

  fireEvent.change(screen.getByLabelText(/^convives$/i), {
    target: { value: '4' },
  });

  await userEvent.selectOptions(screen.getByLabelText(/^occasion$/i), 'birthday');

  await userEvent.click(screen.getByRole('button', { name: /confirmer la réservation/i }));

  expect(screen.getByText(/réservation envoyée/i)).toBeInTheDocument();
});
