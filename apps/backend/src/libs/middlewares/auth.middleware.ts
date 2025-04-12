import { Response, NextFunction } from "express";

import { token } from "~/libs/modules/token/token";
import { HTTPError, HTTPCode, HTTPErrorMessage } from "~/libs/http/http";
import { AppRequest } from "../types/types";

const AUTH_ONLY_PATHS = ["/health/auth"];

export const authMiddleware = async (
	req: AppRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const isBlacklistedRoute = AUTH_ONLY_PATHS.some((route) =>
			req.path.startsWith(`/api${route}`)
		);

		if (!isBlacklistedRoute) {
			return next();
		}

		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const jwtToken = authHeader.split(" ")[1];
		const decodedToken = await token.decode(jwtToken);

		if (!decodedToken) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.INVALID_TOKEN,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		req.user = decodedToken.payload;

		next();
	} catch (error) {
		next(error);
	}
};
