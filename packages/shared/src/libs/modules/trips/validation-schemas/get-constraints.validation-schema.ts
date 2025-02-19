import { z } from "zod";

const TripsValidationMessage = {
  INVALID_COORDINATES_FORMAT:
    "Invalid coordinates format. Expected format: 'latitude, longitude'",
} as const;

const coordinateSchema = z.string().refine(
  (value) => {
    const [latitude, longitude] = value.split(", ").map(Number);
    return (
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    );
  },
  {
    message: TripsValidationMessage.INVALID_COORDINATES_FORMAT,
  }
);

const getConstraintsValidationSchema = z
  .object({
    startingPoint: coordinateSchema,
    destinationPoint: coordinateSchema,
    tags: z.array(z.string()),
    tours: z.array(z.string()),
  })
  .required();

export { getConstraintsValidationSchema };
