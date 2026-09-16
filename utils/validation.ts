const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

/**
 * Validates a date string in the "Mon DD, YYYY" format used throughout the
 * app (e.g. "Oct 10, 2026" or "October 10, 2026"). Returns an error message
 * if the value is missing or malformed, otherwise undefined.
 */
export function validateDate(raw: string): string | undefined {
  const value = raw.trim();
  if (value.length === 0) return 'Date is required.';

  const match = value.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),\s*(\d{4})$/);
  if (!match) return 'Enter date as "Mon DD, YYYY" (e.g. Oct 10, 2026).';

  const [, monthRaw, dayRaw, yearRaw] = match;
  const monthIndex = MONTHS.findIndex((m) => monthRaw.toLowerCase().startsWith(m));
  if (monthIndex === -1) return 'Enter a valid month (e.g. Jan, Feb, Oct).';

  const day = parseInt(dayRaw, 10);
  const year = parseInt(yearRaw, 10);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  if (day < 1 || day > daysInMonth) return 'Enter a valid day for that month.';

  return undefined;
}

/**
 * Validates a time string in the "H:MM AM/PM" format used throughout the
 * app (e.g. "3:00 PM"). Time is an optional field, so an empty value is
 * considered valid. Returns an error message if a non-empty value is
 * malformed, otherwise undefined.
 */
export function validateTime(raw: string): string | undefined {
  const value = raw.trim();
  if (value.length === 0) return undefined;

  const match = value.match(/^(\d{1,2}):(\d{2})\s?([AaPp][Mm])$/);
  if (!match) return 'Enter time as "H:MM AM/PM" (e.g. 3:00 PM).';

  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  if (hour < 1 || hour > 12) return 'Hour must be between 1 and 12.';
  if (minute < 0 || minute > 59) return 'Minutes must be between 00 and 59.';

  return undefined;
}

/** Normalizes a valid time string so "AM"/"PM" is always uppercase. */
export function normalizeTime(raw: string): string {
  const value = raw.trim();
  const match = value.match(/^(\d{1,2}:\d{2})\s?([AaPp][Mm])$/);
  if (!match) return value;
  return `${match[1]} ${match[2].toUpperCase()}`;
}
