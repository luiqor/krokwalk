import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";

import { PlaceService } from "./place.service";
import { type PlacesGetAllQueryParams } from "./libs/types/types";

class PlaceController extends BaseController {
  private placeService: PlaceService;

  constructor(placeService: PlaceService) {
    super();
    this.placeService = placeService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get("/", (req: Request, res: Response) => this.getAllPlaces(req, res));
  }

  private async getAllPlaces(req: Request, res: Response): Promise<void> {
    const places = await this.placeService.getAll(
      req.query as PlacesGetAllQueryParams
    );
    res.status(200).send(places);
  }
}

export { PlaceController };
