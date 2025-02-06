import { configureStore, Middleware } from "@reduxjs/toolkit";

import { placeService, reducer as placesReducer } from "../places/places.js";
import { tagService, reducer as tagsReducer } from "../tags/tags.js";
import { tourService, reducer as toursReducer } from "../tours/tours.js";

const reducers = {
  places: placesReducer,
  tags: tagsReducer,
  tours: toursReducer,
};

const extraArgument = {
  placeService,
  tagService,
  tourService,
};

const errorHandlingMiddleware: Middleware = () => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error("Exception caught:", error);
  }
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
