import { z } from "zod";

import { VisitStatus } from "../enums/enums";

const updatePlaceVisitStatusBodyValidationSchema = z.object({
	visitStatus: z.enum([VisitStatus.UNVISITED, VisitStatus.MARKED]),
});

export { updatePlaceVisitStatusBodyValidationSchema };
