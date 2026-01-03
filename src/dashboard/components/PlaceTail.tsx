import {
  faMapLocationDot,
  faPenToSquare,
  faShareNodes,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "../../components/atoms/Tag";
import Button from "../../components/Button";
import { PlaceForm } from "../../components/forms/PlaceForm";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import { useWindowWidthState } from "../../context/windowWidthContext";
import { useModal } from "../../modal/hooks/useModal";
import { openDrawer } from "../../redux/drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectDeletingId,
  selectPlacesStatus,
} from "../../redux/places/placesSelectors";
import { deletePlace } from "../../redux/places/thunks/deletePlace";
import { routes } from "../../router/routes";
import { Enums } from "../../supabase/database.types";
import { sharePlace } from "../../utils/sharePlace";

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
  const { openConfirmationModal, closeConfirmationModal, openMainModal } =
    useModal();
  const { isMobile } = useWindowWidthState();

  const requestDalatePlace = () => {
    openConfirmationModal({
      title: "Usuwanie miejscówki",
      content: `Czy na pewno chcesz usunąć miejscówkę: ${name}?`,
      onConfirm: handleDeletePlace,
      confirmationButtonTitle: "Usuń",
    });
  };

  const handleDeletePlace = async () => {
    closeConfirmationModal();
    await dispatch(deletePlace(placeId));
  };

  const handleEditPlace = () => {
    if (isMobile) {
      dispatch(
        openDrawer({
          type: "create-place",
          placeId,
        }),
      );
    } else {
      openMainModal({
        content: <PlaceForm placeId={placeId} />,
        title: "Edycja miejscówki",
      });
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-600 dark:bg-gray-700">
      <span className="flex justify-between">
        <Heading.H3 className="line-clamp-2">{name}</Heading.H3>
        <Tag variant="status" value={status} className="mt-1" />
      </span>
      <Paragraph>{description}</Paragraph>
      <div className="flex flex-wrap justify-end flex-1 gap-2 mt-3">
        <Button
          color="transparent"
          title="Zobacz na mapie"
          onClick={() => navigate(`${routes.home}?place=${placeId}`)}
        >
          <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />
          Zobacz na mapie
        </Button>

        <Button
          color="transparent"
          onClick={() => sharePlace(placeId, name)}
          title="Udostępnij"
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </Button>

        <Button
          color="transparent"
          title="Edytuj miejscówkę"
          onClick={handleEditPlace}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>

        <Button
          color="red"
          title="Usuń miejscówkę"
          onClick={requestDalatePlace}
          isLoading={deleteStatus === "loading" && deletingId === placeId}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  );
};
