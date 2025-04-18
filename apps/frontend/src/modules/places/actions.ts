import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { PlaceDto } from "./libs/types/types.js";
import { name as sliceName } from "./place.slice.js";

type LoadPlacesParams = {
  tours: string[];
  tags: string[];
};

const loadPlaces = createAsyncThunk<
  PlaceDto[],
  LoadPlacesParams,
  AsyncThunkConfig
>(`${sliceName}/load-places`, async (params, { extra }) => {
  const { placeService } = extra;

  const { items } = await placeService.getAll({
    tours: params.tours,
    tags: params.tags,
  });

  return items;
});

export { loadPlaces };
