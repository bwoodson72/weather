'use client'
import { Button, Tooltip } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useContext } from "react";
import { LocationContext } from "@/components/locationProvider/locationProvider";
import { getReverseGeoCode } from "@/lib/getReverseGeoCode/getReverseGeoCode";
// ... existing code ...

export function LocationButton() {
  const context = useContext(LocationContext);

  const handleClick = async () => {
    if (!context) return;

    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported in this browser.");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 30_000,
          maximumAge: 60_000,
        });
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const reverse = await getReverseGeoCode(latitude, longitude);

      const displayName = reverse.state
        ? `${reverse.name}, ${reverse.state}`
        : reverse.name;

      context.setLocationCoords({ latitude: reverse.latitude, longitude: reverse.longitude });
      context.setLocationName(displayName);
    } catch (err: unknown) {
      console.error("Failed to get user location:", err);
      alert("Could not get your location. Please allow location access and try again.");
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleClick}
      sx={{ fontSize: 32, color: "white" }}
    >
      <Tooltip title="Use current location">
        <LocationOnIcon />
      </Tooltip>
    </Button>
  );
}