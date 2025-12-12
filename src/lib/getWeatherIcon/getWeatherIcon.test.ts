import { describe, expect, test } from 'vitest';
import { getWeatherIcon } from './getWeatherIcon';

describe('getWeatherIcon', () => {
  test('returns day icons when isDay is true (or omitted)', () => {
    expect(getWeatherIcon(0, true)).toBe('wi-owm-day-800');
    expect(getWeatherIcon(1, true)).toBe('wi-owm-day-801');
    // default parameter isDay = true
    expect(getWeatherIcon(2)).toBe('wi-owm-day-802');
    // codes that ignore day/night in current mapping
    expect(getWeatherIcon(45, true)).toBe('wi-owm-day-741');
    expect(getWeatherIcon(48, true)).toBe('wi-owm-day-741');
  });

  test('returns night icons when isDay is false', () => {
    expect(getWeatherIcon(0, false)).toBe('wi-owm-night-800');
    expect(getWeatherIcon(1, false)).toBe('wi-owm-night-801');
    expect(getWeatherIcon(63, false)).toBe('wi-owm-night-501');
    expect(getWeatherIcon(85, false)).toBe('wi-owm-night-621');
  });

  test('handles mappings that are currently day-only (fog codes)', () => {
    // As implemented, these return a day icon regardless of isDay
    expect(getWeatherIcon(45, false)).toBe('wi-owm-day-741');
    expect(getWeatherIcon(48, false)).toBe('wi-owm-day-741');
  });

  test('returns undefined for unmapped codes', () => {
    expect(getWeatherIcon(999 as unknown as number, true)).toBeUndefined();
    expect(getWeatherIcon(-1 as unknown as number, false)).toBeUndefined();
  });
});



