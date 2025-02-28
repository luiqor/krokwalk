import { loadMinimumWalkTime } from "./actions.js";
import { TripService } from "./trip.service.js";
import { actions, reducer } from "./trip.slice.js";

const allActions = {
  ...actions,
  loadMinimumWalkTime,
};

const tripService = new TripService();

export { allActions as actions, reducer, tripService };
export type { GetWalkTimeParams } from "./libs/types/types.js";
export { tripValidationSchema } from "./libs/validation-schemas/trip.validation-schema.js";
