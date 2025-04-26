import { placeService } from "../places/places";
import { UserPlacesModel } from "./user-places.model";
import { UserPlacesRepository } from "./user-places.repository";
import { UserPlacesService } from "./user-places.service";

const userPlacesRepository = new UserPlacesRepository(UserPlacesModel);
const userPlacesService = new UserPlacesService(
	userPlacesRepository,
	placeService
);

export { userPlacesService };
