import { Request } from "express";
import { TokenPayload } from "shared";

type AppRequest = Request & {
	user?: TokenPayload;
};

export { type AppRequest };
