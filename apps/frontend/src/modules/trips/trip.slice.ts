import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import { loadMinimumWalkTime } from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";

type State = {
  minimumWalkSeconds: number | null;
  tags: TagDto[];
  tours: TourDto[];
  startingPoint: string | null;
  destinationPoint: string | null;
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  minimumWalkSeconds: null,
  tags: [],
  tours: [],
  startingPoint: null,
  destinationPoint: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.TRIPS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMinimumWalkTime.fulfilled, (state, action) => {
      const {
        tags,
        tours,
        startingPoint,
        destinationPoint,
        minimumWalkSeconds,
      } = action.payload;

      state.minimumWalkSeconds = minimumWalkSeconds;
      state.tags = tags;
      state.tours = tours;
      state.startingPoint = startingPoint;
      state.destinationPoint = destinationPoint;
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
