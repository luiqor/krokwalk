import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDto, UserSignInRequestDto, UserSignUpRequestDto } from "shared";

import { actions as authActions } from "../auth/auth.js";
import type { AsyncThunkConfig } from "~/libs/types/types.js";
import { storage, StorageKey } from "../storage/storage.js";
import { name as sliceName } from "./auth.slice.js";

const signIn = createAsyncThunk<
	UserDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/sign-in`,
	async (userSignInRequestDto, { extra: { authService } }) => {
		const { email, password } = userSignInRequestDto;

		const { token, user } = await authService.signIn(email, password);

		void storage.set(StorageKey.TOKEN, token);

		return user;
	}
);

const signUp = createAsyncThunk<
	UserDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/sign-up`,
	async (userSignUpRequestDto, { extra: { authService } }) => {
		const { email, password, username } = userSignUpRequestDto;

		const { token, user } = await authService.signUp({
			email,
			password,
			username,
		});

		void storage.set(StorageKey.TOKEN, token);

		return user;
	}
);

const logOut = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/log-out`,
	async () => {
		await storage.drop(StorageKey.TOKEN);

		return null;
	}
);

const getUser = createAsyncThunk<UserDto, undefined, AsyncThunkConfig>(
	`${sliceName}/get-user`,
	async (_, { dispatch, extra: { authService } }) => {
		const token = await storage.get(StorageKey.TOKEN);

		if (!token) {
			dispatch(authActions.triggerOpenModal());

			throw new Error("Token not found");
		}

		const user = await authService.getUser();

		return user;
	}
);

export { signIn, signUp, logOut, getUser };
