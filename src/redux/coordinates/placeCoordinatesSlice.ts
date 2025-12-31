import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LatLng = {
  lat: number;
  lng: number;
};

export type PlaceCoordinatesState = {
  coordinates: LatLng | null;
  mode: "create" | "edit" | null;
};

const initialState: PlaceCoordinatesState = {
  coordinates: null,
  mode: null,
};

const placeCoordinatesSlice = createSlice({
  name: "placeCoordinates",
  initialState,
  reducers: {
    // 1️⃣ Klik na głównej mapie → start create
    setCreateCoordinates(state, action: PayloadAction<LatLng>) {
      state.coordinates = action.payload;
      state.mode = "create";
    },

    // 2️⃣ Start edycji istniejącego miejsca
    setEditCoordinates(state, action: PayloadAction<LatLng>) {
      state.coordinates = action.payload;
      state.mode = "edit";
    },

    // 3️⃣ Zmiana koordynatów (drag / mini-mapa)
    updateCoordinates(state, action: PayloadAction<LatLng>) {
      state.coordinates = action.payload;
    },

    // 4️⃣ Reset po zamknięciu modala
    clearCoordinates(state) {
      state.coordinates = null;
      state.mode = null;
    },
  },
});

export const {
  setCreateCoordinates,
  setEditCoordinates,
  updateCoordinates,
  clearCoordinates,
} = placeCoordinatesSlice.actions;

export default placeCoordinatesSlice.reducer;
