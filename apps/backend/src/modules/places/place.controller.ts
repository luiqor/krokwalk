import { Request, Response } from "express";

import { BaseController } from "~/libs/modules/controller/base-controller";
import { PlaceService } from "./place.service";

class PlaceController extends BaseController {
  private placeService: PlaceService;

  constructor(placeService: PlaceService) {
    super();
    this.placeService = placeService;
  }

  public initializeRoutes() {
    this.get("/", this.getAllPlaces);
  }

  private getAllPlaces(req: Request, res: Response): void {
    res.status(200).send(this.placeService.getAll());
  }
}

export { PlaceController };
