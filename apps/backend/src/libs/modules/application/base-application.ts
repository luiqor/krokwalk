import express, {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import { HTTPError } from "../../../libs/http/http";

class BaseApplication {
  private app: ExpressApplication;

  private port: number;

  private apiRouter: Router;

  constructor({ port, router }: { port: number; router: Router }) {
    this.app = express();
    this.apiRouter = router;
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
    this.initErrorHandler();
  }

  private setupMiddleware() {
    this.app.use(express.json());
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
        if (err instanceof HTTPError) {
          res.status(err.status).send({
            message: err.message,
            status: err.status,
            cause: err.cause,
          });
        }

        res.status(500).send(
          new HTTPError({
            message: "Internal Server Error",
            status: 500,
            cause: err,
          })
        );
        next();
      }
    );
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export { BaseApplication };
