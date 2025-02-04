import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";

import { loadPlaces } from "./actions.js";
import { type PlaceDto } from "./libs/types/types.js";

type State = {
  places: PlaceDto[];
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  places: [],
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.PLACES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPlaces.fulfilled, (state, action) => {
      state.places = action.payload;
      state.status = DataStatus.FULFILLED;
    });
    builder.addMatcher(isPending, (state) => {
      state.status = DataStatus.PENDING;
    });
    builder.addMatcher(isRejected, (state) => {
      state.status = DataStatus.REJECTED;
    });
  },
});

export { reducer, name, actions };
