import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { HTTPCode } from "~/libs/http/http";
import { validateRequestBody } from "~/libs/modules/validation/validation";

import { AuthService } from "./auth.service";
import { AuthApiPath } from "./libs/enums/enums";
import {
	signInValidationSchema,
	signUpValidationSchema,
} from "./libs/validation-schemas/validation-schemas";
import { AppRequest } from "~/libs/types/request.type";

class AuthController extends BaseController {
	private service: AuthService;

	constructor(service: AuthService) {
		super();
		this.service = service;
		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.post(
			AuthApiPath.SIGN_UP,
			validateRequestBody(signUpValidationSchema),
			this.signUp.bind(this)
		);
		this.post(
			AuthApiPath.SIGN_IN,
			validateRequestBody(signInValidationSchema),
			this.signIn.bind(this)
		);
		this.get(AuthApiPath.ROOT, this.getUser.bind(this));
	}

	private async signUp(req: Request, res: Response): Promise<void> {
		const signupResponse = await this.service.signUp(req.body);
		res.status(HTTPCode.OK).send(signupResponse);
	}

	private async signIn(req: Request, res: Response): Promise<void> {
		const signInResponse = await this.service.signIn(req.body);
		res.status(HTTPCode.OK).send(signInResponse);
	}

	private async getUser(req: AppRequest, res: Response): Promise<void> {
		const { user } = req;
		const response = await this.service.getUserById(user!.userId);
		res.status(HTTPCode.OK).send(response);
	}
}

export { AuthController };
