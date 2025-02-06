import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AsyncThunkConfig } from "~/libs/types/types.js";

import { name as sliceName } from "./tour.slice.js";
import type { TourDto } from "./libs/types/types.js";

const loadTours = createAsyncThunk<TourDto[], void, AsyncThunkConfig>(
  `${sliceName}/load-tours`,
  async (_, { extra }) => {
    const { tourService } = extra;

    const { items } = await tourService.getAll();

    return items;
  }
);

export { loadTours };
