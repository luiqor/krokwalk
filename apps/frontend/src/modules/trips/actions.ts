import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
	UserPatchConfirmVisitResponseDto,
	UserPatchVisitStatusRequestDto,
	UserPatchVisitStatusResponseDto,
} from "shared";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as authActions } from "../auth/auth.js";

import { name as sliceName } from "./trip.slice.js";
import type {
	CompleteTripResponseDto,
	CreateTripBodyDto,
	CreateTripResDto,
	GetWalkTimeDto,
	GetWalkTimeParams,
	UnauthUserUpdateVisitStatusResult,
	CompleteTripRequestDto,
} from "./libs/types/types.js";
import { storage, StorageKey } from "../storage/storage.js";

const loadMinimumWalkTime = createAsyncThunk<
	GetWalkTimeDto,
	GetWalkTimeParams,
	AsyncThunkConfig
>(`${sliceName}/load-walk-time`, async (params, { extra }) => {
	const { tripService } = extra;

	return await tripService.getMinimumWalkTime({
		startingPoint: params.startingPoint,
		destinationPoint: params.destinationPoint,
		tours: params.tours,
		tags: params.tags,
	});
});

const createTrip = createAsyncThunk<
	CreateTripResDto,
	CreateTripBodyDto,
	AsyncThunkConfig
>(`${sliceName}/create-trip`, async (params, { dispatch, extra, getState }) => {
	const { tripService } = extra;
	const state = getState();
	const { isAnonymousEnabled } = state.auth;

	const response = await tripService.create(params);

	if (response.userId === null && !isAnonymousEnabled) {
		dispatch(authActions.triggerOpenModal());
	}

	if (response.userId === null && isAnonymousEnabled) {
		const placesString = await storage.get(StorageKey.PLACES);

		const {
			places: placeVisitStatus,
		}: { places: UnauthUserUpdateVisitStatusResult[] } = placesString
			? JSON.parse(placesString)
			: { places: [] };

		const updatedPlaces = response.visitedPlaces.map((stopoverPoint) => {
			const matchingPlace = placeVisitStatus.find(
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

		response.visitedPlaces = updatedPlaces;
	}

	return response;
});

const updatePlaceVisitStatus = createAsyncThunk<
	UserPatchVisitStatusResponseDto,
	UserPatchVisitStatusRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/update-place-visit-status`,
	async (payload, { extra: { userService } }) => {
		const { placeId, visitStatus } = payload;

		const updatedVisitStatus = await userService.updatePlaceVisitStatus(
			placeId,
			visitStatus
		);

		return updatedVisitStatus;
	}
);

const confirmPlaceVisit = createAsyncThunk<
	UserPatchVisitStatusResponseDto,
	UserPatchConfirmVisitResponseDto,
	AsyncThunkConfig
>(
	`${sliceName}/confirm-place-visit`,
	async (payload, { extra: { userService } }) => {
		const { placeId, lat, lng } = payload;

		return await userService.confirmPlaceVisit({ placeId, lat, lng });
	}
);

const updatePlaceVisitStatusUnauth = createAsyncThunk<
	UnauthUserUpdateVisitStatusResult,
	UserPatchVisitStatusRequestDto,
	AsyncThunkConfig
>(`${sliceName}/update-place-visit-status-unauth`, async (payload) => {
	const { placeId, visitStatus } = payload;

	const placesString = await storage.get(StorageKey.PLACES);

	const { places }: { places: UnauthUserUpdateVisitStatusResult[] } =
		placesString ? JSON.parse(placesString) : { places: [] };

	const updatedPlaces = places.map((place) => {
		return place.id === placeId ? { ...place, visitStatus } : place;
	});

	await storage.set(
		StorageKey.PLACES,
		JSON.stringify({ places: updatedPlaces })
	);

	return { id: placeId, visitStatus };
});

const getPlacesDataForUnauth = createAsyncThunk<
	UnauthUserUpdateVisitStatusResult[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-places-data-unauth`, async () => {
	const placesString = await storage.get(StorageKey.PLACES);

	const { places }: { places: UnauthUserUpdateVisitStatusResult[] } =
		placesString ? JSON.parse(placesString) : { places: [] };

	return places;
});

const completeTrip = createAsyncThunk<
	CompleteTripResponseDto,
	CompleteTripRequestDto,
	AsyncThunkConfig
>(`${sliceName}/complete-trip`, async (payload, { extra }) => {
	const { tripService } = extra;

	const response = await tripService.complete(payload);

	return response;
});

export {
	loadMinimumWalkTime,
	createTrip,
	updatePlaceVisitStatus,
	confirmPlaceVisit,
	updatePlaceVisitStatusUnauth,
	getPlacesDataForUnauth,
	completeTrip,
};
