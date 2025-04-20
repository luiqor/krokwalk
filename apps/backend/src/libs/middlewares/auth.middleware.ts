import { Response, NextFunction } from "express";

import { token } from "~/libs/modules/token/token";
import { HTTPError, HTTPCode, HTTPErrorMessage } from "~/libs/http/http";
import { AppRequest } from "../types/types";

const AUTH_ONLY_PATHS = ["/health/auth", "/auth", "/users"];
const WHITELIST_NESTED_ROUTES = ["/auth/sign-up", "/auth/sign-in"];

export const authMiddleware = async (
	req: AppRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const isBlacklistedRoute = AUTH_ONLY_PATHS.some((route) =>
			req.path.startsWith(`/api${route}`)
		);

		const isWhitelistedRoute = WHITELIST_NESTED_ROUTES.some((route) =>
			req.path.startsWith(`/api${route}`)
		);

		if (!isBlacklistedRoute || isWhitelistedRoute) {
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

		try {
			const decodedToken = await token.decode(jwtToken);

			req.user = decodedToken.payload;
		} catch (error) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.UNAUTHORIZED,
				status: HTTPCode.UNAUTHORIZED,
				cause: `${error}`,
			});
		}

		next();
	} catch (error) {
		next(error);
	}
};
