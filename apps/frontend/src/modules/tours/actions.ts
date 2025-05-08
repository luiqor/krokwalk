import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AsyncThunkConfig } from "~/libs/types/types.js";

import { name as sliceName } from "./tour.slice.js";
import type { TourDto, GetTourByIdDto } from "./libs/types/types.js";
import type { GetTourByIdRequestDto } from "./libs/types/types.js";

const loadTours = createAsyncThunk<TourDto[], void, AsyncThunkConfig>(
	`${sliceName}/load-tours`,
	async (_, { extra }) => {
		const { tourService } = extra;

		const { items } = await tourService.getAll();

		return items;
	}
);

const loadTour = createAsyncThunk<
	GetTourByIdDto,
	GetTourByIdRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-tour`, async (payload, { extra }) => {
	const { tourService } = extra;
	const { id } = payload;

	return await tourService.getById(id);
});

export { loadTours, loadTour };
