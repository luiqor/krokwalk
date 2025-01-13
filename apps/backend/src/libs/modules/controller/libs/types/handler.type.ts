import { NextFunction, Request, Response } from "express";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export { type Handler };
