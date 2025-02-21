import express, {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import cors from "cors";

import { HTTPError } from "~/libs/http/http";
import { BaseDatabase } from "../database/base-database";

class BaseApplication {
  private app: ExpressApplication;

  private port: number;

  private apiRouter: Router;

  private database: BaseDatabase;

  constructor({
    port,
    router,
    database,
  }: {
    port: number;
    router: Router;
    database: BaseDatabase;
  }) {
    this.app = express();
    this.apiRouter = router;
    this.port = port;
    this.database = database;
    this.setupMiddleware();
    this.setupRoutes();
    this.initErrorHandler();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes() {
    this.app.use("/api", this.apiRouter);
  }

  private initErrorHandler() {
    this.app.use(
      (
        err: HTTPError,
        req: Request,
        res: Response,
        next: NextFunction
      ): void => {
        console.error(err);

        if (err instanceof HTTPError) {
          res.status(err.status).send({
            message: err.message,
            status: err.status,
            cause: err.cause,
          });
        }

        res.status(500).send(
          new HTTPError({
            status: 500,
            message: "Internal Server Error",
            cause: err,
          })
        );
        next();
      }
    );
  }

  public start() {
    this.database.connect();
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export { BaseApplication };
