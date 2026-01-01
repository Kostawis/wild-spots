import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { format } from "date-fns";
import { FC } from "react";
import { PlaceWithAuthor } from "../../redux/places/placesSlice";
import { sharePlace } from "../../utils/sharePlace";
import { Tag } from "../atoms/Tag";
import Button from "../Button";
import { DirectionsButton } from "../DirectionsButton";
import HorizontalSeparator from "../HorizontalSeparator";
import Heading from "../text/Heading";
import Paragraph from "../text/Paragraph";
import ProfileImage from "./ProfileImage";

type PlaceDetailsType = {
  place: PlaceWithAuthor;
  isLastSnap?: boolean;
};

export const PlaceDetails: FC<PlaceDetailsType> = ({
  place,
  isLastSnap = true,
}) => {
  return (
    <div
      className={classNames("flex-1 px-4", {
        "overflow-y-auto": isLastSnap,
      })}
    >
      <div className="flex justify-between">
        <Heading.H2 noMargin className="line-clamp-1" title={place.name}>
          {place.name}
        </Heading.H2>
        <Button
          color="transparent"
          onClick={() => sharePlace(place.id, place.name)}
          title="Udostępnij"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </Button>
      </div>
      <div className="-ml-1 mt-1 flex gap-x-1">
        <Tag variant="category" value={place.category} />
        {place.terrain_types.map((type) => (
          <Tag key={type} variant="terrain" value={type} />
        ))}
      </div>

      <HorizontalSeparator className="my-3" />

      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProfileImage
            size="xs"
            username={place.author_profile?.username}
            avatarUrl={place.author_profile?.avatar_url}
          />
          <Heading.H3 noMargin className="shrink-0">
            {place.author_profile?.username || "Deleted User"}
          </Heading.H3>
        </div>
        <Paragraph className="w-full text-right text-gray-500">
          {format(place.created_at, "dd.MM.yyyy")}
        </Paragraph>
      </div>

      <HorizontalSeparator className="my-3" />
      {place.description && (
        <>
          <Heading.H3 noMargin className="shrink-0">
            Opis
          </Heading.H3>
          <Paragraph>{place.description}</Paragraph>

          <HorizontalSeparator className="my-3" />
        </>
      )}

      <DirectionsButton
        className="w-full"
        lat={place.lat ?? 0}
        lng={place.lng ?? 0}
      />
    </div>
  );
};
