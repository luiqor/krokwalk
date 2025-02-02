import { createAsyncThunk } from "@reduxjs/toolkit";

import { PlaceDto } from "./libs/types/types.js";
import { AsyncThunkConfig } from "../store/libs/types/types.js";
import { name as sliceName } from "./place.slice.js";

type LoadPlacesParams = {
  tours: string[];
  tags: string[];
};

const loadPlaces = createAsyncThunk<
  PlaceDto[],
  LoadPlacesParams,
  AsyncThunkConfig
>(`${sliceName}/load-places`, async (params, { extra, rejectWithValue }) => {
  try {
    const { placeService } = extra;

    const { items } = await placeService.getAll({
      tours: params.tours,
      tags: params.tags,
    });

    return items;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export { loadPlaces };
