import { createSlice } from "@reduxjs/toolkit";
import type { AchievementDto, UserDto, ValueOf } from "shared";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import { editMainAchievement, getUser } from "./actions.js";

type State = {
	status: ValueOf<typeof DataStatus>;
	user: null | UserDto;
	achievements: AchievementDto[];
};

const initialState: State = {
	status: DataStatus.IDLE,
	user: null,
	achievements: [],
};

const { reducer, actions, name } = createSlice({
	name: SliceName.AUTH,
	initialState,
	reducers: {},
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
		builder.addCase(getUser.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export { reducer, name, actions };
