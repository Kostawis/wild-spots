import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { PlaceForm } from "../../components/forms/PlaceForm";
import { useSession } from "../../context/sessionContext";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { useModal } from "../../modal/hooks/useModal";
import { setCreateCoordinates } from "../../redux/coordinates/placeCoordinatesSlice";
import { openDrawer } from "../../redux/drawer/drawerSlice";
import { useAppDispatch } from "../../redux/hooks";
import { MapContextMenu } from "./MapContextMenu";

export type MapClickContext = {
  latlng: L.LatLng;
  point: L.Point;
} | null;

export const CreateNewPlace = () => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { openMainModal } = useModal();
  const { isMobile } = useWindowWidthState();

  const [clickContext, setClickContext] = useState<MapClickContext>(null);

  useMapEvents({
    click(e) {
      if (!session?.user) {
        alert("Żeby dodać miejscówkę musisz być zalogowany");
        return;
      }
      if (clickContext) return;

      dispatch(
        setCreateCoordinates({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }),
      );

      setClickContext({
        point: e.containerPoint,
        latlng: e.latlng,
      });
    },
  });

  return clickContext ? (
    <MapContextMenu
      clickContext={clickContext}
      onClose={() => setClickContext(null)}
      onAddPlace={() => {
        setClickContext(null);
        if (isMobile) {
          dispatch(
            openDrawer({
              type: "create-place",
            }),
          );
        } else {
          openMainModal({
            title: "Dodaj miejscówkę",
            content: <PlaceForm />,
          });
        }
      }}
    />
  ) : null;
};
