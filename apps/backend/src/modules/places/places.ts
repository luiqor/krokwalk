import { PlaceModel } from "./place.model";
import { PlaceRepository } from "./place.repository";

const placeRepository = new PlaceRepository(PlaceModel);

export { placeRepository };
export { PlaceEntity } from "./place.entity";
