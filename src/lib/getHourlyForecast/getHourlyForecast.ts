import axios from "axios";

export type HourlyForecastResponse = {
  latitude: number;
  longitude: number;
  hourly?: {
    time: string[];
    weather_code: number[];
  };
};

export async function getHourlyForecast(
  latitude: number,
  longitude: number
): Promise<HourlyForecastResponse> {
  const baseUrl = "https://api.open-meteo.com/v1/forecast";

  try {
    const { data } = await axios.get<HourlyForecastResponse>(baseUrl, {
      params: {
        latitude,
        longitude,
        hourly: "weather_code",
      },
      timeout: 10_000,
    });

    if (!data) {
      throw new Error("Failed to fetch hourly forecast data");
    }

    return data;
  } catch (error) {
    console.error("Hourly forecast API error:", error);
    throw error;
  }
}