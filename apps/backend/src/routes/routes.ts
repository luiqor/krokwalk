import { Router, Request, Response } from "express";

import { APIPath } from "../libs/enums/enums";

const initRoutes = (router: Router): Router => {
  router.get(APIPath.HEALTH, (req: Request, res: Response) => {
    res.send("🟢");
  });

  return router;
};

export { initRoutes };
