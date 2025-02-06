import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";

import { TourService } from "./tour.service";

class TourController extends BaseController {
  private TourEntityService: TourService;

  constructor(TourEntityService: TourService) {
    super();
    this.TourEntityService = TourEntityService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get("/", (req: Request, res: Response) => this.getAllTours(req, res));
  }

  private async getAllTours(req: Request, res: Response): Promise<void> {
    const tours = await this.TourEntityService.getAll();
    res.status(200).send(tours);
  }
}

export { TourController };
