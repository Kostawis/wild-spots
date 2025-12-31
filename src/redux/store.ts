import { configureStore } from "@reduxjs/toolkit";
import placesSlice from "./places/placesSlice";
import placeCoordinatesSlice from "./coordinates/placeCoordinatesSlice";
import drawerSlice from "./drawer/drawerSlice";

export const store = configureStore({
  reducer: {
    places: placesSlice,
    placeCoordinates: placeCoordinatesSlice,
    drawer: drawerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
