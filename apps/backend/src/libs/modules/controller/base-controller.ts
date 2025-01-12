import { Router } from "express";

import { RouterHandler } from "../types/router-handler";

abstract class BaseController implements RouterHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  abstract initializeRoutes(): void;
}

export { BaseController };
