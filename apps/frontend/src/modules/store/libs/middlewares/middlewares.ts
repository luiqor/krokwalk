import { HTTPCode, HTTPErrorMessage } from "shared";
import { isRejected, Middleware } from "@reduxjs/toolkit";

import { notification } from "~/modules/notification/notification.js";
import { storage, StorageKey } from "~/modules/storage/storage.js";

type MiddlewareError = {
	data?: { message: string };
	message?: string;
};

const errorHandlingMiddleware: Middleware = () => {
	return (next) => {
		return (action) => {
			console.log("Action received in middleware:", action);

			if (isRejected(action)) {
				if (action?.error?.message === HTTPErrorMessage.AUTH.UNAUTHORIZED) {
					storage.drop(StorageKey.TOKEN);

					return next(action);
				}

				const error = action.error as MiddlewareError;
				notification.error(error.data ? error.data.message : error.message);
			}

			return next(action);
		};
	};
};

export { errorHandlingMiddleware };
