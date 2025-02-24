import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { name as sliceName } from "./trip.slice.js";
import type { GetWalkTimeDto, GetWalkTimeParams } from "./libs/types/types.js";

const loadMinimumWalkTime = createAsyncThunk<
  GetWalkTimeDto,
  GetWalkTimeParams,
  AsyncThunkConfig
>(`${sliceName}/load-walk-time`, async (params, { extra }) => {
  const { tripService } = extra;

  return await tripService.getMinimumWalkTime({
    startingPoint: params.startingPoint,
    destinationPoint: params.destinationPoint,
    tours: params.tours,
    tags: params.tags,
  });
});

export { loadMinimumWalkTime };
