'use client'
import { TextField, Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useEffect, useMemo, useState, useContext } from "react";
import { getGeoCode, type GeoCodeResponse } from "@/lib/getGeoCode/getGeoCode";
import { LocationContext } from "@/components/locationProvider/locationProvider";
import { LocationButton } from "@/components/locationButton/locationButton";
import { CityPicker } from "@/components/cityPicker/cityPicker";
import { glassStyle } from "@/theme/glass";

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
                const results = await getGeoCode(q);
                if (!cancelled) {
                    setCities(results);
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
        setCities([]);
    };

    const onSubmit: SubmitHandler<FormData> = async ({ location }) => {
        const q = location.trim();
        if (!q || !locationContext) return;

        try {
            if (firstCity) {
                applyLocation(firstCity);
                return;
            }
            const results = await getGeoCode(q);
            if (results[0]) applyLocation(results[0]);
        } catch (e) {
            setError(e instanceof Error ? e.message : "An unknown error occurred.");
        }
    };

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    alignItems: "center", // Center items for better mobile alignment
                    width: "100%",
                    gap: { xs: 0.5, sm: 1 }
                }}
            >
                {/* Scale the location button container on mobile to save space */}
                <Box sx={{ flexShrink: 0, transform: { xs: 'scale(0.85)', sm: 'none' } }}>
                    <LocationButton />
                </Box>

                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            // FIXED: Standard string label for desktop
                            label="Enter City Name or Zip Code"
                            // ADDED: Placeholder provides the hint when the label is hidden on mobile
                            placeholder="City or Zip..."
                            fullWidth
                            variant="outlined"
                            error={!!error}
                            sx={{
                                flexGrow: 1,
                                minWidth: 0,
                                ...glassStyle,
                                '& .MuiOutlinedInput-root': {
                                    height: { xs: '44px', sm: '56px' },
                                    borderRadius: '12px',
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                },
                                // CSS FIX: Hide the floating label on mobile via breakpoints
                                '& .MuiInputLabel-root': {
                                    display: { xs: 'none', sm: 'block' }
                                },
                                // Ensure the notched outline doesn't leave a gap when label is hidden
                                '& .MuiOutlinedInput-notchedOutline': {
                                    '& legend': {
                                        display: { xs: 'none', sm: 'block' }
                                    }
                                },
                                '& .MuiFormHelperText-root': {
                                    display: { xs: 'none', sm: 'block' },
                                    position: 'absolute',
                                    bottom: -20
                                }
                            }}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        height: { xs: '44px', sm: '56px' },
                        minWidth: { xs: '44px', sm: '100px' },
                        width: { xs: '44px', sm: 'auto' },
                        borderRadius: '12px',
                        backgroundColor: '#3b82f6',
                        flexShrink: 0,
                        p: { xs: 0, sm: 2 },
                        '&:hover': { backgroundColor: '#2563eb' }
                    }}
                >
                    {/* Switch between Icon and Text using display breakpoints */}
                    <SearchIcon sx={{ display: { xs: 'block', sm: 'none' }, fontSize: '1.2rem' }} />
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Search
                    </Box>
                </Button>
            </Box>

            {cities.length > 0 && (
                <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, mt: 1 }}>
                    <CityPicker cities={cities} onPick={applyLocation} />
                </Box>
            )}
        </Box>
    );
}