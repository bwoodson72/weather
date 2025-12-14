import axios from "axios";

export type CurrentWeatherResponse = {
  latitude: number;
  longitude: number;
  current?: {
    time: string;
    interval?: number;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    precipitation?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;

    // Added to support OpenWeather min/max temps
    temp_min?: number;
    temp_max?: number;
    description?: string;
  };
};

// OpenWeather "Current Weather Data" response (minimal fields we use)
type OpenWeatherCurrentResponse = {
  dt: number;
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;

    // Added: OpenWeather includes these
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  wind?: {
    speed?: number;
    deg?: number;
  };
};

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeatherResponse> {
  const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API key for current weather (APIKEY).");
  }

  try {
    const { data } = await axios.get<OpenWeatherCurrentResponse>(baseUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: "metric",
      },
      timeout: 10_000,
    });

    if (!data) {
      throw new Error("Failed to fetch current weather data");
    }

    return {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      current: {
        time: new Date(data.dt * 1000).toISOString(),
        temperature_2m: data.main.temp,
        apparent_temperature: data.main.feels_like,
        relative_humidity_2m: data.main.humidity,
        wind_speed_10m: data.wind?.speed,
        wind_direction_10m: data.wind?.deg,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        description: data.weather?.[0]?.description ?? "Unknown",
        // OpenWeather uses "weather[0].id" codes; keeping the existing field name for compatibility
        weather_code: data.weather?.[0]?.id,
      },
    };
  } catch (error) {
    console.error("Current weather API error:", error);
    throw error;
  }
}