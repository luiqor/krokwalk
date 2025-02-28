import { createSlice } from "@reduxjs/toolkit";

import type { GeoPoint } from "~/libs/types/types.js";
import { SliceName } from "~/libs/enums/enums.js";

import { Screen } from "./libs/enums/enums.js";

const StartingPoint = {
  CURRENT: "CURRENT",
  SELECTED: "SELECTED",
} as const;

const SelectionMode = {
  STARTING_POINT: "STARTING_POINT",
  DESTINATION_POINT: "DESTINATION_POINT",
} as const;

type State = {
  selectionMode: (typeof SelectionMode)[keyof typeof SelectionMode] | null;
  startingPoint: GeoPoint | null;
  startingPointType: (typeof StartingPoint)[keyof typeof StartingPoint] | null;
  destinationPoint: GeoPoint | null;
  screen: (typeof Screen)[keyof typeof Screen];
};

const initialState: State = {
  selectionMode: null,
  startingPoint: null,
  startingPointType: null,
  destinationPoint: null,
  screen: Screen.FILTERING,
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
    setDestinationPoint: (
      state,
      action: {
        payload: {
          latitude: number;
          longitude: number;
        };
      }
    ) => {
      state.destinationPoint = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    removeDestinationPoint: (state) => {
      state.destinationPoint = null;
    },
    setSelectionMode: (
      state,
      action: {
        payload: (typeof SelectionMode)[keyof typeof SelectionMode] | null;
      }
    ) => {
      state.selectionMode = action.payload;
    },
    setScreen(
      state,
      action: {
        payload: (typeof Screen)[keyof typeof Screen];
      }
    ) {
      state.screen = action.payload;
    },
  },
});

export { reducer, name, actions, StartingPoint, SelectionMode, Screen };
