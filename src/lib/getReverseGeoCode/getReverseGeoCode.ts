import axios from "axios";

type OpenWeatherReverseGeoResult = {
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
  local_names?: Record<string, string>;
};

export type ReverseGeoCodeResponse = {
  name: string;
  state?: string;
  latitude: number;
  longitude: number;
};

export async function getReverseGeoCode(
  lat: number,
  lng: number
): Promise<ReverseGeoCodeResponse> {
  const baseUrl = "http://api.openweathermap.org/geo/1.0/reverse?";
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    console.log(apiKey);
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