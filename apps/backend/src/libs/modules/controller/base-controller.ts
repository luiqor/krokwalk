import { Router, Handler } from "express";
import { RouterHandler } from "../types/router-handler";
import { handleAsyncronically } from "./libs/helpers/helpers";

abstract class BaseController implements RouterHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected get(path: string, ...handlers: Handler[]) {
    this.router.get(path, ...handlers.map(handleAsyncronically));
  }

  protected post(path: string, ...handlers: Handler[]) {
    this.router.post(path, ...handlers.map(handleAsyncronically));
  }

  protected patch(path: string, ...handlers: Handler[]) {
    this.router.patch(path, ...handlers.map(handleAsyncronically));
  }

  protected delete(path: string, ...handlers: Handler[]) {
    this.router.delete(path, ...handlers.map(handleAsyncronically));
  }

  abstract initializeRoutes(): void;
}

export { BaseController };
