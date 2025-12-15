'use client'

import { DailyWidget } from './dailyWidget';
import { WeatherCard } from "@/components/card/weatherCard";
import { useContext, useMemo } from "react";
import { WeatherContext } from "@/components/weatherProvider/weatherProvider";
import {Box, CircularProgress, Typography} from "@mui/material";

function formatDayOfWeekFromUnix(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString(undefined, { weekday: "short" });
}

function isSameLocalDay(aUnixSeconds: number, bUnixSeconds: number): boolean {
  const a = new Date(aUnixSeconds * 1000);
  const b = new Date(bUnixSeconds * 1000);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function DailyWidgetContainer() {
  const weatherCtx = useContext(WeatherContext);

  const weather = weatherCtx?.weather ?? null;
  const isLoading = weatherCtx?.isLoading ?? false;
  const error = weatherCtx?.error ?? null;

  // ✅ useMemo is always called (never conditional)
  const dailyRows = useMemo(() => {
    if (!weather?.daily?.length) return [];

    const todayUnix = weather.current?.dt ?? weather.daily[0].dt;

    return weather.daily.map((d) => ({
      key: d.dt,
      dayOfWeek: isSameLocalDay(d.dt, todayUnix) ? "Today" : formatDayOfWeekFromUnix(d.dt),
      chanceOfRain: d.pop ?? 0,
      dayTemp: d.temp?.max ?? 0,
      nightTemp: d.temp?.min ?? 0,
      dayCode: d.weather?.[0]?.id ?? 0,
      nightCode: d.weather?.[0]?.id ?? 0,
    }));
  }, [weather]);

  // ✅ now early returns are safe
  if (!weatherCtx) return null;

  if (error) {
    return (
      <WeatherCard label="daily">
        <div>{error}</div>
      </WeatherCard>
    );
  }

  if (isLoading || !weather) {
    return (
      <WeatherCard label="daily">
          <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <CircularProgress />
          </Box>
      </WeatherCard>
    );
  }

  return (
    <WeatherCard label="daily">
        <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>Daily Forecast</Typography>
      {dailyRows.map((row) => (
        <DailyWidget
          key={row.key}
          dayOfWeek={row.dayOfWeek}
          chanceOfRain={row.chanceOfRain}
          dayTemp={row.dayTemp}
          nightTemp={row.nightTemp}
          dayCode={row.dayCode}
          nightCode={row.nightCode}
        />
      ))}
    </WeatherCard>
  );
}