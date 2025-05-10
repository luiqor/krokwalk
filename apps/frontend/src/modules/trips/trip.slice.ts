import { createSlice } from "@reduxjs/toolkit";
import { type AchievementDto } from "shared";

import type { TagDto } from "../tags/tags.js";
import type { TourDto } from "../tours/tours.js";
import {
	completeTrip,
	confirmPlaceVisit,
	createTrip,
	getPlacesDataForUnauth,
	loadMinimumWalkTime,
	updatePlaceVisitStatus,
	updatePlaceVisitStatusUnauth,
} from "./actions.js";
import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import type { CreateTripPlace } from "./libs/types/types.js";
import { DEFAULT_ACHIEVEMENT } from "./libs/constants/constants.js";

type State = {
	minimumWalkSeconds: number | null;
	filteredTags: TagDto[];
	filteredTours: TourDto[];
	startingPoint: [number, number] | [];
	destinationPoint: [number, number] | [];
	stopoverPoints: CreateTripPlace[];
	walkSeconds: number | null;
	status: (typeof DataStatus)[keyof typeof DataStatus];
	newAchievements: AchievementDto[];
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
	newAchievements: [],
};

const updateStopoverPoints = (
	stopoverPoints: CreateTripPlace[],
	placeId: string,
	visitStatus: string,
	visitedAt: string | null = null
): CreateTripPlace[] => {
	return stopoverPoints.map((place) => {
		if (place.id === placeId) {
			return { ...place, visitStatus, visitedAt };
		}

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
		shiftNewAchievements: (state) => {
			state.newAchievements = state.newAchievements.slice(1);
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
		builder.addCase(updatePlaceVisitStatusUnauth.fulfilled, (state, action) => {
			const { visitStatus, id } = action.payload;

			state.stopoverPoints = updateStopoverPoints(
				state.stopoverPoints,
				id,
				visitStatus
			);
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getPlacesDataForUnauth.fulfilled, (state, action) => {
			const placesWithIdAndVisitStatus = action.payload;

			state.stopoverPoints = state.stopoverPoints.map((stopoverPoint) => {
				const matchingPlace = placesWithIdAndVisitStatus.find(
					(place) => place.id === stopoverPoint.id
				);

				if (matchingPlace) {
					return {
						...stopoverPoint,
						visitStatus: matchingPlace.visitStatus,
					};
				}

				return stopoverPoint;
			});
		});
		builder.addCase(completeTrip.fulfilled, (state, action) => {
			state.newAchievements = [
				...action.payload.newAchievements,
				DEFAULT_ACHIEVEMENT,
			];
			state.status = DataStatus.FULFILLED;
		});
		builder.addMatcher(
			(action) =>
				action.type === loadMinimumWalkTime.pending.type ||
				action.type === createTrip.pending.type ||
				action.type === updatePlaceVisitStatus.pending.type ||
				action.type === confirmPlaceVisit.pending.type,
			(state) => {
				state.status = DataStatus.PENDING;
			}
		);
		builder.addMatcher(
			(action) =>
				action.type === loadMinimumWalkTime.rejected.type ||
				action.type === createTrip.rejected.type ||
				action.type === updatePlaceVisitStatus.rejected.type ||
				action.type === confirmPlaceVisit.rejected.type,
			(state) => {
				state.status = DataStatus.REJECTED;
			}
		);
	},
});

export { reducer, name, actions };
