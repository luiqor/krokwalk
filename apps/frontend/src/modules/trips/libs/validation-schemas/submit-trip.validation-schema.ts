import { z } from "zod";

const submitTripDataValidationSchema = z.object({
  duration: z.object({
    hours: z.number().int().min(0).max(23),
    minutes: z.number().int().min(0).max(59),
  }),
  prioritizedTags: z.union([z.string(), z.array(z.string())]).optional(),
  prioritizedTours: z.union([z.string(), z.array(z.string())]).optional(),
});

export { submitTripDataValidationSchema };
