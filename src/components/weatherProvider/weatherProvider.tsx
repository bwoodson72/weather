'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { LocationContext } from "@/components/locationProvider/locationProvider";
import { getWeather } from "@/lib/getWeather/getWeather";
import type { OpenWeatherOneCallResponse } from "@/lib/getWeather/getWeather";
import { isDay as computeIsDay } from "@/lib/isDay/isDay";

export type WeatherContextType = {
  weather: OpenWeatherOneCallResponse | null;
  setWeather: Dispatch<SetStateAction<OpenWeatherOneCallResponse | null>>;
  isLoading: boolean;
  error: string | null;

  // NEW: whether it's currently daytime at the location
  isDay: boolean;
};

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const locationContext = useContext(LocationContext);

  const latitude = locationContext?.locationCoords.latitude;
  const longitude = locationContext?.locationCoords.longitude;

  const [weather, setWeather] = useState<OpenWeatherOneCallResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    let cancelled = false;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getWeather(latitude, longitude);
        if (!cancelled) setWeather(data);
      } catch (e) {
        console.error("Failed to load weather:", e);
        if (!cancelled) setError("Failed to load weather data.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchWeather();
    const intervalId = setInterval(fetchWeather, 60 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [latitude, longitude]);

  const dayNow = computeIsDay(weather);

  const value = useMemo<WeatherContextType>(
    () => ({ weather, setWeather, isLoading, error, isDay: dayNow }),
    [weather, isLoading, error, dayNow]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}