import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { HTTPCode } from "~/libs/http/http";

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
    this.get(ToursApiPath.ID, this.getTourById.bind(this));
  }

  private async getAllTours(req: Request, res: Response): Promise<void> {
    const tours = await this.service.getAll();
    res.status(HTTPCode.OK).send(tours);
  }

  private async getTourById(req: Request, res: Response): Promise<void> {
    const tour = await this.service.getById(req.params.id);
    res.status(HTTPCode.OK).send(tour);
  }
}

export { TourController };
