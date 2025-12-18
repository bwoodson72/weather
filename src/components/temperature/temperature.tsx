'use client'
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import { WeatherCard } from "@/components/card/weatherCard";
import { useContext } from "react";
import { WeatherContext } from "@/components/weatherProvider/weatherProvider";
import { toTitleCase } from "@/lib/toTitleCase/toTitleCase";


export function Temperature() {
  const weatherCtx = useContext(WeatherContext);

  // Guard clause: must be inside <WeatherProvider />
  if (!weatherCtx) return null;

  const {unit, weather, isLoading, error } = weatherCtx;

  if (error) {
    return (
      <WeatherCard label="temperature">
        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <Typography color="error">{error}</Typography>
        </Box>
      </WeatherCard>
    );
  }

  if (isLoading || !weather) {
    return (
      <WeatherCard label="temperature">
        <Box display="flex" justifyContent="center" alignItems="center" height={250}>
          <CircularProgress />
        </Box>
      </WeatherCard>
    );
  }

  const currentTemp = Math.round(weather.current?.temp ?? 0);

  const descriptionRaw = weather.current?.weather?.[0]?.description ?? "Current";
  const description = toTitleCase(descriptionRaw);

  const tempHigh = Math.round(weather.daily?.[0]?.temp?.max ?? currentTemp);
  const tempLow = Math.round(weather.daily?.[0]?.temp?.min ?? currentTemp);

  const weatherCode = weather.current?.weather?.[0]?.id;
  const weatherIconClass =
    weatherCode != null ? `wi wi-owm-${weatherCode}` : "wi wi-na";

  return (
    <WeatherCard label="temperature">
      <Grid container spacing={1} gap={1}>
        <Grid
          size={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
          }}
        >
          <Box
            aria-label="high temperature"
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h4">High</Typography>
            <Typography variant="h5">{tempHigh}°</Typography>
          </Box>

          <Box
            aria-label="low temperature"
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <Typography variant="h4">Low</Typography>
            <Typography variant="h5">{tempLow}°</Typography>
          </Box>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              border: '2px solid ',
              borderRadius: '100%',
              p: 2,
              width: 200,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', fontWeight: 'bold' }}>
              <Typography aria-label="current temperature" variant="h2" sx={{ fontSize: 80 }}>
                {currentTemp}
              </Typography>
              <Typography sx={{ alignSelf: 'flex-start', fontSize: 18 }}>°{(unit=== 'metric' ? 'C' : 'F')}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ mt: 1 }}>
            {description} <i className={weatherIconClass}></i>
          </Typography>
        </Grid>
      </Grid>
    </WeatherCard>
  );
}