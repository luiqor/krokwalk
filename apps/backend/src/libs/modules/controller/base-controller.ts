import { Router, Handler } from "express";

import { RouterHandler } from "../types/router-handler";
import { handleAsyncronically } from "./libs/helpers/helpers";

abstract class BaseController implements RouterHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected get(path: string, handler: Handler) {
    this.router.get(path, handleAsyncronically(handler));
  }

  protected post(path: string, handler: Handler) {
    this.router.post(path, handleAsyncronically(handler));
  }

  protected patch(path: string, handler: Handler) {
    this.router.patch(path, handleAsyncronically(handler));
  }

  protected delete(path: string, handler: Handler) {
    this.router.delete(path, handleAsyncronically(handler));
  }

  abstract initializeRoutes(): void;
}

export { BaseController };
