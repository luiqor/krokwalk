import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { type PlacesGetAllQueryParams } from "../places/places";
import {
	validateQueryParams,
	validateRequestBody,
} from "~/libs/modules/validation/validation";
import { HTTPCode } from "~/libs/http/http";

import {
	completeTripValidationSchema,
	createTripValidationSchema,
	getConstraintsValidationSchema,
} from "./libs/validation-schemas/validation-schemas";
import { TripService } from "./trip.service";
import { TripsApiPath } from "./libs/enums/enums";
import { AppRequest } from "~/libs/types/request.type";

class TripController extends BaseController {
	private service: TripService;

	constructor(service: TripService) {
		super();
		this.service = service;
		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.get(
			TripsApiPath.WALK_TIME,
			validateQueryParams(getConstraintsValidationSchema),
			this.getWalkTime.bind(this)
		);

		this.post(
			TripsApiPath.ROOT,
			validateRequestBody(createTripValidationSchema),
			this.createTrip.bind(this)
		);

		this.post(
			TripsApiPath.COMPLETE,
			validateRequestBody(completeTripValidationSchema),
			this.completeTrip.bind(this)
		);
	}

	private async getWalkTime(req: Request, res: Response): Promise<void> {
		const placesQueryParams = {
			tags: req.query.tags,
			tours: req.query.tours,
		} as PlacesGetAllQueryParams;

		const walkTime = await this.service.getWalkTime({
			startingPoint: req.query.startingPoint as string,
			destinationPoint: req.query.destinationPoint as string,
			...placesQueryParams,
		});

		res.status(HTTPCode.OK).send(walkTime);
	}

	private async createTrip(req: AppRequest, res: Response): Promise<void> {
		const userId = req.user?.userId ?? null;
		const trip = await this.service.createTrip({
			...req.body,
			userId,
		});

		res.status(HTTPCode.CREATED).send(trip);
	}

	private async completeTrip(req: AppRequest, res: Response): Promise<void> {
		const trip = await this.service.completeTrip({
			placeIds: req.body.placeIds,
			userId: req.user!.userId,
		});

		res.status(HTTPCode.OK).send(trip);
	}
}

export { TripController };
