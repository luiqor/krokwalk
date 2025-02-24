import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { TagService } from "./tag.service";

import { TagsApiPath } from "./libs/enums/enums";

class TagController extends BaseController {
  private service: TagService;

  constructor(service: TagService) {
    super();
    this.service = service;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get(TagsApiPath.ROOT, this.getAllTags.bind(this));
  }

  private async getAllTags(req: Request, res: Response): Promise<void> {
    const tags = await this.service.getAll();
    res.status(200).send(tags);
  }
}

export { TagController };
