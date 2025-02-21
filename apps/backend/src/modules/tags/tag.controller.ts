import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { TagService } from "./tag.service";

class TagController extends BaseController {
  private service: TagService;

  constructor(service: TagService) {
    super();
    this.service = service;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get("/", (req: Request, res: Response) => this.getAllTags(req, res));
  }

  private async getAllTags(req: Request, res: Response): Promise<void> {
    const tags = await this.service.getAll();
    res.status(200).send(tags);
  }
}

export { TagController };
