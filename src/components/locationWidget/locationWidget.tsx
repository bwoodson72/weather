'use client'

import {Typography} from "@mui/material";
import {Box} from "@mui/material";
import {useContext} from "react";
import {LocationContext} from "@/components/locationProvider/locationProvider";

export function LocationWidget() {
    const context = useContext(LocationContext);

    // Guard clause: ensure context exists
    if (!context) {
        // You can return null, a loading spinner, or an error message
        return null;
    }

    const {locationName} = context;

    return (
        <Box sx={{display:'flex', justifyContent:'flexStart'}}>
            <Typography variant='h4' component='h1'>{locationName} </Typography>

        </Box>
    )
}