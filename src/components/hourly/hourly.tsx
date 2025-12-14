'use client'
import {HourlyWidget} from "@/components/hourlyWidget/hourlyWidget";
import {Card, CardContent} from "@mui/material";

export function Hourly() {
    return (
        <Card aria-label='hourly' sx={{
            minWidth: 300,
            maxWidth: 375,
            width: {xs: '100%', sm: 'fit-content'  },
            height: 'fit-content',
            overflowX:'scroll',
            borderRadius: 1,
            p: 2,
            backgroundColor: 'rgba(0,0,0, 0.2)',
            backdropFilter: 'blur(10px)',
            shadow: 20
        }}>
            <CardContent sx={{ display:'flex', justifyContent: 'flex-start', alignItems:'center'}}>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
                <HourlyWidget/>
            </CardContent>
        </Card>
    )
}