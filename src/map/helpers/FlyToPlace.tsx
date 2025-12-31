import { useEffect } from "react";
import { useMap } from "react-leaflet";

type MapFlyToProps = {
  lat: number;
  lng: number;
  zoom?: number;
};

export const FlyToPlace = ({ lat, lng, zoom = 16 }: MapFlyToProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 0.8,
    });
  }, [lat, lng, zoom, map]);

  return null;
};
