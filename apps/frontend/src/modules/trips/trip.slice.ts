import { createSlice, isRejected } from "@reduxjs/toolkit";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import {
	confirmPlaceVisit,
	createTrip,
	loadMinimumWalkTime,
	updatePlaceVisitStatus,
} from "./actions.js";
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

const updateStopoverPoints = (
	stopoverPoints: CreateTripPlace[],
	placeId: string,
	visitStatus: string,
	visitedAt: string | null
): CreateTripPlace[] => {
	return stopoverPoints.map((place) => {
		if (place.id === placeId) {
			return { ...place, visitStatus, visitedAt };
		}
		console.log("updateStopoverPoints ", "placeId", placeId, "place", place);

		return place;
	});
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
			state.stopoverPoints = visitedPlaces;
			state.walkSeconds = totalTime;
			state.startingPoint = startingPoint;
			state.destinationPoint = destinationPoint;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(updatePlaceVisitStatus.fulfilled, (state, action) => {
			const { placeId, visitStatus, visitedAt } = action.payload;

			state.stopoverPoints = updateStopoverPoints(
				state.stopoverPoints,
				placeId,
				visitStatus,
				visitedAt
			);
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(confirmPlaceVisit.fulfilled, (state, action) => {
			const { placeId, visitStatus, visitedAt } = action.payload;

			state.stopoverPoints = updateStopoverPoints(
				state.stopoverPoints,
				placeId,
				visitStatus,
				visitedAt
			);
			state.status = DataStatus.FULFILLED;
		});
		builder.addMatcher(
			(action) =>
				action.type === loadMinimumWalkTime.pending.type ||
				action.type === createTrip.pending.type ||
				action.type === updatePlaceVisitStatus.pending.type,
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
