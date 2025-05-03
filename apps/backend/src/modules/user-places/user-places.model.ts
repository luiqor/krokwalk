import { ValueOf } from "shared";
import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";
import { PlaceModel } from "../places/place.model";
import { UserModel } from "../users/user.model";
import { VisitStatus } from "./libs/enums/enums";

class UserPlacesModel extends BaseModel {
	public userId!: string;

	public placeId!: string;

	public visitStatus!: ValueOf<typeof VisitStatus>;

	public visitedAt!: string | null;

	static get relationMappings(): RelationMappings {
		return {
			users: {
				join: {
					from: `${DatabaseTableName.USER_PLACES}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
			places: {
				join: {
					from: `${DatabaseTableName.USER_PLACES}.placeId`,
					to: `${DatabaseTableName.PLACES}.id`,
				},
				modelClass: PlaceModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USER_PLACES;
	}
}

export { UserPlacesModel };
