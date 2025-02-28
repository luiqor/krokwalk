import { geoPointValidationSchema } from "./validation-schemas";
import { z } from "zod";

const createTripValidationSchema = z
  .object({
    startingPoint: geoPointValidationSchema,
    destinationPoint: geoPointValidationSchema,
    filteredTags: z.union([z.string(), z.array(z.string())]).optional(),
    filteredTours: z.union([z.string(), z.array(z.string())]).optional(),
    maximumWalkSeconds: z.number(),
    prioritizedTags: z.union([z.string(), z.array(z.string())]).optional(),
    prioritizedTours: z.union([z.string(), z.array(z.string())]).optional(),
  })
  .required();

export { createTripValidationSchema };
