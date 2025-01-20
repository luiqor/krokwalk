import { configureStore } from "@reduxjs/toolkit";

import { placeService, reducer as placesReducer } from "../places/places.js";

const reducers = {
  places: placesReducer,
};

const extraArgument = {
  placeService,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});

export { store, extraArgument };
