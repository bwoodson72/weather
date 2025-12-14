/**
 * Returns a Weather Icons CSS class for either:
 * - OpenWeather condition IDs (e.g. 800, 801, 500, 611, ...)
 * - WMO weather codes (0-99) mapped to a reasonable OpenWeather icon class
 */
export function getWeatherIcon(code: number, isDay: boolean = true): string {
  // OpenWeather condition IDs are typically >= 200 (thunderstorm range starts at 200)
  // In that case, Weather Icons supports: wi-owm-day-<id> / wi-owm-night-<id>
  if (Number.isFinite(code) && code >= 200) {
    return isDay ? `wi-owm-day-${code}` : `wi-owm-night-${code}`;
  }

  // Otherwise treat it like a WMO code and map to an equivalent OWM icon class
  const iconMap: Record<number, string> = {
    // Clear sky
    0: isDay ? "wi-owm-day-800" : "wi-owm-night-800",

    // Mainly clear, partly cloudy
    1: isDay ? "wi-owm-day-801" : "wi-owm-night-801",
    2: isDay ? "wi-owm-day-802" : "wi-owm-night-802",
    3: isDay ? "wi-owm-day-803" : "wi-owm-night-803",

    // Fog and depositing rime fog
    45: "wi-owm-day-741",
    48: "wi-owm-day-741",

    // Drizzle
    51: isDay ? "wi-owm-day-300" : "wi-owm-night-300",
    53: isDay ? "wi-owm-day-301" : "wi-owm-night-301",
    55: isDay ? "wi-owm-day-302" : "wi-owm-night-302",

    // Rain
    61: isDay ? "wi-owm-day-500" : "wi-owm-night-500",
    63: isDay ? "wi-owm-day-501" : "wi-owm-night-501",
    65: isDay ? "wi-owm-day-502" : "wi-owm-night-502",

    // Snow
    71: isDay ? "wi-owm-day-600" : "wi-owm-night-600",
    73: isDay ? "wi-owm-day-601" : "wi-owm-night-601",
    75: isDay ? "wi-owm-day-602" : "wi-owm-night-602",

    // Rain showers
    80: isDay ? "wi-owm-day-520" : "wi-owm-night-520",
    81: isDay ? "wi-owm-day-521" : "wi-owm-night-521",
    82: isDay ? "wi-owm-day-522" : "wi-owm-night-522",

    // Snow showers
    85: isDay ? "wi-owm-day-621" : "wi-owm-night-621",
    86: isDay ? "wi-owm-day-622" : "wi-owm-night-622",

    // Thunderstorm
    95: isDay ? "wi-owm-day-211" : "wi-owm-night-211",
    96: isDay ? "wi-owm-day-212" : "wi-owm-night-212",
    99: isDay ? "wi-owm-day-221" : "wi-owm-night-221",
  };

  return iconMap[code] ?? "wi-na";
}