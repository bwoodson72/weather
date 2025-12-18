'use client'

import {Card, CardContent} from "@mui/material";
import {glassStyle} from "@/theme/glass";

export function WeatherCard({label, children}: {label: string, children: React.ReactNode}) {

    return (
        <>
    <Card aria-label={label}
          sx={{
              minWidth: 300,

              width:'100%',
              height: 'fit-content',
              // border: {xs: 'none', md: '2px solid '},

              p: 2,

              shadow: 20
              ,...glassStyle
          }}>
        <CardContent>
            {children}
        </CardContent>
    </Card>
        </>
    )
}