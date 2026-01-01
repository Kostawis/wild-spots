import {
  faMapLocationDot,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "../../components/atoms/Tag";
import Button from "../../components/Button";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDeletingId,
  selectPlacesStatus,
} from "../../redux/places/placesSelectors";
import { deletePlace } from "../../redux/places/thunks/deletePlace";
import { routes } from "../../router/routes";
import { Enums } from "../../supabase/database.types";

type PlaceTailProps = {
  placeId: number;
  name: string;
  description: string;
  status: Enums<"place_status">;
};

export const PlaceTail: FC<PlaceTailProps> = ({
  placeId,
  name,
  description,
  status,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteStatus } = useAppSelector(selectPlacesStatus);
  const deletingId = useAppSelector(selectDeletingId);

  return (
    <div className="flex flex-col justify-between rounded-md border border-gray-100 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
      <span className="flex justify-between">
        <Heading.H3 className="line-clamp-2">{name}</Heading.H3>
        <Tag variant="status" value={status} className="mt-1" />
      </span>
      <Paragraph>{description}</Paragraph>
      <div className="mt-3 flex flex-1 justify-end gap-x-2">
        <Button
          color="transparent"
          title="Zobacz na mapie"
          onClick={() => navigate(`${routes.home}?place=${placeId}`)}
        >
          <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />
          Zobacz na mapie
        </Button>

        <Button
          color="red"
          title="Usuń miejscówkę"
          onClick={() => dispatch(deletePlace(placeId))}
          isLoading={deleteStatus === "loading" && deletingId === placeId}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  );
};
