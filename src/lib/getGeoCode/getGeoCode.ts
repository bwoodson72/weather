import axios from "axios";


export type GeoCodeResponse = {
  name: string;
  latitude: number;
  longitude: number;
};

type OpenWeatherDirectGeoResult = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
};

export async function getGeoCode(locationName: string): Promise<GeoCodeResponse> {
  const baseUrl = "https://api.openweathermap.org/geo/1.0/direct";
  const apiKey = process.env.APIKEY; // keep this server-side; do not expose secrets to the browser

  if (!apiKey) {
    throw new Error("Missing API key for geocoding (apiKey).");
  }

  try {
    const { data } = await axios.get<OpenWeatherDirectGeoResult[]>(baseUrl, {
      params: {
        q: locationName,
        limit: 1,
        appid: apiKey,
      },
      timeout: 10_000,
    });

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`No location found for "${locationName}".`);
    }

    const first = data[0];

    // Prefer an English local name if present, otherwise fall back to the default name
    const resolvedName =
      first.local_names?.en ??
      first.name;

    return {
      name: resolvedName,
      latitude: first.lat,
      longitude: first.lon,
    };
  } catch (error) {
    console.error("Geocoding API Error:", error);
    throw error;
  }
}