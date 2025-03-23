import { loadPlaces } from "./actions.js";
import { PlaceService } from "./place.service.js";
import { actions, reducer } from "./place.slice.js";

const allActions = {
	...actions,
	loadPlaces,
};

const placeService = new PlaceService();

export { allActions as actions, reducer };
export { placeService };
export type { PlaceDto } from "./libs/types/types.js";
