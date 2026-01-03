import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  lat: number;
  lng: number;
};

export const CenterMapOnChange = ({ lat, lng }: Props) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
};
