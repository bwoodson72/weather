

'use client'
import {TextField, Box, Button, Typography, Chip} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { getGeoCode } from "@/lib/getGeoCode/getGeoCode";
import {useState, useContext} from "react";
import {LocationContext} from "@/components/locationProvider/locationProvider";
import {LocationButton} from "@/components/locationButton/locationButton";

export function Search() {
    // FIX: Type the error state properly
    const [error, setError] = useState<string | null>(null);
    const locationContext = useContext(LocationContext);
    type FormData = {
        location: string;
    }

    const { control, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            location: ''
        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {


        try {
            const response = await getGeoCode(data.location);
            locationContext?.setLocation(response);
            reset();
            setError(null); // Clear error on success
        } catch (e) {
            if (e instanceof Error) {
                // If it is a standard error, use its message
                setError(e.message);
                reset()
            } else if (typeof e === 'string') {
                // Handle if a string was thrown
                setError(e);
                reset();
            } else {
                // Handle all other unknown or complex error types
                setError("An unknown error occurred during geocoding.");
                reset();
            }

        }
    };

    return (
        <>
            <Box sx={{width: '100vw', display:'flex', flexDirection:'column', alignItems:'center', gap:1}}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{display:'flex', justifyContent:'center',width:'100vw', gap: 1, m: 1, p:2}}>
            <LocationButton />
            <Controller
                render={({field}) => (
                    <TextField 
                        {...field}
                        label='Enter location'
                        sx={{
                            width: {xs: '80%', md: '50%'},
                            boxShadow: 20,
                            backgroundColor: 'rgba(0,0,0, 0.2)',
                        }}
                    />
                )} 
                name='location' 
                control={control}
            />
            <Button type='submit' variant="contained">Search</Button>
        </Box>

        {error && <Chip label={error}  variant='outlined' sx={{color:'white',backgroundColor: 'rgba(255, 0, 0, 0.5)'}} />}
            </Box>
        </>
    )
}