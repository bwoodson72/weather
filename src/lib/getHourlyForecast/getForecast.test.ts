import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getHourlyForecast } from "./getHourlyForecast";
import type { HourlyForecastResponse } from "./getHourlyForecast";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getHourlyForecast", () => {
  const mockedAxiosGet = vi.mocked(axios.get);

  beforeEach(() => {
    mockedAxiosGet.mockReset();
  });

  it("returns hourly forecast data from Open-Meteo", async () => {
    const lat = 51.5074;
    const lon = 0.1278;

    const mockData: HourlyForecastResponse = {
      latitude: lat,
      longitude: lon,
      hourly: {
        time: ["2025-01-01T00:00", "2025-01-01T01:00"],
        weather_code: [0, 2],
      },
    };

    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

    const result = await getHourlyForecast(lat, lon);

    expect(result).toEqual(mockData);
    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: "weather_code",
        },
        timeout: 10_000,
      }
    );
  });

  it("throws a helpful error when the response has no data", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: undefined });

    await expect(getHourlyForecast(1, 2)).rejects.toThrow(
      "Failed to fetch hourly forecast data"
    );
  });

  it("rethrows axios/network errors", async () => {
    const networkError = new Error("Network Error");
    mockedAxiosGet.mockRejectedValueOnce(networkError);

    await expect(getHourlyForecast(1, 2)).rejects.toThrow("Network Error");
  });
});

