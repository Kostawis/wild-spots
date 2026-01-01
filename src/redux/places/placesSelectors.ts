import { createSelector } from "@reduxjs/toolkit";
import { Enums } from "../../supabase/database.types";
import { RootState } from "../store";

export const selectPlacesStatus = (state: RootState) => ({
  fetchStatus: state.places.fetchStatus,
  createStatus: state.places.createStatus,
  deleteStatus: state.places.deleteStatus,
});

export const selectDeletingId = (state: RootState) => state.places.deletingId;

export const selectAllPlaces = (state: RootState) => state.places;

export const selectMyPlaces = (userId: string | undefined) =>
  createSelector([selectAllPlaces], (places) => {
    if (!userId) return [];
    return places.items.filter((place) => place.author === userId);
  });

export const selectPlacesByStatus = createSelector(
  [selectAllPlaces],
  ({ items: places }) => {
    return {
      legal: places.filter((p) => p.category === "legal"),
      semiLegal: places.filter((p) => p.category === "semi-legal"),
      closed: places.filter((p) => p.category === "closed"),
    };
  },
);

export const selectPlacesByTerrain =
  (category: Enums<"place_category">) => (state: RootState) =>
    state.places.items.filter((p) => p.category === category);

// UI selectors
export const selectSelectedPlace = (state: RootState) =>
  state.places.items.find((p) => p.id == state.places.selectedPlaceId) ?? null;
