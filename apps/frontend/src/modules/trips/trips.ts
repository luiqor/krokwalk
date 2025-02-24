import { loadMinimumWalkTime } from "./actions.js";
import { TripService } from "./trip.service.js";
import { actions, reducer } from "./trip.slice.js";

const allActions = {
  ...actions,
  loadMinimumWalkTime,
};

const tripService = new TripService();

export { allActions as actions, reducer };
export { tripService };
