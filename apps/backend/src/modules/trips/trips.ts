import { geoApify } from "~/libs/modules/geo-apify/geo-apify";
import { TripService } from "./trip.service";
import { placeService } from "../places/places";

import { TripController } from "./trip.controller";

const tripService = new TripService(geoApify, placeService);
const tripController = new TripController(tripService);

const tripRouter = tripController.router;

export { tripRouter, tripService, TripService };
