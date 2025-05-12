import { createSlice } from "@reduxjs/toolkit";
import type { AchievementDto, LeaderUser, UserDto, ValueOf } from "shared";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import {
	editMainAchievement,
	getUser,
	getTopUsersByConfirmedPlaces,
	getTopUsersByVisitedPlaces,
} from "./actions.js";

type State = {
	status: ValueOf<typeof DataStatus>;
	user: null | UserDto;
	users: LeaderUser[];
	achievements: AchievementDto[];
};

const initialState: State = {
	status: DataStatus.IDLE,
	user: null,
	achievements: [],
	users: [],
};

const { reducer, actions, name } = createSlice({
	name: SliceName.AUTH,
	initialState,
	reducers: {
		resetUser: (state) => {
			state.user = null;
			state.achievements = [];
			state.status = DataStatus.IDLE;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			const { achievements, ...userDetails } = action.payload;
			state.user = userDetails;
			state.achievements = achievements;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(editMainAchievement.fulfilled, (state, action) => {
			state.user = action.payload;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getTopUsersByConfirmedPlaces.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getTopUsersByVisitedPlaces.fulfilled, (state, action) => {
			state.users = action.payload.items;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getUser.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
		builder.addMatcher(
			(action) =>
				action.type === getTopUsersByConfirmedPlaces.pending.type ||
				action.type === getTopUsersByVisitedPlaces.pending.type ||
				action.type === editMainAchievement.pending.type ||
				action.type === getUser.pending.type,
			(state) => {
				state.status = DataStatus.PENDING;
			}
		);
		builder.addMatcher(
			(action) =>
				action.type === getTopUsersByConfirmedPlaces.rejected.type ||
				action.type === getTopUsersByVisitedPlaces.rejected.type ||
				action.type === editMainAchievement.rejected.type ||
				action.type === getUser.rejected.type,
			(state) => {
				state.status = DataStatus.REJECTED;
			}
		);
	},
});

export { reducer, name, actions };
