'use client'
import { Typography, Box, Grid, CircularProgress } from '@mui/material';
import { WeatherCard } from "@/components/card/weatherCard";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "@/components/locationProvider/locationProvider";
import { getCurrentWeather, CurrentWeatherResponse } from "@/lib/getCurrentWeather/getCurrentWeather";
import {toTitleCase} from "@/lib/toTitleCase/toTitleCase";

// 1. Define initial state for the weather data
type WeatherData = CurrentWeatherResponse | null;

export function Temperature() {
    const context = useContext(LocationContext);
    const locationCoords = context?.locationCoords;

    const [weatherData, setWeatherData] = useState<WeatherData>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!locationCoords) return;
        console.log('locationCoords changed: ', locationCoords.latitude, locationCoords.longitude, ' ');
        const fetchWeather = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getCurrentWeather(
                    locationCoords.latitude,
                    locationCoords.longitude
                );
                setWeatherData(data);
                console.log('weatherData changed: ', data);
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError("Failed to load weather data.");
                setWeatherData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [locationCoords]);

    // ... existing code ...
    if (error) {
        return (
            <WeatherCard label="temperature">
                <Box display="flex" justifyContent="center" alignItems="center" height={250}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </WeatherCard>
        );
    }

    if (isLoading || !weatherData) {
        return (
            <WeatherCard label="temperature">
                <Box display="flex" justifyContent="center" alignItems="center" height={250}>
                    <CircularProgress />
                </Box>
            </WeatherCard>
        );
    }

    const current = weatherData.current;

    if (!current) {
        return (
            <WeatherCard label="temperature">
                <Box display="flex" justifyContent="center" alignItems="center" height={250}>
                    <Typography color="error">Weather data is incomplete.</Typography>
                </Box>
            </WeatherCard>
        );
    }

    const currentTemp = Math.round(current.temperature_2m ?? 0);
    const description = current.description != null ? `${current.description}` : "Current";
    const highTemp = Math.round(current.temp_max ?? 0);
    const lowTemp = Math.round(current.temp_min ?? 0);
    const weatherIconClass =
        current.weather_code != null ? `wi wi-owm-${current.weather_code}` : "wi wi-na";

    return (
        <WeatherCard label="temperature">
            <Grid container spacing={2} gap={2}>
                <Grid
                    size={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                    }}
                >
                    <Box aria-label="high">
                        <Typography variant="h4">High</Typography>
                        <Typography variant="h5">{highTemp}</Typography>
                    </Box>
                    <Box aria-label="low">
                        <Typography variant="h4">Low</Typography>
                        <Typography variant="h5">{lowTemp}</Typography>
                    </Box>
                </Grid>

                <Grid
                    size={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
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
                            <Typography variant="h2" sx={{ fontSize: 80 }}>
                                {currentTemp}
                            </Typography>
                            <Typography sx={{ alignSelf: 'flex-start', fontSize: 18 }}>°C</Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid
                    size={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h5">
                        {toTitleCase(description)} <i className={weatherIconClass}></i>
                    </Typography>
                </Grid>
            </Grid>
        </WeatherCard>
    );
}