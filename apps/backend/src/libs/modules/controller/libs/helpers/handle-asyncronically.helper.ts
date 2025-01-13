import { Request, Response, NextFunction, Handler } from "express";

const handleAsyncronically = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export { handleAsyncronically };
