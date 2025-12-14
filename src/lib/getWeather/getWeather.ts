import axios from "axios";

export type OpenWeatherOneCallResponse = {
  lat: number;
  lon: number;
  timezone?: string;
  timezone_offset?: number;
  current?: {
    dt: number;
    temp: number;
    feels_like?: number;
    humidity?: number;
    wind_speed?: number;
    wind_deg?: number;
    weather?: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  };
  hourly?: Array<{
    dt: number;
    temp: number;
    weather?: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  daily?: Array<{
    dt: number;
    temp?: { min?: number; max?: number };
    weather?: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
};

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<OpenWeatherOneCallResponse> {
  const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API key for weather (NEXT_PUBLIC_OPENWEATHER_API_KEY).");
  }

  try {
    const { data } = await axios.get<OpenWeatherOneCallResponse>(baseUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        units: "metric",
        appid: apiKey,
      },
      timeout: 10_000,
    });

    if (!data) {
      throw new Error("Failed to fetch weather data");
    }

    return data;
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}

