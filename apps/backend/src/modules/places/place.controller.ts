import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";

import { PlaceService } from "./place.service";
import { type PlacesGetAllQueryParams } from "./libs/types/types";
import { PlacesApiPath } from "./libs/enums/enums";

class PlaceController extends BaseController {
  private service: PlaceService;

  constructor(service: PlaceService) {
    super();
    this.service = service;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get(PlacesApiPath.ROOT, this.getAllPlaces.bind(this));
  }

  private async getAllPlaces(req: Request, res: Response): Promise<void> {
    const places = await this.service.getAll(
      req.query as PlacesGetAllQueryParams
    );
    res.status(200).send(places);
  }
}

export { PlaceController };
