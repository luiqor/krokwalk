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
} from "./libs/types/types.js";

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

	return await tripService.create(params);
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

export {
	loadMinimumWalkTime,
	createTrip,
	updatePlaceVisitStatus,
	confirmPlaceVisit,
};
