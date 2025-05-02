import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { DataStatus, SliceName } from "~/libs/enums/enums.js";

import { loadTours, loadTour } from "./actions.js";
import { type TourDto, GetTourByIdDto } from "./libs/types/types.js";

type State = {
	tours: TourDto[];
	status: (typeof DataStatus)[keyof typeof DataStatus];
	tour: GetTourByIdDto;
};

const initialState: State = {
	tours: [],
	status: DataStatus.IDLE,
	tour: {} as GetTourByIdDto,
};

const { reducer, actions, name } = createSlice({
	name: SliceName.TAGS,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadTours.fulfilled, (state, action) => {
			state.tours = action.payload;
			state.status = DataStatus.FULFILLED;
		});
		builder.addCase(loadTour.fulfilled, (state, action) => {
			state.tour = action.payload;
			state.status = DataStatus.FULFILLED;
		});
		builder.addMatcher(isPending(loadTours), (state) => {
			state.status = DataStatus.PENDING;
		});
		builder.addMatcher(isRejected, (state) => {
			state.status = DataStatus.REJECTED;
		});
	},
});

export { reducer, name, actions };
