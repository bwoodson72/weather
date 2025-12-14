import axios from "axios";


export type GeoCodeResponse = {
  name: string;
  state?: string;
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

type OpenWeatherZipGeoResult = {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country?: string;
};

function isZip(input: string): boolean {
  // US ZIP: 12345 or 12345-6789
  return /^\d{5}(-\d{4})?$/.test(input.trim());
}

function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key for geocoding (NEXT_PUBLIC_OPENWEATHER_API_KEY).");
  }
  return apiKey;
}

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