import { useEffect, useState } from "react";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSearchParams } from "react-router-dom";
import { PlaceDetails } from "../components/molecules/PlaceDetails";
import { PlaceDrawer } from "../components/molecules/PlaceDrawer";
import { CreateNewPlace } from "../map/components/CreateNewPlace";
import { createClusterCustomIcon } from "../map/helpers/createClusterCustomIcon";
import { createMarkerIcon } from "../map/helpers/createMarkerIcon";
import { FlyToPlace } from "../map/helpers/FlyToPlace";
import { MapEvents, MapState } from "../map/helpers/MapEvents";
import { ResizeMap } from "../map/helpers/ResizeMap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { usePlaces } from "../redux/places/hooks/usePlaces";
import { selectSelectedPlace } from "../redux/places/placesSelectors";
import { resetPlaceDetails, selectPlace } from "../redux/places/placesSlice";

const HomePage = () => {
  const { placesByStatus } = usePlaces();
  const currentPlace = useAppSelector(selectSelectedPlace);
  const dispatch = useAppDispatch();

  const [mapState, setMapState] = useState<MapState>({
    lat: 51.944,
    lng: 19.323,
    zoom: 7,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const onPlaceClick = (placeId: number) => {
    dispatch(selectPlace(placeId));
    setSearchParams({ place: placeId.toString() });
  };

  useEffect(() => {
    const placeId = searchParams.get("place");
    if (placeId) {
      dispatch(selectPlace(placeId));
    } else {
      dispatch(resetPlaceDetails());
    }
  }, [searchParams, dispatch]);

  return (
    <>
      <div className="flex flex-1">
        <section className="flex-1" data-tour="map">
          <MapContainer
            center={[mapState.lat, mapState.lng]}
            zoom={mapState.zoom}
            scrollWheelZoom={true}
            className="size-full"
          >
            <ResizeMap trigger={currentPlace} />
            <MapEvents onChange={setMapState} />

            <FlyToPlace
              lat={currentPlace?.lat || mapState.lat}
              lng={currentPlace?.lng || mapState.lng}
              zoom={currentPlace ? 16 : mapState.zoom}
            />

            <CreateNewPlace />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              {Object.entries(placesByStatus).map(([category, places]) => (
                <LayersControl.Overlay checked name={category} key={category}>
                  <MarkerClusterGroup
                    key={category}
                    chunkedLoading
                    maxClusterRadius={80}
                    spiderfyOnMaxZoom
                    showCoverageOnHover={false}
                    iconCreateFunction={createClusterCustomIcon}
                  >
                    {places.map((place) => (
                      <Marker
                        key={place.id}
                        position={[place.lat, place.lng]}
                        icon={createMarkerIcon(
                          place.category,
                          currentPlace?.id === place.id,
                        )}
                        eventHandlers={{
                          click: () => onPlaceClick(place.id),
                        }}
                      />
                    ))}
                  </MarkerClusterGroup>
                </LayersControl.Overlay>
              ))}
            </LayersControl>
          </MapContainer>
        </section>

        {currentPlace && (
          <section className="hidden w-3/12 min-w-96 max-w-[30rem] border-l py-6 xl:block">
            <PlaceDetails place={currentPlace} />
          </section>
        )}
      </div>

      <PlaceDrawer />
    </>
  );
};

export default HomePage;
