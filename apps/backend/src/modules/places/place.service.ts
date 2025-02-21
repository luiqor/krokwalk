import type { Service } from "~/libs/types/types";

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

class PlaceService implements Service {
  private repository: PlaceRepository;

  public constructor(repository: PlaceRepository) {
    this.repository = repository;
  }

  public async getAll({
    tags,
    tours,
  }: PlacesGetAllQueryParams): Promise<PlacesGetAllResponseDto> {
    const placeEntities = await this.repository.getAll({
      tags: ensureArray(tags),
      tours: ensureArray(tours),
    });

    return { items: placeEntities.map((entity) => entity.toObject()) };
  }
}

export { PlaceService };
