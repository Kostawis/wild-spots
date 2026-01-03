import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { CenterMapOnChange } from "../../map/helpers/CenterMapOnChange";

type MapInput = {
  value: { lat: number; lng: number };
  onChange: (value: { lat: number; lng: number }) => void;
};

export const MapInput = ({ value, onChange }: MapInput) => {
  const { lat, lng } = value;

  return (
    <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        dragging={false}
        scrollWheelZoom={false}
        className="size-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CenterMapOnChange lat={lat} lng={lng} />

        <Marker
          position={[lat, lng]}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const pos = e.target.getLatLng();
              onChange({ lat: pos.lat, lng: pos.lng });
            },
          }}
        />
      </MapContainer>
    </div>
  );
};
