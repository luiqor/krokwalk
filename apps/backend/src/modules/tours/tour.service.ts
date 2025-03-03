import type { Service } from "~/libs/types/types";
import { HTTPCode, HTTPError, HTTPErrorMessage } from "~/libs/http/http";

import type { ToursGetAllResponseDto } from "./libs/types/types";
import { TourRepository } from "./tour.repository";

class TourService implements Service {
  private repository: TourRepository;

  public constructor(repository: TourRepository) {
    this.repository = repository;
  }

  public async getAll(): Promise<ToursGetAllResponseDto> {
    const tourEntities = await this.repository.getAll();

    return { items: tourEntities.map((entity) => entity.toObject()) };
  }

  public async getManyBySlugs(
    slugs: string[]
  ): Promise<ToursGetAllResponseDto> {
    const tourEntities = await this.repository.getManyBySlugs(slugs);

    return { items: tourEntities.map((entity) => entity.toObject()) };
  }

  public async getById(id: string) {
    const tourEntity = await this.repository.getById(id);

    if (!tourEntity) {
      throw new HTTPError({
        status: HTTPCode.NOT_FOUND,
        message: HTTPErrorMessage.NOT_FOUND,
      });
    }

    return tourEntity.toObject();
  }
}

export { TourService };
