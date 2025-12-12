'use client'
import {Typography, Box, Grid, Card, CardContent} from '@mui/material';
import {WeatherCard}     from "@/components/card/weatherCard";

export function Temperature() {

    return (
        <WeatherCard label='temperature' >

            <Grid container spacing={2} gap={2}>
                <Grid size ={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                }}>
                    <Box aria-label='high'>
                     <Typography variant = 'h4'>High</Typography>
                    <Typography variant = 'h5'>12°</Typography>
                    </Box>
                    <Box aria-label='low'>
                     <Typography variant = 'h4'>Low</Typography>
                    <Typography variant = 'h5'>0°</Typography>
                    </Box>
                </Grid>

                <Grid size={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
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
                        <Box sx={{display: 'flex', fontWeight: 'bold'}}>
                    <Typography variant = 'h2' sx={{fontSize:80}}>10</Typography>
                        <Typography sx={{alignSelf:'flex-start',  fontSize: 18 }} >°C</Typography>
                        </Box>
                    </Box>

                </Grid>
            </Grid>

        </WeatherCard>
    )
}

