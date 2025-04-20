import { Model, type RelationMappings } from "objection";

import { RelationName } from "~/libs/enums/relation-name.enum";
import { BaseModel } from "~/libs/modules/model/model";
import { DatabaseTableName } from "~/libs/modules/database/database";
import { TagModel } from "../tags/tag.model";
import { TourModel } from "../tours/tour.model";
import { UserPlacesModel } from "../user-places/user-places.model";

class PlaceModel extends BaseModel {
	public title!: string;

	public description!: string;

	public address!: string;

	public thumbnailLink!: string;

	public lat!: number;

	public lng!: number;

	public elevation?: number;

	public tags?: TagModel[];

	public tours?: TourModel[];

	static get relationMappings(): RelationMappings {
		return {
			[RelationName.TAGS]: {
				join: {
					from: `${DatabaseTableName.PLACES}.id`,
					through: {
						from: `${DatabaseTableName.PLACES_TAGS}.placeId`,
						to: `${DatabaseTableName.PLACES_TAGS}.tagId`,
					},
					to: `${DatabaseTableName.TAGS}.id`,
				},
				modelClass: TagModel,
				relation: Model.ManyToManyRelation,
			},
			[RelationName.TOURS]: {
				join: {
					from: `${DatabaseTableName.PLACES}.id`,
					through: {
						from: `${DatabaseTableName.TOURS_PLACES}.placeId`,
						to: `${DatabaseTableName.TOURS_PLACES}.tourId`,
					},
					to: `${DatabaseTableName.TOURS}.id`,
				},
				modelClass: TourModel,
				relation: Model.ManyToManyRelation,
			},
			UserPlacesModel: {
				join: {
					from: `${DatabaseTableName.PLACES}.id`,
					to: `${DatabaseTableName.USER_PLACES}.placeId`,
				},
				modelClass: UserPlacesModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.PLACES;
	}
}

export { PlaceModel };
