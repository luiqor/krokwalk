import { PlaceController } from "./place.controller";
import { PlaceModel } from "./place.model";
import { PlaceRepository } from "./place.repository";
import { PlaceService } from "./place.service";

const placeRepository = new PlaceRepository(PlaceModel);
const placeService = new PlaceService(placeRepository);
const placeController = new PlaceController(placeService);

const placeRouter = placeController.router;

export { placeRouter, placeService, type PlaceService };
export type { PlacesGetAllQueryParams } from "./libs/types/types";
