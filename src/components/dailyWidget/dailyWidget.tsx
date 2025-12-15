'use client'
import { Box, Grid, Typography } from "@mui/material";
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
    <Box sx={{ width: { xs: "100%", md: "400px" }, mt: 1.5 }}>
      <Grid container spacing={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Grid size={2}>
          <Typography variant="body1">{dayOfWeek}</Typography>
        </Grid>

        <Grid size={3} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }} >
          <Typography variant="body1" sx={{ fontSize: ".7rem", textAlign: "left", display: "flex", alignItems: "center" }}>
            <WaterDropIcon />{Math.round(chanceOfRain * 100)}%
          </Typography>
        </Grid>

        <Grid size={3}>
          <Box sx={{ display: "flex", justifyContent: "space-around", ml: 1 }}>
            <Typography variant="body1">
              <i className={dayIconClass}></i>
            </Typography>

            <Typography variant="body1">
              <i className={nightIconClass}></i>
            </Typography>
          </Box>
        </Grid>

        <Grid size={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", ml: 1 }}>
            <Typography>{Math.round(dayTemp)}°</Typography>
            <Typography>{Math.round(nightTemp)}°</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}