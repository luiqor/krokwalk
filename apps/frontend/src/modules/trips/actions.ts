import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
	UserPatchConfirmVisitResponseDto,
	UserPatchVisitStatusRequestDto,
	UserPatchVisitStatusResponseDto,
} from "shared";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { name as sliceName } from "./trip.slice.js";
import type {
	CreateTripBodyDto,
	CreateTripResDto,
	GetWalkTimeDto,
	GetWalkTimeParams,
	UnauthUserUpdateVisitStatusResult,
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
>(`${sliceName}/create-trip`, async (params, { extra }) => {
	const { tripService } = extra;

	const response = await tripService.create(params);

	if (response.userId === null) {
		// dispatch(otherSliceActions.someAction());
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

	void storage.set(
		StorageKey.PLACES,
		JSON.stringify({ places: updatedPlaces })
	);

	return { id: placeId, visitStatus };
});

export {
	loadMinimumWalkTime,
	createTrip,
	updatePlaceVisitStatus,
	confirmPlaceVisit,
	updatePlaceVisitStatusUnauth,
};
