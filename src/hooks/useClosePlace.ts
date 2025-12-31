import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPlaceDetails } from "../redux/places/placesSlice";

export const useClosePlace = () => {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();

  return () => {
    dispatch(resetPlaceDetails());
    setSearchParams({});
  };
};
