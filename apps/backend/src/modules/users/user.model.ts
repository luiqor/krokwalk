import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";
import { UserPlacesModel } from "../user-places/user-places.model";

class UserModel extends BaseModel {
	email!: string;

	username!: string;

	passwordHash!: string;

	passwordSalt!: string;

	static get relationMappings(): RelationMappings {
		return {
			places: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_PLACES}.userId`,
				},
				modelClass: UserPlacesModel,
				relation: Model.HasManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
