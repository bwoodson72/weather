'use client'
import {Typography} from '@mui/material';
import {WeatherCard} from "@/components/card/weatherCard";
import '@/app/css/weather-icons.css'


export function Weather() {
    return (
        <WeatherCard label='weather'
      >

            <Typography variant = 'h3'>Sunny <i className=' wi wi-wu-sunny'></i></Typography>

        </WeatherCard>
    )
}