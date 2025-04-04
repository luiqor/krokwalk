import { APIPath } from "../../enums/enums";
import { healthRouter } from "src/modules/health/health";

import { BaseApplicationApi } from "./base-application-api";
import { placeRouter } from "~/modules/places/places";
import { tagRouter } from "~/modules/tags/tags";
import { tourRouter } from "~/modules/tours/tours";
import { tripRouter } from "~/modules/trips/trips";

const routes = [
  { path: APIPath.HEALTH, router: healthRouter },
  {
    path: APIPath.PLACES,
    router: placeRouter,
  },
  {
    path: APIPath.TAGS,
    router: tagRouter,
  },
  {
    path: APIPath.TOURS,
    router: tourRouter,
  },
  {
    path: APIPath.TRIPS,
    router: tripRouter,
  },
];

const applicationApi = new BaseApplicationApi(routes);
const applicationApiRouter = applicationApi.router;

export { applicationApiRouter };
