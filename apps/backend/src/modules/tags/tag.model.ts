import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";

class TagModel extends BaseModel {
  title!: string;

  slug!: string;

  static get relationMappings(): RelationMappings {
    return {
      places: {
        join: {
          from: `${DatabaseTableName.TAGS}.id`,
          through: {
            from: `${DatabaseTableName.PLACES_TAGS}.tagId`,
            to: `${DatabaseTableName.PLACES_TAGS}.placeId`,
          },
          to: `${DatabaseTableName.PLACES}.id`,
        },
        modelClass: TagModel,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  public static override get tableName(): string {
    return DatabaseTableName.TAGS;
  }
}

export { TagModel };
