import { isRejected, Middleware } from "@reduxjs/toolkit";

import { notification } from "~/modules/notification/notification.js";

type MiddlewareError = {
  data?: { message: string };
  message?: string;
};

const errorHandlingMiddleware: Middleware = () => {
  return (next) => {
    return (action) => {
      if (isRejected(action)) {
        const error = action.error as MiddlewareError;
        notification.error(error.data ? error.data.message : error.message);
      }

      return next(action);
    };
  };
};

export { errorHandlingMiddleware };
