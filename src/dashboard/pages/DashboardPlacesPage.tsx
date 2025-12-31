import Heading from "../../components/text/Heading";
import { PlaceTail } from "../components/PlaceTail";
import { usePlaces } from "../../redux/places/hooks/usePlaces";

export const DashboardPlacesPage = () => {
  const { myPlaces } = usePlaces();

  return (
    <>
      <Heading.H1 className="mb-4">Twoje miejscówki</Heading.H1>
      <div className="flex flex-col gap-y-4">
        {myPlaces.map((place) => (
          <PlaceTail
            key={place.id}
            name={place.name}
            description={place.description}
            status={place.status}
          />
        ))}
      </div>
    </>
  );
};
