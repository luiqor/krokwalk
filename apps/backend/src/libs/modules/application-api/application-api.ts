import { APIPath } from "../../enums/enums";
import { healthRouter } from "src/modules/health/health";

import { BaseApplicationApi } from "./base-application-api";

const routes = [{ path: APIPath.HEALTH, router: healthRouter }];

const applicationApi = new BaseApplicationApi(routes);
const applicationApiRouter = applicationApi.router;

export { applicationApiRouter };
