import { useMapEvents } from "react-leaflet";

export type MapState = {
  lat: number;
  lng: number;
  zoom: number;
};

export const MapEvents = ({
  onChange,
}: {
  onChange: (state: MapState) => void;
}) => {
  useMapEvents({
    moveend: (map) => {
      const center = map.target.getCenter();
      const zoom = map.target.getZoom();

      onChange({
        lat: center.lat,
        lng: center.lng,
        zoom,
      });
    },
    zoomend: (map) => {
      const center = map.target.getCenter();
      const zoom = map.target.getZoom();

      onChange({
        lat: center.lat,
        lng: center.lng,
        zoom,
      });
    },
  });

  return null;
};
