import { loadTours } from "./actions.js";
import { TourService } from "./tour.service.js";
import { actions, reducer } from "./tour.slice.js";

const allActions = {
  ...actions,
  loadTours,
};

const tourService = new TourService();

export { allActions as actions, reducer };
export { tourService };
export { type TourDto } from "./libs/types/types.js";
