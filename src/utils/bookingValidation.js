/**
 * Pure validation helpers for the table booking form.
 * Kept separate from React to simplify unit testing and reuse.
 */

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

/** Half-hour slots from 17:00 to 22:00 (last seating). */
export const TIME_SLOTS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
];

export const OCCASIONS = [
  { value: '', label: 'Choisir une occasion' },
  { value: 'birthday', label: 'Anniversaire' },
  { value: 'anniversary', label: 'Anniversaire de mariage' },
  { value: 'business', label: 'Repas d’affaires' },
  { value: 'other', label: 'Autre' },
];

export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidGuestCount(value) {
  const n =
    typeof value === 'string' && value.trim() !== ''
      ? Number(value.trim())
      : Number(value);
  if (!Number.isInteger(n) || Number.isNaN(n)) return false;
  return n >= MIN_GUESTS && n <= MAX_GUESTS;
}

export function isValidEmail(email) {
  if (!isNonEmptyString(email)) return false;
  const trimmed = email.trim();
  // Pragmatic pattern: not exhaustive RFC5322, good enough for UX validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidPhone(phone) {
  if (!isNonEmptyString(phone)) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

export function isValidFullName(name) {
  if (!isNonEmptyString(name)) return false;
  return name.trim().length >= 2;
}

/** yyyy-mm-dd expected from <input type="date" /> */
export function parseDateInputLocal(dateStr) {
  if (!isNonEmptyString(dateStr)) return null;
  const parts = dateStr.split('-').map((p) => Number(p));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
    return null;
  }
  return dt;
}

export function startOfTodayLocal() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

export function isDateInPast(dateStr) {
  const parsed = parseDateInputLocal(dateStr);
  if (!parsed) return true;
  return parsed.getTime() < startOfTodayLocal().getTime();
}

export function isTodayLocal(dateStr) {
  const parsed = parseDateInputLocal(dateStr);
  if (!parsed) return false;
  const t0 = startOfTodayLocal();
  return parsed.getTime() === t0.getTime();
}

export function isTimeInPastForDate(dateStr, timeStr) {
  if (!isNonEmptyString(dateStr) || !isNonEmptyString(timeStr)) return false;
  const parsed = parseDateInputLocal(dateStr);
  if (!parsed) return false;
  const [hh, mm] = timeStr.split(':').map((n) => Number(n));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return false;
  const when = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
    hh,
    mm,
    0,
    0
  );
  return when.getTime() < Date.now();
}

export function isAllowedTimeSlot(timeStr) {
  return TIME_SLOTS.includes(timeStr);
}

/** yyyy-mm-dd for `<input type="date" min={...} />` */
export function formatDateForInput(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * @param {object} values
 * @returns {{ errors: Record<string, string>, isValid: boolean }}
 */
export function validateBookingForm(values) {
  const errors = {};

  if (!isValidFullName(values.fullName)) {
    errors.fullName = 'Indiquez un nom d’au moins 2 caractères.';
  }

  if (!isValidEmail(values.email)) {
    errors.email = 'Adresse e-mail invalide (ex. : nom@exemple.com).';
  }

  if (!isValidPhone(values.phone)) {
    errors.phone =
      'Numéro invalide : au moins 8 chiffres, au plus 15 (espaces et + acceptés).';
  }

  if (!isNonEmptyString(values.date)) {
    errors.date = 'Choisissez une date.';
  } else if (isDateInPast(values.date)) {
    errors.date = 'La date ne peut pas être dans le passé.';
  }

  if (!isNonEmptyString(values.time)) {
    errors.time = 'Choisissez une heure.';
  } else if (!isAllowedTimeSlot(values.time)) {
    errors.time = 'Heure non proposée par le restaurant.';
  } else if (
    isNonEmptyString(values.date) &&
    !isDateInPast(values.date) &&
    isTodayLocal(values.date) &&
    isTimeInPastForDate(values.date, values.time)
  ) {
    errors.time =
      'Cette heure est déjà passée pour aujourd’hui. Choisissez une autre heure ou une autre date.';
  }

  if (!isValidGuestCount(values.guests)) {
    errors.guests = `Nombre de convives entre ${MIN_GUESTS} et ${MAX_GUESTS}.`;
  }

  if (!isNonEmptyString(values.occasion)) {
    errors.occasion = 'Sélectionnez une occasion.';
  }

  const notes = String(values.notes ?? '');
  if (notes.length > 500) {
    errors.notes = 'Votre message ne peut pas dépasser 500 caractères.';
  }

  const keys = Object.keys(errors);
  return { errors, isValid: keys.length === 0 };
}
