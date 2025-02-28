import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import { createTrip, loadMinimumWalkTime } from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";

type State = {
  minimumWalkSeconds: number | null;
  filteredTags: TagDto[];
  filteredTours: TourDto[];
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  minimumWalkSeconds: null,
  filteredTags: [],
  filteredTours: [],
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.TRIPS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMinimumWalkTime.fulfilled, (state, action) => {
      const { tags, tours, minimumWalkSeconds } = action.payload;

      state.minimumWalkSeconds = minimumWalkSeconds;
      state.filteredTags = tags;
      state.filteredTours = tours;
      state.status = DataStatus.FULFILLED;
    });
    builder.addCase(createTrip.fulfilled, (state) => {
      state.status = DataStatus.FULFILLED;
      // TODO: Add trip to state
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
