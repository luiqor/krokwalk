import { z } from "zod";

import { coordinateValidationSchema } from "./coordinate.validation-schema";

const getConstraintsValidationSchema = z.object({
  startingPoint: coordinateValidationSchema,
  destinationPoint: coordinateValidationSchema,
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  tours: z.union([z.string(), z.array(z.string())]).optional(),
});

export { getConstraintsValidationSchema };
