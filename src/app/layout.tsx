

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {ClientThemeProvider} from "@/components/clientThemeProvider/clientThemeProvider";
import {LocationProvider} from "@/components/locationProvider/locationProvider";
import {WeatherProvider} from "@/components/weatherProvider/weatherProvider";
import {Background} from "@/components/background/background";
import { Metadata} from "next";
import React from "react";

/**
 * Next.js metadata describing the application.
 */
export const metadata: Metadata = {
  title: "Weather App",
  description: "Fetch the weather in your city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Root layout for the app. Wraps all pages with:
   * - AppRouterCacheProvider: MUI provider optimized for the Next.js App Router.
   * - LocationProvider: shares selected location (coords + name).
   * - WeatherProvider: fetches and exposes weather + units via context.
   * - ClientThemeProvider: sets up the MUI theme.
   * - Background: decorative background reacting to theme/weather.
   */
  return (
    <html lang="en">
      <body >

      <AppRouterCacheProvider>
          <LocationProvider>
          <WeatherProvider>
          <ClientThemeProvider>
              <Background/>
        {children}
          </ClientThemeProvider>
          </WeatherProvider>
          </LocationProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
