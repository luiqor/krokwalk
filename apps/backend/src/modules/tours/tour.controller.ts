import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";

import { TourService } from "./tour.service";
import { ToursApiPath } from "./libs/enums/enums";

class TourController extends BaseController {
  private service: TourService;

  constructor(service: TourService) {
    super();
    this.service = service;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get(ToursApiPath.ROOT, this.getAllTours.bind(this));
  }

  private async getAllTours(req: Request, res: Response): Promise<void> {
    const tours = await this.service.getAll();
    res.status(200).send(tours);
  }
}

export { TourController };
