import { Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { UserService } from "./user.service";
import { HTTPCode } from "~/libs/http/http";

import { UsersApiPath } from "./libs/enums/enums";
import { AppRequest } from "~/libs/types/request.type";
import { UserPlacesService } from "../user-places/user-places.service";

class UserController extends BaseController {
	private service: UserService;

	private userPlacesService: UserPlacesService;

	constructor(service: UserService, userPlacesService: UserPlacesService) {
		super();
		this.service = service;
		this.userPlacesService = userPlacesService;
		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.get(UsersApiPath.$ID_PLACES, this.getPlaces.bind(this));
		this.get(UsersApiPath.$ID, this.getProfile.bind(this));
	}

	private async getPlaces(req: AppRequest, res: Response): Promise<void> {
		const response = await this.userPlacesService.getAll({
			userId: req.params.id,
			currentUserId: req.user!.userId,
		});

		res.status(HTTPCode.OK).send(response);
	}

	private async getProfile(req: AppRequest, res: Response): Promise<void> {
		const response = await this.service.getProfile({
			id: req.params.id,
		});

		res.status(HTTPCode.OK).send(response);
	}
}

export { UserController };
