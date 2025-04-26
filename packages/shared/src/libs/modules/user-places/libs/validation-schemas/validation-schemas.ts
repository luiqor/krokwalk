import { z } from "zod";

import { VisitStatus } from "../enums/enums";

const updatePlaceVisitStatusValidationSchema = z.object({
	placeId: z.string().uuid(),
	visitStatus: z.enum([VisitStatus.UNVISITED, VisitStatus.MARKED]),
});

export { updatePlaceVisitStatusValidationSchema };
