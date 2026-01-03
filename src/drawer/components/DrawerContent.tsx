import { useSelector } from "react-redux";
import { PlaceForm } from "../../components/forms/PlaceForm";
import Heading from "../../components/text/Heading";
import { RootState } from "../../redux/store";

export const DrawerContent = () => {
  const { type, placeId } = useSelector((s: RootState) => s.drawer);

  switch (type) {
    // case "place-details":
    //   return <PlaceDetails placeId={payload.placeId} />;

    case "create-place":
      return (
        <>
          <Heading.H3 className="px-3 mt-2 mb-4">Dodaj miejscówkę</Heading.H3>
          <PlaceForm placeId={placeId} />
        </>
      );

    // case "edit-place":
    //   return <EditPlaceForm placeId={payload.placeId} />;

    default:
      return null;
  }
};
