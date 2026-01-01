import { useEffect } from "react";
import { useSession } from "../../../context/sessionContext";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllPlaces,
  selectMyPlaces,
  selectPlacesByStatus,
  selectPlacesStatus,
} from "../placesSelectors";
import { fetchPlaces } from "../thunks/fetchPlaces";

export const usePlaces = () => {
  const { session } = useSession();

  const dispatch = useAppDispatch();
  const places = useAppSelector(selectAllPlaces);
  const myPlaces = useAppSelector(selectMyPlaces(session?.user.id));
  const placesByStatus = useAppSelector(selectPlacesByStatus);
  const { fetchStatus } = useAppSelector(selectPlacesStatus);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchPlaces());
    }
  }, [fetchStatus, dispatch]);

  return { places, myPlaces, placesByStatus, fetchStatus };
};
