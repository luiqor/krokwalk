import { configureStore } from "@reduxjs/toolkit";

import { placeService, reducer as placesReducer } from "../places/places.js";
import { tagService, reducer as tagsReducer } from "../tags/tags.js";
import { tourService, reducer as toursReducer } from "../tours/tours.js";
import { reducer as locationReducer } from "../location/location.js";
import { errorHandlingMiddleware } from "./libs/middlewares/middlewares.js";
import { tripService, reducer as tripsReducer } from "../trips/trips.js";

const reducers = {
  places: placesReducer,
  tags: tagsReducer,
  tours: toursReducer,
  location: locationReducer,
  trips: tripsReducer,
};

const extraArgument = {
  placeService,
  tagService,
  tourService,
  tripService,
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
