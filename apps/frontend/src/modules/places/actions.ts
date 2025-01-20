import { createAsyncThunk } from "@reduxjs/toolkit";

import { PlaceDto } from "./libs/types/types.js";
import { AsyncThunkConfig } from "../store/libs/types/types.js";
import { name as sliceName } from "./place.slice.js";

const loadPlaces = createAsyncThunk<PlaceDto[], void, AsyncThunkConfig>(
  `${sliceName}/load-places`,
  async (_, { extra, rejectWithValue }) => {
    try {
      const { placeService } = extra;

      const { items } = await placeService.getAll();

      return items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { loadPlaces };
