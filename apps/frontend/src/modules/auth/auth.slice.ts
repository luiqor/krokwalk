import { createSlice } from "@reduxjs/toolkit";
import { UserDto, ValueOf } from "shared";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";

import { signIn, signUp, getUser, logOut } from "./actions.js";

type State = {
	status: ValueOf<typeof DataStatus>;
	user: null | UserDto;
	isAnonymousEnabled: boolean | null;
	isModalOpen: boolean;
};

const initialState: State = {
	status: DataStatus.IDLE,
	user: null,
	isAnonymousEnabled: null,
	isModalOpen: false,
};

const { reducer, actions, name } = createSlice({
	name: SliceName.AUTH,
	initialState,
	reducers: {
		triggerOpenModal: (state) => {
			const { isAnonymousEnabled } = state;
			state.isModalOpen = !isAnonymousEnabled;
		},
		hideModal: (state) => {
			state.isModalOpen = false;
		},
		setIsAnonymousEnabledAllowed: (state) => {
			state.isAnonymousEnabled = true;
			state.isModalOpen = false;
		},
		setIsAnonymousEnabledDisallowed: (state) => {
			state.isAnonymousEnabled = false;
			state.isModalOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAnonymousEnabled = null;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(signIn.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAnonymousEnabled = null;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(getUser.pending, (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addCase(logOut.fulfilled, (state) => {
			state.user = null;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export { reducer, name, actions };
