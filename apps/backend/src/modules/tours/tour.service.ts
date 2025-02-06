import type { ToursGetAllResponseDto } from "./libs/types/types";
import { TourRepository } from "./tour.repository";

class TourService {
  private tourRepository: TourRepository;

  public constructor(tourRepository: TourRepository) {
    this.tourRepository = tourRepository;
  }

  public async getAll(): Promise<ToursGetAllResponseDto> {
    const tourEntities = await this.tourRepository.getAll();

    return { items: tourEntities.map((entity) => entity.toObject()) };
  }
}

export { TourService };
