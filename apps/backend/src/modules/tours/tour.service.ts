import type { Service } from "~/libs/types/types";

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
}

export { TourService };
