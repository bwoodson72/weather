'use client'

import { Box } from '@mui/material';
import Image from 'next/image';
import {styled} from "@mui/material/styles";

const BackgroundImage = styled(Image)({
    objectFit: 'cover',
    zIndex: -1,
    filter: 'brightness(40%)',
    width: '100vw',
    height: '100vh',
});

export function Background() {
    return (
        <Box aria-label='background'
             sx={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:-1}}
        >
            <BackgroundImage src='/weather-background/sunny.jpg' alt='background' width={1000} height={1000}/>
        </Box>
    )
}