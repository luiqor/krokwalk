import express, { Router } from "express";

import { initRoutes } from "./routes/routes";
import { config } from "./libs/modules/config/config";

const app = express();
const router = Router();

app.use("/api", initRoutes(router));

app.listen(3000, () => {
  console.log(`App listening at http://localhost:${config.APP.PORT}`);
});
