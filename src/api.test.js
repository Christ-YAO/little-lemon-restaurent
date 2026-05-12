import { fetchAPI, submitAPI } from './api';

describe('fetchAPI', () => {
  test('returns an array of valid HH:mm strings for a date', () => {
    const slots = fetchAPI(new Date(2099, 7, 20));
    expect(Array.isArray(slots)).toBe(true);
    expect(slots.length).toBeGreaterThan(0);
    slots.forEach((s) => expect(s).toMatch(/^\d{2}:\d{2}$/));
  });

  test('is deterministic for the same date', () => {
    const a = fetchAPI(new Date(2099, 7, 20));
    const b = fetchAPI(new Date(2099, 7, 20));
    expect(a).toEqual(b);
  });

  test('falls back to all slots when given an invalid date', () => {
    const slots = fetchAPI('not a date');
    expect(slots.length).toBeGreaterThan(0);
  });
});

describe('submitAPI', () => {
  test('returns true with valid data', () => {
    expect(submitAPI({ date: '2099-08-20', time: '19:00' })).toBe(true);
  });

  test('returns false with empty data', () => {
    expect(submitAPI(null)).toBe(false);
    expect(submitAPI({})).toBe(false);
  });
});
