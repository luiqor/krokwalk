import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";

class PlaceTagModel extends BaseModel {
  public placeId!: string;

  public tagId!: string;

  public static override get tableName(): string {
    return DatabaseTableName.PLACES_TAGS;
  }
}

export { PlaceTagModel };
