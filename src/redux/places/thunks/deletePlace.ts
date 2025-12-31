import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../supabase";

export const deletePlace = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("places/delete", async (id, { rejectWithValue }) => {
  const { error } = await supabase.from("places").delete().eq("id", id);

  if (error) {
    return rejectWithValue(error.message);
  }

  return id;
});
