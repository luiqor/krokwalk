import { PlaceRepository } from "./place.repository";
import { type PlacesGetAllResponseDto } from "./libs/types/types";

class PlaceService {
  private placeRepository: PlaceRepository;

  public constructor(placeRepository: PlaceRepository) {
    this.placeRepository = placeRepository;
  }

  public async getAll(): Promise<PlacesGetAllResponseDto> {
    const placeEntities = await this.placeRepository.getAll();

    return { items: placeEntities.map((entity) => entity.toObject()) };
  }
}

export { PlaceService };
