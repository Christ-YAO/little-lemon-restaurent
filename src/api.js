/**
 * Mock backend conforme au pattern du cours Meta (fetchAPI / submitAPI).
 *
 * Dans le vrai cours, `window.fetchAPI` / `window.submitAPI` sont chargés via un
 * script externe. Ici on les expose comme modules afin d'être directement testables.
 */

const ALL_SLOTS = [
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

function seededShuffle(array, seed) {
  const a = [...array];
  let s = seed;
  for (let i = a.length - 1; i > 0; i -= 1) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Renvoie les créneaux disponibles pour une date donnée.
 * Le résultat est déterministe par rapport à la date (week-end → plus de créneaux).
 *
 * @param {Date} date
 * @returns {string[]} créneaux au format HH:mm, triés
 */
export function fetchAPI(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return ALL_SLOTS;
  }
  const day = date.getDay();
  const seed = date.getFullYear() * 1000 + date.getMonth() * 50 + date.getDate();
  const keepRatio = day === 0 || day === 6 ? 0.85 : 0.65;
  const keep = Math.max(3, Math.round(ALL_SLOTS.length * keepRatio));
  return seededShuffle(ALL_SLOTS, seed).slice(0, keep).sort();
}

/**
 * Simule la soumission d'une réservation.
 * @returns {boolean} true si l'enregistrement a réussi
 */
export function submitAPI(formData) {
  return Boolean(formData && formData.date && formData.time);
}
