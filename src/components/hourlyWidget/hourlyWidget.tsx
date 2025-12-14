'use client'
import { Stack, Typography } from "@mui/material";
import { getWeatherIcon } from "@/lib/getWeatherIcon/getWeatherIcon";

type HourlyWidgetProps = {
  timeLabel: string;      // e.g. "6pm"
  temperature: number;    // already in °C (or whatever you want to display)
  weatherCode: number;    // OpenWeather weather id (e.g. 800, 801...) or WMO code if you map it
  isDay?: boolean;
};

export function HourlyWidget({ timeLabel, temperature, weatherCode, isDay = true }: HourlyWidgetProps) {
  const iconClass = `wi ${getWeatherIcon(weatherCode, isDay)}`;

  return (
    <Stack spacing={1} sx={{ m: 1, alignItems: 'center', minWidth:50, textAlign: 'center' }}>
      <Typography variant="body1">{timeLabel}</Typography>
      <Typography variant="body1">
        <i className={iconClass}></i>
      </Typography>
      <Typography variant="body1">{Math.round(temperature)}°C</Typography>
    </Stack>
  );
}