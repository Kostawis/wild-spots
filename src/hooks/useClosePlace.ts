import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { resetPlaceDetails } from "../redux/places/placesSlice";

export const useClosePlace = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  return () => {
    dispatch(resetPlaceDetails());
    setSearchParams({});
  };
};
