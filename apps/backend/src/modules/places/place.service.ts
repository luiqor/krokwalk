import type { Service } from "~/libs/types/types";
import { ensureArray } from "~/libs/helpers/helpers";

import { PlaceRepository } from "./place.repository";
import {
  type PlacesGetAllQueryParams,
  type PlacesGetAllResponseDto,
} from "./libs/types/types";



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
