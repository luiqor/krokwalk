import { config } from "../config/config";
import { applicationApiRouter } from "../application-api/application-api";
import { database } from "../database/database";

import { BaseApplication } from "./base-application";

const application = new BaseApplication({
  port: config.APP.PORT,
  router: applicationApiRouter,
  database,
});

export { application };
