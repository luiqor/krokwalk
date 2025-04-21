import { createSlice, isRejected } from "@reduxjs/toolkit";
import { UserDto, ValueOf } from "shared";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";
import { getUser } from "./actions.js";

type State = {
	status: ValueOf<typeof DataStatus>;
	user: null | UserDto;
};

const initialState: State = {
	status: DataStatus.IDLE,
	user: null,
};

const { reducer, actions, name } = createSlice({
	name: SliceName.AUTH,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getUser.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addMatcher(isRejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export { reducer, name, actions };
