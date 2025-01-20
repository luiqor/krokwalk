import { configureStore } from "@reduxjs/toolkit";

import { placesService, reducer as placesReducer } from "../places/places.js";

const reducers = {
  places: placesReducer,
};

const extraArgument = {
  placesService,
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
