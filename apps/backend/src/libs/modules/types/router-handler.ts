import { type Router } from "express";
import { Route } from "./route";

type RouterHandler = {
  router: Router;
  initializeRoutes(routes?: Route[]): void;
};

export { type RouterHandler };
