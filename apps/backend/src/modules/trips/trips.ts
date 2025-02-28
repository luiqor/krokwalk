import { geoApify } from "~/libs/modules/geo-apify/geo-apify";
import { TripService } from "./trip.service";
import { placeService } from "../places/places";
import { tagService } from "../tags/tags";
import { tourService } from "../tours/tours";

import { TripController } from "./trip.controller";

const tripService = new TripService({
  geoApify,
  placeService,
  tagService,
  tourService,
});
const tripController = new TripController(tripService);

const tripRouter = tripController.router;

export { tripRouter, tripService, TripService };
