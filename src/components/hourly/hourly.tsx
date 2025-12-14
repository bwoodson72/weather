'use client'
import { HourlyWidget } from "@/components/hourlyWidget/hourlyWidget";
import { Card, CardContent, CircularProgress, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "@/components/weatherProvider/weatherProvider";

function formatHourLabel(unixSeconds: number): string {
  // Example output: "6pm"
  return new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  }).toLowerCase();
}

export function Hourly() {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) return null;

  const { weather, isLoading, error, isDay } = weatherCtx;

  if (error) {
    return (
      <Card aria-label="hourly" sx={{ minWidth: 300, maxWidth: 375, width: { xs: '100%', sm: 'fit-content' }, borderRadius: 1, p: 2, backgroundColor: 'rgba(0,0,0, 0.2)', backdropFilter: 'blur(10px)' }}>
        <Box display="flex" justifyContent="center" alignItems="center" height={120}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Card>
    );
  }

  if (isLoading || !weather) {
    return (
      <Card aria-label="hourly" sx={{ minWidth: 300, maxWidth: 375, width: { xs: '100%', sm: 'fit-content' }, borderRadius: 1, p: 2, backgroundColor: 'rgba(0,0,0, 0.2)', backdropFilter: 'blur(10px)' }}>
        <Box display="flex" justifyContent="center" alignItems="center" height={120}>
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  const hours = weather.hourly ?? [];

  return (
    <Card
      aria-label="hourly"
      sx={{
        minWidth: 300,
        // maxWidth: 375,
        width: { xs: '100%', sm: 'fit-content'  },
        height: 'fit-content',
        overflowX: 'scroll',
        borderRadius: 1,
        p: 2,
        backgroundColor: 'rgba(0,0,0, 0.2)',
        backdropFilter: 'blur(10px)',
        shadow: 20
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        {hours.slice(0, 9).map((h) => (
          <HourlyWidget
            key={h.dt}
            timeLabel={formatHourLabel(h.dt)}
            temperature={h.temp}
            weatherCode={h.weather?.[0]?.id ?? 0}
            isDay={isDay}
          />
        ))}
      </CardContent>
    </Card>
  );
}