'use client'
import {Button} from "@mui/material";
import {useContext} from "react";
import {WeatherContext} from "@/components/weatherProvider/weatherProvider";


export function UnitToggle() {
const context = useContext(WeatherContext);

  const handleClick = () => {
    if (!context) return;

    if (context.unit === "metric") {
      context.setUnit("imperial");
    } else {
      context.setUnit("metric");
    }
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      C/F
    </Button>
  );
}