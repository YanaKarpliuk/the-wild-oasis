import { formatCurrency, subtractDates, getToday, formatDistanceFromNow } from './helpers';

describe('formatCurrency', () => {
  it('formats a whole number as USD with two decimals', () => {
    expect(formatCurrency(5000)).toBe('$5,000.00');
  });

  it('adds comma separators for thousands', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('rounds decimals to two places', () => {
    expect(formatCurrency(9.999)).toBe('$10.00');
  });
});

describe('subtractDates', () => {
  it('returns the number of whole days between two dates', () => {
    expect(subtractDates('2024-01-10', '2024-01-01')).toBe(9);
  });

  it('returns 0 for the same date', () => {
    expect(subtractDates('2024-01-01', '2024-01-01')).toBe(0);
  });

  it('returns a negative number when the first date is earlier', () => {
    expect(subtractDates('2024-01-01', '2024-01-10')).toBe(-9);
  });
});

describe('getToday', () => {
  // Freeze "now" so the output is predictable regardless of when tests run
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:30:45.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the start of the current day by default', () => {
    expect(getToday()).toBe('2024-06-15T00:00:00.000Z');
  });

  it('returns the end of the current day when end option is true', () => {
    expect(getToday({ end: true })).toBe('2024-06-15T23:59:59.999Z');
  });
});

describe('formatDistanceFromNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('describes a past date relative to now', () => {
    const result = formatDistanceFromNow('2024-06-10T12:00:00.000Z');
    expect(result).toBe('5 days ago');
  });

  it('strips the word "about" from the phrase', () => {
    const result = formatDistanceFromNow('2024-06-15T10:00:00.000Z');
    expect(result).not.toContain('about');
  });

  it('capitalizes a future "in" to "In"', () => {
    const result = formatDistanceFromNow('2024-06-20T12:00:00.000Z');
    expect(result.startsWith('In')).toBe(true);
  });
});

