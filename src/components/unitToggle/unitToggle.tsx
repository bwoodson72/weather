'use client'
import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "@/components/weatherProvider/weatherProvider";

export function UnitToggle() {
  const context = useContext(WeatherContext);

  const handleClick = () => {
    if (!context) return;
    context.setUnit(context.unit === "metric" ? "imperial" : "metric");
  };

  const isMetric = context?.unit === "metric";

  return (
      <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            // 1. Match the Search component's responsive heights exactly
            height: { xs: '44px', sm: '56px' },
            // 2. Square-ish on mobile, wider on desktop
            minWidth: { xs: '44px', sm: '64px' },
            borderRadius: '12px',
            p: { xs: 0, sm: 2 },
            backgroundColor: '#3b82f6',
            '&:hover': { backgroundColor: '#2563eb' },
            // Ensure it doesn't shrink or grow in the header flexbox
            flexShrink: 0,
          }}
      >
        <Typography
            variant="button"
            sx={{
              fontSize: { xs: '0.8rem', sm: '1rem' },
              fontWeight: 'bold'
            }}
        >
          {isMetric ? "°C" : "°F"}
        </Typography>
      </Button>
  );
}