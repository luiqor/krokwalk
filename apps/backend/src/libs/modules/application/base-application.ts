import express from "express";

class BaseApplication {
  private app: express.Application;

  private port: number;

  private apiRouter: express.Router;

  constructor({ port, router }: { port: number; router: express.Router }) {
    this.app = express();
    this.apiRouter = router;
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
  }

  private setupRoutes() {
    this.app.use("/api", this.apiRouter);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export { BaseApplication };
