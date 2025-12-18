'use server'
import axios from "axios";


/**
 * Normalized geocoding result returned by this module.
 */
export type GeoCodeResponse = {
  name: string;
  state?: string;
  latitude: number;
  longitude: number;
};

/**
 * Subset of OpenWeather's Direct Geocoding API response.
 */
type OpenWeatherDirectGeoResult = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
};

/**
 * Subset of OpenWeather's ZIP Geocoding API response.
 */
type OpenWeatherZipGeoResult = {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country?: string;
};

/**
 * Returns true if the input matches a US ZIP format (12345 or 12345-6789).
 */
function isZip(input: string): boolean {
  // US ZIP: 12345 or 12345-6789
  return /^\d{5}(-\d{4})?$/.test(input.trim());
}

/**
 * Reads the OpenWeather API key from env and throws an actionable error if missing.
 */
function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key for geocoding (NEXT_PUBLIC_OPENWEATHER_API_KEY).");
  }
  return apiKey;
}

/**
 * Geocodes a city name or a US ZIP code using OpenWeather APIs.
 *
 * Behavior:
 * - If input looks like a ZIP, queries the ZIP geocoding endpoint (US only).
 * - Otherwise, queries the Direct Geocoding endpoint (city name search).
 *
 * Errors:
 * - Throws on missing API key
 * - Throws if input is empty or no results are found
 */
export async function getGeoCode(input: string): Promise<GeoCodeResponse[]> {
  const apiKey = getApiKey();
  const q = input.trim();

  if (!q) {
    throw new Error("Please enter a city name or ZIP code.");
  }

  try {
    // ZIP path
    if (isZip(q)) {
      const zipUrl = "https://api.openweathermap.org/geo/1.0/zip";

      const { data } = await axios.get<OpenWeatherZipGeoResult>(zipUrl, {
        params: {
          zip: `${q},US`,
          appid: apiKey,
        },
        timeout: 10_000,
      });

      if (!data) {
        throw new Error(`No location found for zip "${q}".`);
      }

      return [
        {
          name: data.name,
          latitude: data.lat,
          longitude: data.lon,
        },
      ];
    }

    // City-name path
    const directUrl = "https://api.openweathermap.org/geo/1.0/direct";

    const { data } = await axios.get<OpenWeatherDirectGeoResult[]>(directUrl, {
      params: {
        q,
        limit: 10,
        appid: apiKey,
      },
      timeout: 10_000,
    });

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`No location found for "${q}".`);
    }

    return data.map((result) => ({
      name: result.local_names?.en ?? result.name,
      state: result.state,
      latitude: result.lat,
      longitude: result.lon,
    }));
  } catch (error) {
    console.error("Geocoding API Error:", error);
    throw error;
  }
}