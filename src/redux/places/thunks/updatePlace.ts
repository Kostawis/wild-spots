import { createAsyncThunk } from "@reduxjs/toolkit";

import supabase from "../../../supabase";
import { PlaceWithAuthor } from "../placesSlice";

export const updatePlace = createAsyncThunk<
  PlaceWithAuthor,
  { id: number; changes: Partial<PlaceWithAuthor> },
  { rejectValue: string }
>("places/update", async ({ id, changes }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("places")
    .update(changes)
    .eq("id", id)
    .select(
      `*,  
      author_profile:profiles (
        id,
        username,
        avatar_url
      )`,
    )
    .single();

  if (error) {
    return rejectWithValue(error.message);
  }

  return data;
});
