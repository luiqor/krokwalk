import { Response } from "express";
import { updatePlaceVisitStatusBodyValidationSchema } from "shared";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { HTTPCode } from "~/libs/http/http";
import { AppRequest } from "~/libs/types/request.type";
import { UserPlacesService } from "../user-places/user-places.service";
import { validateRequestBody } from "~/libs/modules/validation/validation";

import { UserService } from "./user.service";
import { UsersApiPath } from "./libs/enums/enums";

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
		this.get(UsersApiPath.PLACES_$ID, this.getPlaces.bind(this));
		this.patch(
			UsersApiPath.PLACES_$ID_VISIT_STATUS,
			validateRequestBody(updatePlaceVisitStatusBodyValidationSchema),
			this.updatePlaceVisitStatus.bind(this)
		);
		this.patch(
			UsersApiPath.PLACES_$ID_CONFIRM,
			this.confirmPlaceVisit.bind(this)
		);
		this.patch(
			UsersApiPath.ACHIEVEMENTS_$ACHIEVEMNT_ID,
			this.editUserAchievement.bind(this)
		);
	}

	private async getProfile(req: AppRequest, res: Response): Promise<void> {
		const response = await this.service.getProfile({
			id: req.params.id,
		});

		res.status(HTTPCode.OK).send(response);
	}

	private async getPlaces(req: AppRequest, res: Response): Promise<void> {
		const response = await this.userPlacesService.getAll({
			userId: req.params.id,
			currentUserId: req.user!.userId,
		});

		res.status(HTTPCode.OK).send(response);
	}

	private async updatePlaceVisitStatus(
		req: AppRequest,
		res: Response
	): Promise<void> {
		const response = await this.userPlacesService.updateVisitStatus({
			userId: req.user!.userId,
			placeId: req.params.placeId,
			visitStatus: req.body.visitStatus,
		});

		res.status(HTTPCode.OK).send(response);
	}

	private async confirmPlaceVisit(
		req: AppRequest,
		res: Response
	): Promise<void> {
		const response = await this.userPlacesService.confirmPlaceVisit({
			userId: req.user!.userId,
			placeId: req.params.placeId,
			lat: req.body.lat,
			lng: req.body.lng,
		});

		res.status(HTTPCode.OK).send(response);
	}

	private async editUserAchievement(
		req: AppRequest,
		res: Response
	): Promise<void> {
		const response = await this.service.editUserMainAchievement({
			id: req.user!.userId,
			achievementId: req.params.achievementId,
		});

		res.status(HTTPCode.OK).send(response);
	}
}

export { UserController };
