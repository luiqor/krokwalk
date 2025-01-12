import { HealthController } from "./health.controller";

const healthController = new HealthController();
const healthRouter = healthController.router;

export { healthRouter };
