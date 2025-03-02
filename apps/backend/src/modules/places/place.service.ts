import type { Service } from "~/libs/types/types";
import { ensureArray } from "~/libs/helpers/helpers";
import { HTTPError, HTTPCode, HTTPErrorMessage } from "~/libs/http/http";

import { PlaceRepository } from "./place.repository";
import type {
  PlacesGetAllQueryParams,
  PlacesGetAllResponseDto,
  PlaceDto,
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

  public async getById(id: string): Promise<PlaceDto | null> {
    const placeEntity = await this.repository.getById(id);

    if (!placeEntity) {
      throw new HTTPError({
        status: HTTPCode.NOT_FOUND,
        message: HTTPErrorMessage.NOT_FOUND,
      });
    }

    return placeEntity.toDetailedObject();
  }
}

export { PlaceService };
