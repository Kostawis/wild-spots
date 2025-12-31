import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllPlaces,
  selectMyPlaces,
  selectPlacesByStatus,
  selectPlacesStatus,
} from "../placesSelectors";
import { fetchPlaces } from "../thunks/fetchPlaces";
import { useSession } from "../../../context/sessionContext";

export const usePlaces = () => {
  const { session } = useSession();

  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const myPlaces = useAppSelector(selectMyPlaces(session?.user.id));
  const placesByStatus = useAppSelector(selectPlacesByStatus);
  const status = useAppSelector(selectPlacesStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlaces());
    }
  }, [status, dispatch]);

  return { places, myPlaces, placesByStatus, status };
};
