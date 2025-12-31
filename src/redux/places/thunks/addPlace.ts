import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../supabase";
import { Tables } from "../../../supabase/database.types";
import { PlaceWithAuthor } from "../placesSlice";

export const addPlace = createAsyncThunk<
  PlaceWithAuthor,
  Pick<Tables<"places">, "name" | "description" | "lat" | "lng" | "category">,
  { rejectValue: string }
>("places/add", async (place, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("places")
    .insert(place)
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
