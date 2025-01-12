import { Router } from "express";

import { type Route, type RouterHandler } from "../types/types";

class BaseApplicationApi implements RouterHandler {
  public router: Router;

  constructor(routes: Route[]) {
    this.router = Router();
    this.initializeRoutes(routes);
  }

  public initializeRoutes(routes: Route[]) {
    routes.forEach(({ path, router }) => {
      this.router.use(path, router);
    });
  }
}

export { BaseApplicationApi };
