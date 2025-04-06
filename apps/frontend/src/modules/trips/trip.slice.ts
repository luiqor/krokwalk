import { createSlice, isRejected } from "@reduxjs/toolkit";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import { createTrip, loadMinimumWalkTime } from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import type { StopOverPlace } from "./libs/types/types.js";

type State = {
	minimumWalkSeconds: number | null;
	filteredTags: TagDto[];
	filteredTours: TourDto[];
	startingPoint: [number, number] | [];
	destinationPoint: [number, number] | [];
	stopoverPoints: StopOverPlace[];
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
	reducers: {
		resetTripData: (state) => {
			state.startingPoint = [];
			state.destinationPoint = [];
			state.stopoverPoints = [];
			state.walkSeconds = null;
			state.minimumWalkSeconds = null;
			state.filteredTags = [];
			state.filteredTours = [];
			state.status = DataStatus.IDLE;
		},
	},
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
			state.stopoverPoints = visitedPlaces.map((place) => ({
				...place,
				visitedAt: null,
				markAsVisited: false,
			}));
			state.walkSeconds = totalTime;
			state.startingPoint = startingPoint;
			state.destinationPoint = destinationPoint;
			state.status = DataStatus.FULFILLED;
		});
		builder.addMatcher(
			(action) =>
				action.type === loadMinimumWalkTime.pending.type ||
				action.type === createTrip.pending.type,
			(state) => {
				state.status = DataStatus.PENDING;
			}
		);
		builder.addMatcher(isRejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export { reducer, name, actions };
