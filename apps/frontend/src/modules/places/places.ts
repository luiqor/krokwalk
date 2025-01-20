import { PlacesService } from "./places.service.js";
import { actions, reducer } from "./slice.js";

const allActions = {
  ...actions,
};

const placesService = new PlacesService();

export { allActions as actions, reducer };
export { placesService };
