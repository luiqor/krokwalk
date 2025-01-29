import { RelationName } from "~/libs/enums/relation-name.enum";

import { PlaceEntity } from "./place.entity";
import { PlaceModel } from "./place.model";
import { TagEntity } from "../tags/tag.entity";

class PlaceRepository {
  private placeModel: typeof PlaceModel;

  public constructor(placeModel: typeof PlaceModel) {
    this.placeModel = placeModel;
  }

  public async getAll(): Promise<PlaceEntity[]> {
    const places = await this.placeModel
      .query()
      .withGraphJoined(RelationName.TAGS);

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
          tags: place.tags!.map((tag) => {
            return TagEntity.initialize({
              id: tag.id,
              title: tag.title,
              createdAt: tag.createdAt,
              updatedAt: tag.updatedAt,
            });
          }),
        });
      })
    );
  }
}

export { PlaceRepository };
