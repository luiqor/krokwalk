import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer.js";

const extraArgument = {
  // services
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});
