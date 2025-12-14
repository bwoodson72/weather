import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { getWeather } from "./getWeather";
import type { OpenWeatherOneCallResponse } from "./getWeather";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getWeather", () => {
  const mockedAxiosGet = vi.mocked(axios.get);
  const originalKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  beforeEach(() => {
    mockedAxiosGet.mockReset();
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = "<API_KEY>";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = originalKey;
  });

  it("calls OpenWeather One Call 3.0 with lat/lon and returns data", async () => {
    const lat = 51.5074;
    const lon = -0.1278;

    const mockData: OpenWeatherOneCallResponse = {
      lat,
      lon,
      timezone: "Europe/London",
      timezone_offset: 0,
      current: {
        dt: 1735732800,
        temp: 10.2,
        feels_like: 8.7,
        humidity: 68,
        wind_speed: 4.8,
        wind_deg: 210,
        weather: [
          { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
        ],
      },
      hourly: [
        {
          dt: 1735732800,
          temp: 10.2,
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
          ],
        },
      ],
      daily: [
        {
          dt: 1735732800,
          temp: { min: 5, max: 12 },
          weather: [
            { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
          ],
        },
      ],
    };

    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

    const result = await getWeather(lat, lon);

    expect(result).toEqual(mockData);
    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/3.0/onecall",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: "<API_KEY>",
        },
        timeout: 10_000,
      }
    );
  });

  it("throws when API key is missing", async () => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = "";

    await expect(getWeather(1, 2)).rejects.toThrow(
      "Missing API key for weather"
    );

    expect(mockedAxiosGet).not.toHaveBeenCalled();
  });

  it("throws a helpful error when the response has no data", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: undefined });

    await expect(getWeather(1, 2)).rejects.toThrow("Failed to fetch weather data");
  });

  it("rethrows axios/network errors", async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getWeather(1, 2)).rejects.toThrow("Network Error");
  });
});

