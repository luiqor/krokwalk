import { BaseModel } from "~/libs/modules/model/model";
import { DatabaseTableName } from "~/libs/modules/database/database";

class PlaceModel extends BaseModel {
  public title!: string;

  public description!: string;

  public address!: string;

  public thumbnailLink!: string;

  public lat!: number;

  public lng!: number;

  public elevation?: number;

  public static override get tableName(): string {
    return DatabaseTableName.PLACES;
  }
}

export { PlaceModel };
