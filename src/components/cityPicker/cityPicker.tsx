'use client'
import { Card, CardContent, Chip } from "@mui/material";
import type { GeoCodeResponse } from "@/lib/getGeoCode/getGeoCode";

export function CityPicker({
  cities,
  onPick,
}: {
  cities: GeoCodeResponse[];
  onPick: (city: GeoCodeResponse) => void;
}) {
  return (
    <Card sx={{
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
      <CardContent sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {cities.map((city) => {
          const label = city.state ? `${city.name}, ${city.state}` : city.name;
          return (
            <Chip
              key={`${city.name}-${city.state ?? ""}-${city.latitude}-${city.longitude}`}
              label={label}
              onClick={() => onPick(city)}
              clickable
              sx={{ cursor: 'pointer', fontSize: '1rem' }}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}