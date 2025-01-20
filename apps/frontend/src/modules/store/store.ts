import { configureStore } from "@reduxjs/toolkit";

import { placesService, reducer as placesReducer } from "../place/place.js";

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
