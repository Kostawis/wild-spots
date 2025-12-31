import { useSelector } from "react-redux";
import { PlaceForm } from "../../components/forms/PlaceForm";
import Heading from "../../components/text/Heading";
import { RootState } from "../../redux/store";

export const DrawerContent = () => {
  const { type } = useSelector((s: RootState) => s.drawer);

  switch (type) {
    // case "place-details":
    //   return <PlaceDetails placeId={payload.placeId} />;

    case "create-place":
      return (
        <div className="mb-4">
          <Heading.H3 className="mb-4 mt-2 px-3">Dodaj miejscówkę</Heading.H3>
          <PlaceForm />
        </div>
      );

    // case "edit-place":
    //   return <EditPlaceForm placeId={payload.placeId} />;

    default:
      return null;
  }
};
