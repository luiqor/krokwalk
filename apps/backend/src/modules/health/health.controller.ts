import { Request, Response } from "express";
import { BaseController } from "~/libs/modules/controller/base-controller";

class HealthController extends BaseController {
  public initializeRoutes() {
    this.get("/", this.getHealth);
  }

  private getHealth(req: Request, res: Response): void {
    res.send("🟢");
  }
}

export { HealthController };
