import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { getCurrentWeather } from "./getCurrentWeather";
import type { CurrentWeatherResponse } from "./getCurrentWeather";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getCurrentWeather", () => {
  const mockedAxiosGet = vi.mocked(axios.get);
  const originalApiKey = process.env.APIKEY;

  beforeEach(() => {
    mockedAxiosGet.mockReset();
    process.env.APIKEY = "<API_KEY>";
  });

  afterEach(() => {
    process.env.APIKEY = originalApiKey;
  });

  it("calls OpenWeather with lat/lon and returns mapped data", async () => {
    const lat = 51.5074;
    const lon = -0.1278;

    mockedAxiosGet.mockResolvedValueOnce({
      data: {
        dt: 1735732800, // 2025-01-01T12:00:00.000Z
        coord: { lat, lon },
        main: {
          temp: 10.2,
          feels_like: 8.7,
          humidity: 68,
        },
        weather: [{ id: 801, main: "Clouds", description: "few clouds" }],
        wind: { speed: 4.8, deg: 210 },
      },
    });

    const result: CurrentWeatherResponse = await getCurrentWeather(lat, lon);

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: "<API_KEY>",
            units: "metric",
          },
          timeout: 10_000,
        }
    );

    expect(result).toEqual({
      latitude: lat,
      longitude: lon,
      current: {
        time: new Date(1735732800 * 1000).toISOString(),
        temperature_2m: 10.2,
        apparent_temperature: 8.7,
        relative_humidity_2m: 68,
        wind_speed_10m: 4.8,
        wind_direction_10m: 210,
        weather_code: 801,
      },
    });
  });

  it("throws when API key is missing", async () => {
    process.env.APIKEY = "";

    await expect(getCurrentWeather(1, 2)).rejects.toThrow(
        "Missing API key for current weather"
    );

    expect(mockedAxiosGet).not.toHaveBeenCalled();
  });

  it("throws a helpful error when the response has no data", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: undefined });

    await expect(getCurrentWeather(1, 2)).rejects.toThrow(
        "Failed to fetch current weather data"
    );
  });

  it("rethrows axios/network errors", async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getCurrentWeather(1, 2)).rejects.toThrow("Network Error");
  });

  it("handles missing wind/weather arrays gracefully (optional fields)", async () => {
    mockedAxiosGet.mockResolvedValueOnce({
      data: {
        dt: 1735732800,
        coord: { lat: 1, lon: 2 },
        main: { temp: 1, feels_like: 1, humidity: 1 },
        weather: [],
        // wind omitted
      },
    });

    const result = await getCurrentWeather(1, 2);

    expect(result.current?.weather_code).toBeUndefined();
    expect(result.current?.wind_speed_10m).toBeUndefined();
    expect(result.current?.wind_direction_10m).toBeUndefined();
  });
});