import Heading from "../../components/text/Heading";
import { usePlaces } from "../../redux/places/hooks/usePlaces";
import { PlaceTail } from "../components/PlaceTail";

export const DashboardPlacesPage = () => {
  const { myPlaces } = usePlaces();

  return (
    <>
      <Heading.H1 className="mb-4">Twoje miejscówki</Heading.H1>
      <div className="flex flex-col gap-y-4 py-4">
        {myPlaces.map((place) => (
          <PlaceTail
            key={place.id}
            placeId={place.id}
            name={place.name}
            description={place.description}
            status={place.status}
          />
        ))}
      </div>
    </>
  );
};
