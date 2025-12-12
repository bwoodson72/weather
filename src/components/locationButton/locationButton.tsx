'use client'
import {Button} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function LocationButton() {
    return (
        <Button variant='text'
                onClick={() => alert('Not implemented yet')}
                sx={{fontSize:32}}>
            <LocationOnIcon/>
        </Button>
    )
}