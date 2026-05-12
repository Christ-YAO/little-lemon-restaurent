import {
  isAllowedTimeSlot,
  isDateInPast,
  isNonEmptyString,
  isTimeInPastForDate,
  isTodayLocal,
  isValidEmail,
  isValidGuestCount,
  isValidPhone,
  validateBookingForm,
  parseDateInputLocal,
  formatDateForInput,
} from './bookingValidation';

describe('bookingValidation primitives', () => {
  test('isNonEmptyString', () => {
    expect(isNonEmptyString('')).toBe(false);
    expect(isNonEmptyString('   ')).toBe(false);
    expect(isNonEmptyString('a')).toBe(true);
  });

  test('isValidGuestCount', () => {
    expect(isValidGuestCount(0)).toBe(false);
    expect(isValidGuestCount(1)).toBe(true);
    expect(isValidGuestCount(10)).toBe(true);
    expect(isValidGuestCount(11)).toBe(false);
    expect(isValidGuestCount('3')).toBe(true);
    expect(isValidGuestCount(3.5)).toBe(false);
  });

  test('isValidEmail', () => {
    expect(isValidEmail('bad')).toBe(false);
    expect(isValidEmail('a@b.c')).toBe(true);
    expect(isValidEmail(' user@host.com ')).toBe(true);
  });

  test('isValidPhone', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('+33 6 12 34 56 78')).toBe(true);
    expect(isValidPhone('0612345678')).toBe(true);
  });

  test('parseDateInputLocal rejects invalid calendar dates', () => {
    expect(parseDateInputLocal('2026-02-31')).toBeNull();
  });

  test('isAllowedTimeSlot', () => {
    expect(isAllowedTimeSlot('19:00')).toBe(true);
    expect(isAllowedTimeSlot('16:30')).toBe(false);
  });
});

describe('formatDateForInput', () => {
  test('formats local date as yyyy-mm-dd', () => {
    expect(formatDateForInput(new Date(2026, 4, 9))).toBe('2026-05-09');
  });
});

describe('validateBookingForm integration', () => {
  const base = {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+1 555 123 4567',
    date: '2099-01-15',
    time: '19:00',
    guests: 2,
    occasion: 'birthday',
  };

  test('valid payload passes', () => {
    const { isValid, errors } = validateBookingForm(base);
    expect(isValid).toBe(true);
    expect(Object.keys(errors).length).toBe(0);
  });

  test('flags invalid email and guests', () => {
    const { isValid, errors } = validateBookingForm({
      ...base,
      email: 'not-an-email',
      guests: 99,
    });
    expect(isValid).toBe(false);
    expect(errors.email).toBeDefined();
    expect(errors.guests).toBeDefined();
  });

  test('flags missing occasion', () => {
    const { isValid, errors } = validateBookingForm({ ...base, occasion: '' });
    expect(isValid).toBe(false);
    expect(errors.occasion).toBeDefined();
  });

  test('flags overly long notes', () => {
    const long = 'x'.repeat(501);
    const { isValid, errors } = validateBookingForm({ ...base, notes: long });
    expect(isValid).toBe(false);
    expect(errors.notes).toBeDefined();
  });
});

describe('date edge cases (local clock)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('isDateInPast uses local midnight', () => {
    jest.setSystemTime(new Date('2026-05-12T12:00:00'));
    expect(isDateInPast('2026-05-11')).toBe(true);
    expect(isDateInPast('2026-05-12')).toBe(false);
    expect(isDateInPast('2026-05-13')).toBe(false);
  });

  test('isTodayLocal', () => {
    jest.setSystemTime(new Date('2026-05-12T08:00:00'));
    expect(isTodayLocal('2026-05-12')).toBe(true);
    expect(isTodayLocal('2026-05-13')).toBe(false);
  });

  test('isTimeInPastForDate when clock is late evening', () => {
    jest.setSystemTime(new Date('2026-05-12T21:45:00'));
    expect(isTimeInPastForDate('2026-05-12', '17:00')).toBe(true);
    expect(isTimeInPastForDate('2026-05-12', '22:00')).toBe(false);
    expect(isTimeInPastForDate('2026-05-13', '17:00')).toBe(false);
  });
});
