import { createSlice } from "@reduxjs/toolkit";

import type { GeoCoordinates } from "~/libs/types/types.js";
import { SliceName } from "~/libs/enums/enums.js";

const StartingPoint = {
  CURRENT: "CURRENT",
  SELECTED: "SELECTED",
} as const;

type State = {
  startingPoint: GeoCoordinates | null;
  startingPointType: (typeof StartingPoint)[keyof typeof StartingPoint] | null;
};

const initialState: State = {
  startingPoint: null,
  startingPointType: null,
};

const { reducer, actions, name } = createSlice({
  name: SliceName.LOCATION,
  initialState,
  reducers: {
    setStartingPoint: (
      state,
      action: {
        payload: {
          latitude: number;
          longitude: number;
          startingPointType: (typeof StartingPoint)[keyof typeof StartingPoint];
        };
      }
    ) => {
      state.startingPoint = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
      state.startingPointType = action.payload.startingPointType;
    },
    removeStartingPoint: (state) => {
      state.startingPoint = null;
      state.startingPointType = null;
    },
  },
});

export { reducer, name, actions, StartingPoint };
