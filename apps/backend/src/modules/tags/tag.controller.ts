import { Request, Response } from "express";

import { BaseController } from "../../libs/modules/controller/base-controller";
import { TagService } from "./tag.service";

class TagController extends BaseController {
  private tagService: TagService;

  constructor(tagService: TagService) {
    super();
    this.tagService = tagService;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.get("/", (req: Request, res: Response) => this.getAllTags(req, res));
  }

  private async getAllTags(req: Request, res: Response): Promise<void> {
    const tags = await this.tagService.getAll();
    res.status(200).send(tags);
  }
}

export { TagController };
