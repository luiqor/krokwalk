import { HTTPCode } from "~/libs/http/http";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "shared";
import { z } from "zod";

const validateQueryParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((error) => error.message);

        throw new HTTPError({
          status: HTTPCode.BAD_REQUEST,
          message: errorMessages.join(", "),
        });
      }

      next(error);
    }
  };
};

export { validateQueryParams };
