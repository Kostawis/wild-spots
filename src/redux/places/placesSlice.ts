import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tables } from "../../supabase/database.types";
import { addPlace } from "./thunks/addPlace";
import { deletePlace } from "./thunks/deletePlace";
import { fetchPlaces } from "./thunks/fetchPlaces";
import { updatePlace } from "./thunks/updatePlace";

type AuthorProfile = Pick<Tables<"profiles">, "id" | "username" | "avatar_url">;

export type PlaceWithAuthor = Tables<"places"> & {
  author_profile: AuthorProfile | null;
};

interface PlacesState {
  items: PlaceWithAuthor[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deletingId: number | null;
  error: string | null;

  // UI state
  selectedPlaceId: string | number | null;
}

const initialState: PlacesState = {
  items: [],
  fetchStatus: "idle",
  createStatus: "idle",
  deleteStatus: "idle",
  deletingId: null,
  error: null,

  // UI state
  selectedPlaceId: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    clearPlaces: (state) => {
      state.items = [];
    },

    selectPlace: (state, action: PayloadAction<string | number>) => {
      state.selectedPlaceId = action.payload;
    },

    resetPlaceDetails: (state) => {
      state.selectedPlaceId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPlaces.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload ?? "Fetch failed";
      })

      // ADD
      .addCase(addPlace.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload ?? "Create failed";
      })

      // UPDATE
      .addCase(updatePlace.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.items = state.items.filter((p) => p.id !== action.payload);
        state.deletingId = null;
      })
      .addCase(deletePlace.pending, (state, action) => {
        state.deleteStatus = "loading";
        state.deletingId = action.meta.arg;
        state.error = null;
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deletingId = null;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export const { clearPlaces, selectPlace, resetPlaceDetails } =
  placesSlice.actions;
export default placesSlice.reducer;
