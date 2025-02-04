import { configureStore, Middleware } from "@reduxjs/toolkit";

import { placeService, reducer as placesReducer } from "../places/places.js";
import { tagService, reducer as tagsReducer } from "../tags/tags.js";

const reducers = {
  places: placesReducer,
  tags: tagsReducer,
};

const extraArgument = {
  placeService,
  tagService,
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

type AsyncThunkConfig = {
  state: ReturnType<typeof store.getState>;
  dispatch: typeof store.dispatch;
  extra: typeof extraArgument;
};

export { store, extraArgument, type AsyncThunkConfig };
export { SliceName } from "./libs/enums/enums.js";
