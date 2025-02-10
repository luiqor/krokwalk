import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";

class TourModel extends BaseModel {
  title!: string;

  slug!: string;

  description!: string;

  static get relationMappings(): RelationMappings {
    return {
      places: {
        join: {
          from: `${DatabaseTableName.TOURS}.id`,
          through: {
            from: `${DatabaseTableName.TOURS_PLACES}.tourId`,
            to: `${DatabaseTableName.TOURS_PLACES}.placeId`,
          },
          to: `${DatabaseTableName.PLACES}.id`,
        },
        modelClass: TourModel,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  public static override get tableName(): string {
    return DatabaseTableName.TOURS;
  }
}

export { TourModel };
