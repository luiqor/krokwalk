import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { loadMinimumWalkTime } from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";

type State = {
  minimumWalkTime: number | null;
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  minimumWalkTime: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.TRIPS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMinimumWalkTime.fulfilled, (state, action) => {
      state.minimumWalkTime = action.payload.minimumWalkTime;
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
