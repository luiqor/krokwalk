import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../store/libs/types/types.js";
import { name as sliceName } from "./slice.js";

const loadPlaces = createAsyncThunk<unknown[], void, AsyncThunkConfig>(
  `${sliceName}/load-places`,
  async (_payload, { extra }) => {
    const { placesService } = extra;

    const palces = await placesService.getAll();

    return palces;
  }
);

export { loadPlaces };
