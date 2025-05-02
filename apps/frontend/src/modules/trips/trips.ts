import {
	confirmPlaceVisit,
	createTrip,
	getPlacesDataForUnauth,
	loadMinimumWalkTime,
	updatePlaceVisitStatus,
	updatePlaceVisitStatusUnauth,
} from "./actions.js";
import { TripService } from "./trip.service.js";
import { actions, reducer } from "./trip.slice.js";

const allActions = {
	...actions,
	createTrip,
	loadMinimumWalkTime,
	updatePlaceVisitStatus,
	confirmPlaceVisit,
	updatePlaceVisitStatusUnauth,
	getPlacesDataForUnauth,
};

const tripService = new TripService();

export { allActions as actions, reducer, tripService };
export type {
	GetWalkTimeParams,
	CreateTripBodyDto,
	CreateTripResDto,
	CreateTripPlace,
} from "./libs/types/types.js";
export { submitTripDataValidationSchema } from "./libs/validation-schemas/validation-schemas.js";