import { z } from "zod";

const tripValidationSchema = z.object({
  duration: z.object({
    hours: z.number().int().min(0).max(23),
    minutes: z.number().int().min(0).max(59),
  }),
  priorityTags: z.union([z.string(), z.array(z.string())]).optional(),
  priorityTours: z.union([z.string(), z.array(z.string())]).optional(),
});

export { tripValidationSchema };
