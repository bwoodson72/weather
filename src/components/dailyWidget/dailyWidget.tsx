'use client'
import { Box, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { getWeatherIcon } from "@/lib/getWeatherIcon/getWeatherIcon";

type DailyWidgetProps = {
  chanceOfRain?: number;
  dayTemp?: number;
  nightTemp?: number;
  dayCode?: number;
  nightCode?: number;
  dayOfWeek?: string;
};

export function DailyWidget({
                              chanceOfRain = 0,
                              dayTemp = 0,
                              nightTemp = 0,
                              dayCode = 0,
                              nightCode = 0,
                              dayOfWeek = "Today",
                            }: DailyWidgetProps) {
  const dayIconClass = `wi ${getWeatherIcon(dayCode, true)}`;
  const nightIconClass = `wi ${getWeatherIcon(nightCode, false)}`;

  return (
      <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2, // Increased vertical padding for better readability
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            '&:last-child': { borderBottom: 'none' }
          }}
      >
        {/* 1. Day Column - Increased to body1 (1rem) */}
        <Typography sx={{ width: '70px', fontWeight: 600, fontSize: '1.1rem' }}>
          {dayOfWeek}
        </Typography>

        {/* 2. Rain Chance - Icon and Text scaled up */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '80px', ml: 1 }}>
          <WaterDropIcon sx={{ fontSize: '1.1rem', color: '#3b82f6', mr: 0.5 }} />
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
            {Math.round(chanceOfRain * 100)}%
          </Typography>
        </Box>

        {/* 3. Weather Icons - Scaled up for visual impact */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <i className={dayIconClass} style={{ fontSize: '1.5rem' }}></i>
          <i className={nightIconClass} style={{ fontSize: '1.5rem', opacity: 0.6 }}></i>
        </Box>

        {/* 4. Temp Column - Bolder and larger for the "Main" data */}
        <Box sx={{ width: '100px', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', width: '40px', textAlign: 'right' }}>
            {Math.round(dayTemp)}°
          </Typography>
          <Typography sx={{ opacity: 0.6, fontWeight: 500, fontSize: '1.1rem', width: '40px', textAlign: 'right' }}>
            {Math.round(nightTemp)}°
          </Typography>
        </Box>
      </Box>
  );
}