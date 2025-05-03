import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserGetResponseDto, UserGetParametersDto } from "shared";

import type { AsyncThunkConfig } from "~/libs/types/types.js";
import { name as sliceName } from "./user.slice.js";

const getUser = createAsyncThunk<
	UserGetResponseDto,
	UserGetParametersDto,
	AsyncThunkConfig
>(`${sliceName}/get-by-id`, async (payload, { extra: { userService } }) => {
	const { id } = payload;

	const user = await userService.getById(id);

	return user;
});

export { getUser };
