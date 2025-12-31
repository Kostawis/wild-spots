import { createAsyncThunk } from "@reduxjs/toolkit";

import supabase from "../../../supabase";
import { PlaceWithAuthor } from "../placesSlice";

export const fetchPlaces = createAsyncThunk<
  PlaceWithAuthor[],
  void,
  { rejectValue: string }
>("places/fetchAll", async (_, { rejectWithValue }) => {
  const { data, error } = await supabase.from("places").select(`
    *,
    author_profile:profiles (
      id,
      username,
      avatar_url
    )
  `);

  if (error) {
    return rejectWithValue(error.message);
  }

  return data;
});
