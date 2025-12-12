'use client'
import {TextField, Box, Button} from "@mui/material";
import { useForm,Controller ,SubmitHandler } from "react-hook-form"


export function Search() {
    type FormData = {
        location: string;
    }
    const {control, handleSubmit} = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = (data) => {alert(JSON.stringify(data))} // Stringify to see the object in alert
    return (
        <Box component='form'
             onSubmit={handleSubmit(onSubmit)}
             sx={{display:'flex', justifyContent:'center', gap: 2, width: '100%', mt: 2}}> {/* Added gap and width */}
            <Controller
                render={({field})=>
                <TextField 
                    {...field} 
                    // REMOVED: component='input' 
                    label='Enter location'
                    sx={{
                        width: {xs: '100%', md: '30%'},
                        boxShadow: 20, // shadow -> boxShadow in sx
                        backgroundColor: 'rgba(0,0,0, 0.2)',
                        // fontSize on the root doesn't affect input text directly, usually fine though
                    }}
                />} 
                name='location' 
                control={control} 
                defaultValue=''
            />

         <Button type='submit' variant="contained">Search</Button> {/* Added variant for better visibility */}
        </Box>
    )
}