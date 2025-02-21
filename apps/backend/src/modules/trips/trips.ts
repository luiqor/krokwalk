import { osrm } from "~/libs/modules/osrm/osrm";
import { TripService } from "./trip.service";
import { placeService } from "../places/places";

import { TripController } from "./trip.controller";

const tripService = new TripService(osrm, placeService);
const tripController = new TripController(tripService);

const tripRouter = tripController.router;

export { tripRouter, tripService, TripService };
