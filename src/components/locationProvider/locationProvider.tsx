'use client'
import React, {createContext, useState, Dispatch, SetStateAction} from 'react';

// 1. Define the shape of your location data
interface LocationData {
    name: string;
    latitude: number;
    longitude: number;
}

// 2. Define the shape of the Context
interface LocationContextType {
    location: LocationData;
    setLocation: Dispatch<SetStateAction<LocationData>>;
}

// 3. Create context with a default value (or undefined/null if you prefer)
// Using 'undefined' as default forces consumers to be inside the Provider
export const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({children}: {children: React.ReactNode}) {
  const [location, setLocation] = useState<LocationData>({name:'-', latitude:0, longitude:0});

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      {children}
    </LocationContext.Provider>
  );
}