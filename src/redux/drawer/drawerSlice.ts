import { createSlice } from "@reduxjs/toolkit";

export type DrawerType = "place-details" | "create-place" | "edit-place" | null;

type DrawerState = {
  open: boolean;
  type: DrawerType;
  placeId?: number;
};

const initialState: DrawerState = {
  open: false,
  type: null,
  placeId: undefined,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.placeId = action.payload.placeId;
    },
    closeDrawer: (state) => {
      state.open = false;
      state.type = null;
      state.placeId = undefined;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
