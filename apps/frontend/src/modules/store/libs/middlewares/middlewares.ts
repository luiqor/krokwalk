import { HTTPErrorMessage } from "shared";
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
			if (isRejected(action)) {
				if (action?.error?.message === HTTPErrorMessage.AUTH.UNAUTHORIZED) {
					storage.drop(StorageKey.TOKEN);

					notification.error(
						"Would you like to perform this action? Please authorize."
					);

					return;
				}

				const error = action.error as MiddlewareError;
				notification.error(error.data ? error.data.message : error.message);
				return;
			}

			return next(action);
		};
	};
};

export { errorHandlingMiddleware };
