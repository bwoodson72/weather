import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { getReverseGeoCode } from "./getReverseGeoCode";
import type { ReverseGeoCodeResponse } from "./getReverseGeoCode";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getReverseGeoCode", () => {
  const mockedAxiosGet = vi.mocked(axios.get);
  const originalApiKey = process.env.APIKEY;

  beforeEach(() => {
    mockedAxiosGet.mockReset();
    process.env.APIKEY = "<API_KEY>";
  });

  afterEach(() => {
    process.env.APIKEY = originalApiKey;
  });

  it("returns {name, state, latitude, longitude} for valid coordinates", async () => {
    const lat = 32.4421;
    const lng = -97.7942;

    mockedAxiosGet.mockResolvedValueOnce({
      data: [
        {
          name: "Granbury",
          state: "Texas",
          country: "US",
          lat,
          lon: lng,
          local_names: { en: "Granbury" },
        },
      ],
    });

    const result: ReverseGeoCodeResponse = await getReverseGeoCode(lat, lng);

    expect(result).toEqual({
      name: "Granbury",
      state: "Texas",
      latitude: lat,
      longitude: lng,
    });

    expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "http://api.openweathermap.org/geo/1.0/reverse",
      {
        params: {
          lat,
          lon: lng,
          limit: 1,
          appid: "<API_KEY>",
        },
        timeout: 10_000,
      }
    );
  });

  it("prefers local_names.en when present", async () => {
    mockedAxiosGet.mockResolvedValueOnce({
      data: [
        {
          name: "London",
          state: "England",
          lat: 51.5074,
          lon: -0.1278,
          local_names: { en: "London (EN)" },
        },
      ],
    });

    const result = await getReverseGeoCode(51.5074, -0.1278);

    expect(result.name).toBe("London (EN)");
    expect(result.state).toBe("England");
  });

  it("falls back to `name` when local_names.en is missing", async () => {
    mockedAxiosGet.mockResolvedValueOnce({
      data: [
        {
          name: "Paris",
          state: "Île-de-France",
          lat: 48.8566,
          lon: 2.3522,
          local_names: { fr: "Paris" },
        },
      ],
    });

    const result = await getReverseGeoCode(48.8566, 2.3522);

    expect(result.name).toBe("Paris");
  });

  it("throws when API key is missing", async () => {
    process.env.APIKEY = "";

    await expect(getReverseGeoCode(1, 2)).rejects.toThrow(
      "Missing API key for reverse geocoding"
    );

    expect(mockedAxiosGet).not.toHaveBeenCalled();
  });

  it("throws when API returns an empty array", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: [] });

    await expect(getReverseGeoCode(1, 2)).rejects.toThrow(
      "No location found for coordinates (1, 2)."
    );
  });

  it("rethrows axios/network errors", async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getReverseGeoCode(1, 2)).rejects.toThrow("Network Error");
  });
});
