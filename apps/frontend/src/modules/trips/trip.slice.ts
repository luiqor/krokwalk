import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import { createTrip, loadMinimumWalkTime } from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import type { CreateTripPlace } from "./libs/types/types.js";

type State = {
	minimumWalkSeconds: number | null;
	filteredTags: TagDto[];
	filteredTours: TourDto[];
	startingPoint: [number, number] | [];
	destinationPoint: [number, number] | [];
	stopoverPoints: CreateTripPlace[];
	walkSeconds: number | null;
	status: (typeof DataStatus)[keyof typeof DataStatus];
};

const initialState: State = {
	minimumWalkSeconds: null,
	filteredTags: [],
	filteredTours: [],
	stopoverPoints: [],
	startingPoint: [],
	destinationPoint: [],
	walkSeconds: null,
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
		builder.addCase(createTrip.fulfilled, (state, action) => {
			const { visitedPlaces, totalTime, startingPoint, destinationPoint } =
				action.payload;
			state.stopoverPoints = visitedPlaces;
			state.walkSeconds = totalTime;
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
