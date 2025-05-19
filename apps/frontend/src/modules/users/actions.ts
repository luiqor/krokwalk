import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	type UserGetParametersDto,
	type GetUserProfileResponseDto,
	type UserDto,
	type GetLeadersResponseDto,
	type GetLeadersRequestDto,
} from "shared";

import type { AsyncThunkConfig } from "~/libs/types/types.js";
import { name as sliceName } from "./user.slice.js";

const getUser = createAsyncThunk<
	GetUserProfileResponseDto,
	UserGetParametersDto,
	AsyncThunkConfig
>(`${sliceName}/get-by-id`, async (payload, { extra: { userService } }) => {
	const { id } = payload;

	const user = await userService.getById(id);

	return user;
});

const editMainAchievement = createAsyncThunk<
	UserDto,
	{ achievementId: string },
	AsyncThunkConfig
>(
	`${sliceName}/edit-main-achievement`,
	async (payload, { extra: { userService } }) => {
		const { achievementId } = payload;

		const user = await userService.editMainAchievement(achievementId);

		return user;
	}
);

const getTopUsersByConfirmedPlaces = createAsyncThunk<
	GetLeadersResponseDto,
	GetLeadersRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/get-top-users-by-confirmed-places`,
	async (payload, { extra: { userService } }) => {
		const users = await userService.getTopUsersByConfirmedPlaces(payload);

		return users;
	}
);

const getTopUsersByVisitedPlaces = createAsyncThunk<
	GetLeadersResponseDto,
	{
		limit: number;
		page?: number;
	},
	AsyncThunkConfig
>(
	`${sliceName}/get-top-users-by-visited-places`,
	async (payload, { extra: { userService } }) => {
		const users = await userService.getTopUsersByVisitedPlaces(payload);

		return users;
	}
);

export {
	getUser,
	editMainAchievement,
	getTopUsersByConfirmedPlaces,
	getTopUsersByVisitedPlaces,
};
