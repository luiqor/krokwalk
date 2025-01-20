import { PlaceEntity } from "./place.entity";
import { PlaceModel } from "./place.model";

class PlaceRepository {
  private placeModel: typeof PlaceModel;

  public constructor(placeModel: typeof PlaceModel) {
    this.placeModel = placeModel;
  }

  public async getAll(): Promise<PlaceEntity[]> {
    const places = await this.placeModel.query();

    return await Promise.all(
      places.map(async (place) => {
        return PlaceEntity.initialize({
          id: place.id,
          title: place.title,
          description: place.description,
          address: place.address,
          thumbnailLink: place.thumbnailLink,
          lat: place.lat,
          lng: place.lng,
          elevation: place.elevation ?? null,
          createdAt: place.createdAt,
          updatedAt: place.updatedAt,
        });
      })
    );
  }
}

export { PlaceRepository };
