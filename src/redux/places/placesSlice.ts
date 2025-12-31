import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tables } from "../../supabase/database.types";
import { fetchPlaces } from "./thunks/fetchPlaces";
import { addPlace } from "./thunks/addPlace";
import { updatePlace } from "./thunks/updatePlace";
import { deletePlace } from "./thunks/deletePlace";

type AuthorProfile = Pick<Tables<"profiles">, "id" | "username" | "avatar_url">;

export type PlaceWithAuthor = Tables<"places"> & {
  author_profile: AuthorProfile | null;
};

interface PlacesState {
  items: PlaceWithAuthor[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  // UI state
  selectedPlaceId: string | number | null;
}

const initialState: PlacesState = {
  items: [],
  fetchStatus: "idle",
  createStatus: "idle",
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
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearPlaces, selectPlace, resetPlaceDetails } =
  placesSlice.actions;
export default placesSlice.reducer;
