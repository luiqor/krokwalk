import { configureStore } from "@reduxjs/toolkit";

import { placeService, reducer as placesReducer } from "../places/places.js";
import { tagService, reducer as tagsReducer } from "../tags/tags.js";
import { tourService, reducer as toursReducer } from "../tours/tours.js";
import { reducer as locationReducer } from "../location/location.js";
import { tripService, reducer as tripsReducer } from "../trips/trips.js";
import { authService, reducer as authReducer } from "../auth/auth.js";
import { errorHandlingMiddleware } from "./libs/middlewares/middlewares.js";

const reducers = {
	places: placesReducer,
	tags: tagsReducer,
	tours: toursReducer,
	location: locationReducer,
	trips: tripsReducer,
	auth: authReducer,
};

const extraArgument = {
	placeService,
	tagService,
	tourService,
	tripService,
	authService,
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument,
			},
		}).concat(errorHandlingMiddleware),
});

export { store, extraArgument };
