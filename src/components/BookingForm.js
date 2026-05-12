import { useEffect, useId, useMemo, useState } from 'react';
import './BookingForm.css';
import {
  MAX_GUESTS,
  MIN_GUESTS,
  OCCASIONS,
  TIME_SLOTS,
  formatDateForInput,
  isTimeInPastForDate,
  isTodayLocal,
  startOfTodayLocal,
  validateBookingForm,
} from '../utils/bookingValidation';

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  notes: '',
};

// shadcn-style icon set (inline SVGs, currentColor)
function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function SpinnerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false" {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function BookingForm() {
  const formId = useId();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const minDate = useMemo(() => formatDateForInput(startOfTodayLocal()), []);

  const availableTimes = useMemo(() => {
    if (!values.date || !isTodayLocal(values.date)) return TIME_SLOTS;
    return TIME_SLOTS.filter((t) => !isTimeInPastForDate(values.date, t));
  }, [values.date]);

  useEffect(() => {
    if (values.date && values.time && isTodayLocal(values.date) && isTimeInPastForDate(values.date, values.time)) {
      setValues((v) => ({ ...v, time: '' }));
    }
  }, [values.date, values.time]);

  const fieldId = (name) => `${formId}-${name}`;

  const timeHintVisible =
    availableTimes.length === 0 && values.date && isTodayLocal(values.date);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitted) setSubmitted(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    const { errors: nextErrors, isValid } = validateBookingForm(values);
    setErrors(nextErrors);
    if (!isValid) {
      const order = ['fullName', 'email', 'phone', 'date', 'time', 'guests', 'occasion', 'notes'];
      const first = order.find((k) => nextErrors[k]);
      if (first) document.getElementById(fieldId(first))?.focus();
      return;
    }
    setPending(true);
    try {
      setSubmitted(true);
      setValues(INITIAL);
      setErrors({});
    } finally {
      setPending(false);
    }
  };

  const onReset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="card" aria-labelledby={`${formId}-title`}>
      <header className="card__header">
        <h1 className="card__title" id={`${formId}-title`}>
          Réserver une table
        </h1>
        <p className="card__description">
          Indiquez les détails de votre venue — nous confirmons votre réservation par e-mail.
        </p>
      </header>

      {submitted ? (
        <output className="alert alert--success" aria-live="polite">
          <CheckIcon className="alert__icon" />
          <div>
            <p className="alert__title">Réservation envoyée</p>
            <p className="alert__text">
              Merci ! Nous revenons vers vous dans les plus brefs délais.
            </p>
          </div>
        </output>
      ) : null}

      <form className="card__content" onSubmit={onSubmit} noValidate>
        <div className="grid">
          <Field
            id={fieldId('fullName')}
            label="Nom complet"
            error={errors.fullName}
          >
            <input
              id={fieldId('fullName')}
              name="fullName"
              type="text"
              className="input"
              autoComplete="name"
              placeholder="Marie Dupont"
              value={values.fullName}
              onChange={onChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${fieldId('fullName')}-err` : undefined}
              required
            />
          </Field>

          <Field
            id={fieldId('email')}
            label="Adresse e-mail"
            error={errors.email}
          >
            <input
              id={fieldId('email')}
              name="email"
              type="email"
              className="input"
              autoComplete="email"
              inputMode="email"
              placeholder="vous@exemple.com"
              value={values.email}
              onChange={onChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${fieldId('email')}-err` : undefined}
              required
            />
          </Field>

          <Field
            id={fieldId('phone')}
            label="Téléphone"
            error={errors.phone}
          >
            <input
              id={fieldId('phone')}
              name="phone"
              type="tel"
              className="input"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+33 6 12 34 56 78"
              value={values.phone}
              onChange={onChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${fieldId('phone')}-err` : undefined}
              required
            />
          </Field>

          <Field
            id={fieldId('guests')}
            label="Convives"
            description={`Entre ${MIN_GUESTS} et ${MAX_GUESTS}`}
            error={errors.guests}
          >
            <input
              id={fieldId('guests')}
              name="guests"
              type="number"
              className="input"
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              step={1}
              value={values.guests}
              onChange={onChange}
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? `${fieldId('guests')}-err` : undefined}
              required
            />
          </Field>

          <Field
            id={fieldId('date')}
            label="Date"
            error={errors.date}
            adornment={<CalendarIcon className="input__icon" />}
          >
            <input
              id={fieldId('date')}
              name="date"
              type="date"
              className="input"
              min={minDate}
              value={values.date}
              onChange={onChange}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? `${fieldId('date')}-err` : undefined}
              required
            />
          </Field>

          <Field
            id={fieldId('time')}
            label="Heure"
            error={errors.time}
            description={
              timeHintVisible
                ? 'Plus de créneaux disponibles aujourd’hui — choisissez une autre date.'
                : null
            }
            descriptionId={timeHintVisible ? `${fieldId('time')}-hint` : undefined}
          >
            <select
              id={fieldId('time')}
              name="time"
              className="input"
              value={values.time}
              onChange={onChange}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={
                errors.time
                  ? `${fieldId('time')}-err`
                  : timeHintVisible
                    ? `${fieldId('time')}-hint`
                    : undefined
              }
              required
            >
              <option value="">Choisir une heure</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id={fieldId('occasion')}
            label="Occasion"
            error={errors.occasion}
            className="grid__span-2"
          >
            <select
              id={fieldId('occasion')}
              name="occasion"
              className="input"
              value={values.occasion}
              onChange={onChange}
              aria-invalid={Boolean(errors.occasion)}
              aria-describedby={errors.occasion ? `${fieldId('occasion')}-err` : undefined}
              required
            >
              {OCCASIONS.map((o) => (
                <option key={o.value || 'empty'} value={o.value} disabled={o.value === ''}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id={fieldId('notes')}
            label="Demandes particulières"
            optional
            description={`${values.notes.length}/500 caractères`}
            descriptionId={`${fieldId('notes')}-counter`}
            error={errors.notes}
            className="grid__span-2"
          >
            <textarea
              id={fieldId('notes')}
              name="notes"
              className="input input--textarea"
              rows={4}
              maxLength={500}
              placeholder="Allergies, table en terrasse, anniversaire surprise…"
              value={values.notes}
              onChange={onChange}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={
                errors.notes
                  ? `${fieldId('notes')}-err ${fieldId('notes')}-counter`
                  : `${fieldId('notes')}-counter`
              }
            />
          </Field>
        </div>

        <footer className="card__footer">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onReset}
            disabled={pending}
          >
            Réinitialiser
          </button>
          <button type="submit" className="btn btn--primary" disabled={pending}>
            {pending ? (
              <>
                <SpinnerIcon className="btn__icon btn__icon--spin" />
                Envoi…
              </>
            ) : (
              'Confirmer la réservation'
            )}
          </button>
        </footer>
      </form>
    </section>
  );
}

function Field({ id, label, description, descriptionId, error, optional, className, adornment, children }) {
  return (
    <div className={`field${className ? ` ${className}` : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional ? <span className="field__optional">Optionnel</span> : null}
      </label>
      <div className={`field__control${adornment ? ' field__control--adorned' : ''}`}>
        {children}
        {adornment}
      </div>
      {description && !error ? (
        <p id={descriptionId} className="field__description">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className="field__error" role="alert">
          <AlertIcon className="field__error-icon" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
