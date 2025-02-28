import { Request, Response, NextFunction } from "express";
import { HTTPCode } from "~/libs/http/http";
import { HTTPError } from "shared";
import { z, ZodError } from "zod";

const validate = (data: unknown, schema: z.ZodSchema) => {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      throw new HTTPError({
        status: HTTPCode.BAD_REQUEST,
        message: errorMessages.join(", "),
      });
    }
    throw error;
  }
};

const validateQueryParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(req.query, schema);
    next();
  };
};

const validateRequestBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(req.body, schema);
    next();
  };
};

export { validateQueryParams, validateRequestBody };
