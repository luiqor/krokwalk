import { Request, Response, NextFunction, Handler } from "express";

const handleAsyncronically = (handler: Handler): Handler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export { handleAsyncronically };
