'use server'
import axios from "axios";

/**
 * Subset of OpenWeather Reverse Geocoding API response.
 */
type OpenWeatherReverseGeoResult = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
};

/**
 * Normalized reverse geocoding result returned by this module.
 */
export type ReverseGeoCodeResponse = {
  name: string;
  state?: string;
  latitude: number;
  longitude: number;
};

/**
 * Reverse geocodes latitude/longitude to a human-readable place name.
 *
 * Parameters:
 * - lat: latitude in decimal degrees
 * - lng: longitude in decimal degrees
 */
export async function getReverseGeoCode(
  lat: number,
  lng: number
): Promise<ReverseGeoCodeResponse> {
  const baseUrl = "https://api.openweathermap.org/geo/1.0/reverse?";
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key for reverse geocoding (APIKEY).");
  }

  try {
    const { data } = await axios.get<OpenWeatherReverseGeoResult[]>(baseUrl, {
      params: {
        lat,
        lon: lng,
        limit: 1,
        appid: apiKey,
      },
      timeout: 10_000,
    });

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`No location found for coordinates (${lat}, ${lng}).`);
    }

    const first = data[0];
    const resolvedName = first.local_names?.en ?? first.name;

    return {
      name: resolvedName,
      state: first.state,
      latitude: first.lat,
      longitude: first.lon,
    };
  } catch (error) {
    console.error("Reverse geocoding API Error:", error);
    throw error;
  }
}