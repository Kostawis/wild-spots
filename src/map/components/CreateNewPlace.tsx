import { PlaceForm } from "../../components/forms/PlaceForm";
import { useModal } from "../../modal/hooks/useModal";
import { useAppDispatch } from "../../redux/hooks";
import { useSession } from "../../context/sessionContext";
import { useMapEvents } from "react-leaflet";
import { setCreateCoordinates } from "../../redux/coordinates/placeCoordinatesSlice";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { openDrawer } from "../../redux/drawer/drawerSlice";

export const CreateNewPlace = () => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { openMainModal } = useModal();
  const { isMobile } = useWindowWidthState();

  useMapEvents({
    click(e) {
      if (!session?.user) return;

      dispatch(setCreateCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng }));

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
    },
  });

  return null;
};
