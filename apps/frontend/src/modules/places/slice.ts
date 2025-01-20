import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { loadPlaces } from "./actions.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type PlaceDto } from "./libs/types/types.js";

type State = {
  places: PlaceDto[];
  // filteredTrips: Place[];
  // currentPlace: Place | null;
  status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
  places: [],
  // filteredPlaces: [],
  // currentPlace: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state) => {
      state.status = DataStatus.PENDING;
    });
    builder.addMatcher(isRejected, (state) => {
      state.status = DataStatus.REJECTED;
    });
    builder.addCase(loadPlaces.fulfilled, (state, action) => {
      state.places = action.payload.items;
      // state.filteredPlaces = action.payload;
      state.status = DataStatus.FULFILLED;
    });
  },
});

export { reducer, name, actions };
