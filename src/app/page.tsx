'use client';
import { Container, Box, Stack } from "@mui/material";
import { Temperature } from "@/components/temperature/temperature";
import { Search } from "@/components/search/search";
import { LocationWidget } from "@/components/locationWidget/locationWidget";
import { DailyWidgetContainer } from "@/components/dailyWidget/dailyWidgetContainer";
import { Hourly } from "@/components/hourly/hourly";
import { UnitToggle } from "@/components/unitToggle/unitToggle";
import '@/app/css/weather-icons.css';

export default function Home() {
    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 8 } }}>
            <Box
                sx={{
                    maxWidth: 750,
                    width: '100%',
                    mx: 'auto',
                }}
            >
                <Stack
                    spacing={{ xs: 2, md: 4 }} // Tighter spacing on mobile
                    sx={{
                        width: '100%',
                        alignItems: 'stretch',
                    }}
                >
                    {/* HEADER ROW REFACTOR:
                        We add 'minWidth: 0' and 'overflow: hidden' to prevent
                        the flex container from pushing elements off-screen.
                    */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 1, md: 2 }, // Reduce gap on mobile
                            alignItems: 'flex-start',
                            width: '100%',
                            minWidth: 0, // CRITICAL: Allows children to shrink
                        }}
                    >
                        <Box sx={{
                            flexGrow: 1,
                            minWidth: 0 // CRITICAL: Allows Search component to shrink
                        }}>
                            <Search />
                        </Box>

                        {/* Prevent the Toggle from being squished */}
                        <Box sx={{ flexShrink: 0 }}>
                            <UnitToggle />
                        </Box>
                    </Box>

                    <LocationWidget />
                    <Temperature />
                    <Hourly />
                    <DailyWidgetContainer />

                </Stack>
            </Box>
        </Container>
    );
}