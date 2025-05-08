import { z } from "zod";

const completeTripValidationSchema = z.object({
	placeIds: z.array(z.string().uuid(), {
		required_error: "placeIds must be an array of UUIDs",
	}),
});

export { completeTripValidationSchema };
