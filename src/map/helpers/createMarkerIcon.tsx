import L from "leaflet";
import { Enums } from "../../supabase/database.types";

export const createMarkerIcon = (
  status: Enums<"place_category">,
  active: boolean,
) =>
  L.divIcon({
    className: "",
    html: `<div class="marker ${active ? "marker--active" : ""} marker--${status}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
  });
