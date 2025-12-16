

'use client'
import { TextField, Box, Button, Chip } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo, useState, useContext } from "react";
import { getGeoCode, type GeoCodeResponse } from "@/lib/getGeoCode/getGeoCode";
import { LocationContext } from "@/components/locationProvider/locationProvider";
import { LocationButton } from "@/components/locationButton/locationButton";
import { CityPicker } from "@/components/cityPicker/cityPicker";

type FormData = {
  location: string;
};

export function Search() {
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<GeoCodeResponse[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const locationContext = useContext(LocationContext);

  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { location: "" },
  });

  const query = watch("location");

  useEffect(() => {
    const q = (query ?? "").trim();

    // Only start querying after 3+ characters
    if (q.length < 3) {
      setCities([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const results = await getGeoCode(q); // ✅ returns GeoCodeResponse[]
        if (!cancelled) {
          setCities(results); // ✅ store results in cities state
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setCities([]);
          setError(e instanceof Error ? e.message : "Failed to search locations.");
        }
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const firstCity = useMemo(() => cities[0], [cities]);

  const applyLocation = (picked: GeoCodeResponse) => {
    if (!locationContext) return;

    locationContext.setLocationCoords({
      latitude: picked.latitude,
      longitude: picked.longitude,
    });

    locationContext.setLocationName(
      picked.state ? `${picked.name}, ${picked.state}` : picked.name
    );
    reset();
    
  };

  const onSubmit: SubmitHandler<FormData> = async ({ location }) => {
    const q = location.trim();
    if (!q || !locationContext) return;

    try {
      // If user submits and we already have suggestions, use the first result
      if (firstCity) {
        applyLocation(firstCity);
        reset();
        setCities([]);
        setError(null);
        return;
      }

      // Otherwise fetch and use the first returned result
      const results = await getGeoCode(q);
      const first = results[0];
      applyLocation(first);

      reset();
      setCities([]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred during geocoding.");
    }
  };

  return (
      <>
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", justifyContent: "center", width: "100vw", gap: 1, m: 1, p: 2 }}
      >
        <LocationButton />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Enter City Name or Zip Code"
              helperText={isSearching && "Searching..."}
              sx={{
                width: { xs: "80%", md: "50%" },
                  height: 'fit-content',
                boxShadow: 20,
                backgroundColor: "rgba(0,0,0, 0.2)",
              }}
            />
          )}
        />
        <Button type="submit" variant="contained" >Search</Button>
      </Box>



      {error && (
        <Chip
          label={error}
          variant="outlined"
          sx={{ color: "white", backgroundColor: "rgba(255, 0, 0, 0.5)" }}
        />
      )}
        {/* ✅ CityPicker shows below input; selecting updates location context */}
        {cities.length > 0 && (
            <CityPicker
                cities={cities}
                onPick={applyLocation}
            />
        )}
    </Box>

   </>
  );
}