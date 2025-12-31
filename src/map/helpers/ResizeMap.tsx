import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const ResizeMap = ({ trigger }: { trigger: any }) => {
  const map = useMap();

  useEffect(() => {
    requestAnimationFrame(() => {
      map.invalidateSize();
    });
  }, [trigger]);

  return null;
};
