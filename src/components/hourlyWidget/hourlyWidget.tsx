'use client'
import {Stack, Typography} from "@mui/material";

export function HourlyWidget() {
    return (
        <Stack spacing={1} sx={{m:1, alignItems:'center' }} >
            <Typography variant='body1'>6pm</Typography>
            <Typography variant='body1'><i className="wi wi-day-sunny"></i></Typography>
            <Typography variant='body1'> 72°F</Typography>
        </Stack>
    )
}