'use client'

import {Card, CardContent} from "@mui/material";

export function WeatherCard({label, children}: {label: string, children: React.ReactNode}) {

    return (
        <>
    <Card aria-label={label}
          sx={{
              minWidth: 300,

              width: {xs: '100%', sm: 'fit-content'  },
              height: 'fit-content',
              // border: {xs: 'none', md: '2px solid '},
              borderRadius: 1,
              p: 2,
              backgroundColor: 'rgba(0,0,0, 0.2)',
              backdropFilter: 'blur(10px)',
              shadow: 20
          }}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
        </>
    )
}