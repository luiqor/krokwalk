import { TourEntity } from "./tour.entity";
import { TourModel } from "./tour.model";

class TourRepository {
  private tourModel: typeof TourModel;

  public constructor(tourModel: typeof TourModel) {
    this.tourModel = tourModel;
  }

  public async getAll() {
    const tours = await this.tourModel.query();

    return await Promise.all(
      tours.map(async (tour) =>
        TourEntity.initialize({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          createdAt: tour.createdAt,
          updatedAt: tour.updatedAt,
        })
      )
    );
  }
}

export { TourRepository };
