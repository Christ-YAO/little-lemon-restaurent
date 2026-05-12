import { useReducer, useState } from 'react';
import { fetchAPI, submitAPI } from '../api';
import BookingForm from './BookingForm';
import './BookingPage.css';

/**
 * État initial : on demande à l'API les créneaux pour aujourd'hui.
 * Cette fonction est exportée pour pouvoir être testée unitairement.
 */
export function initializeTimes() {
  return fetchAPI(new Date());
}

/**
 * Reducer des créneaux disponibles. Le parent (BookingPage) le possède et
 * le passe à BookingForm sous forme de `dispatch`.
 */
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES': {
      const parsed = action.date ? new Date(action.date) : new Date();
      return fetchAPI(parsed);
    }
    case 'RESET':
      return fetchAPI(new Date());
    default:
      return state;
  }
}

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [confirmed, setConfirmed] = useState(null);

  // Remonté depuis BookingForm une fois la validation côté client passée.
  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      setConfirmed(formData);
      dispatch({ type: 'RESET' });
      return true;
    }
    return false;
  };

  return (
    <section className="booking-page" id="reservations" aria-labelledby="booking-title">
      <div className="booking-page__inner">
        <header className="booking-page__header">
          <h2 className="booking-page__title" id="booking-title">
            Réserver une table
          </h2>
          <p className="booking-page__lede">
            Choisissez votre date pour voir les créneaux disponibles. Nous confirmons votre
            réservation par e-mail.
          </p>
        </header>

        <BookingForm
          availableTimes={availableTimes}
          dispatch={dispatch}
          submitForm={submitForm}
          confirmation={confirmed}
        />
      </div>
    </section>
  );
}
