import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { SliceName } from "../store/store.js";
import { DataStatus } from "~/libs/enums/enums.js";

import { loadTags } from "./actions.js";
import { type TagDto } from "./libs/types/types.js";

type State = {
  tags: TagDto[];
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  tags: [],
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.TAGS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTags.fulfilled, (state, action) => {
      state.tags = action.payload;
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
