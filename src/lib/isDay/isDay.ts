import type { OpenWeatherOneCallResponse } from "@/lib/getWeather/getWeather";

/**
 * Returns true if it's currently daytime at the location described by the One Call response.
 * Uses OpenWeather timestamps (all unix seconds).
 */
export function isDay(weather: OpenWeatherOneCallResponse | null | undefined): boolean {
  const currentDt = weather?.current?.dt;
  const sunrise = weather?.current?.sunrise;
  const sunset = weather?.current?.sunset;

  // If we don't have enough info, default to "day" to avoid night icons everywhere.
  if (currentDt == null || sunrise == null || sunset == null) return true;

  return currentDt >= sunrise && currentDt < sunset;
}