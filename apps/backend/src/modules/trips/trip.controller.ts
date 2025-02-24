import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { type PlacesGetAllQueryParams } from "../places/places";

import { TripService } from "./trip.service";

class TripController extends BaseController {
  private service: TripService;

  constructor(service: TripService) {
    super();
    this.service = service;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get("/", (req: Request, res: Response) => this.getWalkTime(req, res));
  }

  private async getWalkTime(req: Request, res: Response): Promise<void> {
    const placesQueryParams = {
      tags: req.query.tags,
      tours: req.query.tours,
    } as PlacesGetAllQueryParams;

    const tags = await this.service.getWalkTime({
      startingPoint: req.query.startingPoint as string,
      destinationPoint: req.query.destinationPoint as string,
      ...placesQueryParams,
    });

    res.status(200).send(tags);
  }
}

export { TripController };
