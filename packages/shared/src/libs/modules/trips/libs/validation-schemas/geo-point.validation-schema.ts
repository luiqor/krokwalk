import { z } from "zod";

const geoPointValidationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export { geoPointValidationSchema };
