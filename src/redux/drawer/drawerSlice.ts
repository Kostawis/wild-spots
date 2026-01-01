import { createSlice } from "@reduxjs/toolkit";

export type DrawerType = "place-details" | "create-place" | "edit-place" | null;

type DrawerState = {
  open: boolean;
  type: DrawerType;
  payload?: unknown;
};

const initialState: DrawerState = {
  open: false,
  type: null,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.payload = action.payload.payload;
    },
    closeDrawer: (state) => {
      state.open = false;
      state.type = null;
      state.payload = undefined;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
