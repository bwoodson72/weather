'use client'
import React, {createContext, useState, Dispatch, SetStateAction} from 'react';

// 1. Define the shape of your location data
interface LocationData {
  latitude: number;
  longitude: number;
}

// 2. Define the shape of the Context
interface LocationContextType {
  locationCoords: LocationData;
  setLocationCoords: Dispatch<SetStateAction<LocationData>>;
  locationName: string;
  setLocationName: Dispatch<SetStateAction<string>>;
}

// 3. Create context with a default value (or undefined/null if you prefer)
export const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({children}: {children: React.ReactNode}) {
  const [locationCoords, setLocationCoords] = useState<LocationData>({latitude:51.5074, longitude:0.1278});
const [locationName, setLocationName] = useState<string>('London, England');
  return (
    <LocationContext.Provider value={{locationCoords, setLocationCoords, locationName, setLocationName}}>
      {children}
    </LocationContext.Provider>
  );
}