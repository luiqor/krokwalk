import { Request, Response } from "express";
import { BaseController } from "~/libs/modules/controller/base-controller";
import { AppRequest } from "~/libs/types/request.type";

class HealthController extends BaseController {
	public initializeRoutes() {
		this.get("/", this.getHealth);
		this.get("/auth", this.getAuthHealth);
	}

	private getHealth(req: Request, res: Response): void {
		res.send("🟢");
	}

	private getAuthHealth(req: AppRequest, res: Response): void {
		res.send(req.user);
	}
}

export { HealthController };
