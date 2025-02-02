import { PlaceRepository } from "./place.repository";
import {
  type PlacesGetAllQueryParams,
  type PlacesGetAllResponseDto,
} from "./libs/types/types";

const ensureArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
};

class PlaceService {
  private placeRepository: PlaceRepository;

  public constructor(placeRepository: PlaceRepository) {
    this.placeRepository = placeRepository;
  }

  public async getAll({
    tags,
    tours,
  }: PlacesGetAllQueryParams): Promise<PlacesGetAllResponseDto> {
    const placeEntities = await this.placeRepository.getAll({
      tags: ensureArray(tags),
      tours: ensureArray(tours),
    });

    return { items: placeEntities.map((entity) => entity.toObject()) };
  }
}

export { PlaceService };
