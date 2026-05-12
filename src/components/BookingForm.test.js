import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

const DEFAULT_TIMES = ['17:00', '18:00', '19:00', '20:00'];

function renderForm(overrides = {}) {
  const dispatch = jest.fn();
  const submitForm = jest.fn();
  const utils = render(
    <BookingForm
      availableTimes={DEFAULT_TIMES}
      dispatch={dispatch}
      submitForm={submitForm}
      {...overrides}
    />
  );
  return { ...utils, dispatch, submitForm };
}

describe('BookingForm — composant enfant', () => {
  test('rend les créneaux fournis par le parent', () => {
    renderForm();
    DEFAULT_TIMES.forEach((t) => {
      expect(screen.getByRole('option', { name: t })).toBeInTheDocument();
    });
  });

  test('changer la date déclenche dispatch(UPDATE_TIMES, date)', () => {
    const { dispatch } = renderForm();
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: '2099-08-20' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: '2099-08-20' });
  });

  test('affiche des erreurs de validation côté client quand on soumet un formulaire vide', async () => {
    renderForm();
    await userEvent.click(screen.getByRole('button', { name: /confirmer la réservation/i }));
    expect(await screen.findByText(/nom d’au moins/i)).toBeInTheDocument();
    expect(screen.getByText(/adresse e-mail invalide/i)).toBeInTheDocument();
  });

  test('appelle submitForm avec les valeurs quand la validation passe', async () => {
    const { submitForm } = renderForm();
    await userEvent.type(screen.getByLabelText(/^nom complet$/i), 'Jean Dupont');
    await userEvent.type(screen.getByLabelText(/^adresse e-mail$/i), 'jean@example.com');
    await userEvent.type(screen.getByLabelText(/^téléphone$/i), '+33123456789');
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: '2099-08-20' } });
    await userEvent.selectOptions(screen.getByLabelText(/^heure$/i), '19:00');
    fireEvent.change(screen.getByLabelText(/^convives$/i), { target: { value: '4' } });
    await userEvent.selectOptions(screen.getByLabelText(/^occasion$/i), 'birthday');
    await userEvent.click(screen.getByRole('button', { name: /confirmer la réservation/i }));

    expect(submitForm).toHaveBeenCalledTimes(1);
    expect(submitForm).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: 'Jean Dupont',
        email: 'jean@example.com',
        phone: '+33123456789',
        date: '2099-08-20',
        time: '19:00',
        guests: '4',
        occasion: 'birthday',
      })
    );
  });

  test('affiche le message de succès quand une confirmation est passée par le parent', () => {
    renderForm({ confirmation: { fullName: 'X', email: 'x@y.z', date: '2099-08-20', time: '19:00' } });
    expect(screen.getByText(/réservation envoyée/i)).toBeInTheDocument();
  });
});
