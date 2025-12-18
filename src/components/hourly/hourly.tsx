'use client'
import { HourlyWidget } from "@/components/hourlyWidget/hourlyWidget";
import { Card, CircularProgress, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "@/components/weatherProvider/weatherProvider";
import { glassStyle } from "@/theme/glass";

function formatHourLabel(unixSeconds: number): string {
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
            <Card sx={{ width: '100%', p: 2, ...glassStyle }}>
                <Typography color="error">{error}</Typography>
            </Card>
        );
    }

    if (isLoading || !weather) {
        return (
            <Card sx={{ width: '100%', p: 2, ...glassStyle }}>
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            </Card>
        );
    }

    const hours = weather?.hourly ?? [];

    return (
        <Card
            aria-label="hourly"
            sx={{
                width: '100%', // UNIFORM WIDTH: Stretch to fill parent
                maxWidth: 'none', // Remove caps that cause misalignment
                p: 1,
                ...glassStyle,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    width: '100%', // Ensure the scroll area fills the card
                    gap: 1,
                    p: 1,
                    '&::-webkit-scrollbar': { height: '6px' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        border: '2px solid transparent',
                        backgroundClip: 'content-box',
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
                }}
            >
                {hours.slice(0, 12).map((h) => (
                    <Box key={h.dt} sx={{ flexShrink: 0 }}>
                        <HourlyWidget
                            timeLabel={formatHourLabel(h.dt)}
                            temperature={h.temp}
                            weatherCode={h.weather?.[0]?.id ?? 0}
                            isDay={isDay}
                        />
                    </Box>
                ))}
            </Box>
        </Card>
    );
}