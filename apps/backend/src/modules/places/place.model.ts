import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";

import { PlaceTagModel } from "./place-tag.model";
import { TagModel } from "../tags/tag.model";

class PlaceModel extends BaseModel {
  public title!: string;

  public description!: string;

  public address!: string;

  public thumbnailLink!: string;

  public lat!: number;

  public lng!: number;

  public elevation?: number;

  public tags?: TagModel[];

  static get relationMappings(): RelationMappings {
    return {
      tags: {
        join: {
          from: `${DatabaseTableName.PLACES}.id`,
          through: {
            from: `${DatabaseTableName.PLACES_TAGS}.placeId`,
            modelClass: PlaceTagModel,
            to: `${DatabaseTableName.PLACES_TAGS}.tagId`,
          },
          to: `${DatabaseTableName.TAGS}.id`,
        },
        modelClass: TagModel,
        relation: Model.ManyToManyRelation,
      },
    };
  }

  public static override get tableName(): string {
    return DatabaseTableName.PLACES;
  }
}

export { PlaceModel };
