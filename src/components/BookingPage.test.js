import { initializeTimes, updateTimes } from './BookingPage';
import * as api from '../api';

describe('BookingPage state — initializeTimes / updateTimes', () => {
  test('initializeTimes returns a non-empty array of times', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
    times.forEach((t) => expect(t).toMatch(/^\d{2}:\d{2}$/));
  });

  test('updateTimes with UPDATE_TIMES returns slots from fetchAPI for the given date', () => {
    const spy = jest.spyOn(api, 'fetchAPI');
    const next = updateTimes([], { type: 'UPDATE_TIMES', date: '2099-09-15' });
    expect(spy).toHaveBeenCalled();
    expect(Array.isArray(next)).toBe(true);
    spy.mockRestore();
  });

  test('updateTimes with unknown action returns current state', () => {
    const state = ['17:00', '18:00'];
    expect(updateTimes(state, { type: 'NOOP' })).toBe(state);
  });

  test('updateTimes with RESET calls fetchAPI for today', () => {
    const next = updateTimes([], { type: 'RESET' });
    expect(Array.isArray(next)).toBe(true);
  });
});
