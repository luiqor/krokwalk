import { APIPath } from "../../enums/enums";
import { healthRouter } from "src/modules/health/health";

import { BaseApplicationApi } from "./base-application-api";
import { placeRouter } from "~/modules/places/places";

const routes = [
  { path: APIPath.HEALTH, router: healthRouter },
  {
    path: APIPath.PLACES,
    router: placeRouter,
  },
];

const applicationApi = new BaseApplicationApi(routes);
const applicationApiRouter = applicationApi.router;

export { applicationApiRouter };
