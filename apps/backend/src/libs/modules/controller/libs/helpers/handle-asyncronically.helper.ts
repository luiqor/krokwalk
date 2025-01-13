import { Request, Response, NextFunction } from "express";

const handleAsyncronically =
  <T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T> | void
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export { handleAsyncronically };
