import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";
import { UserPlacesModel } from "../user-places/user-places.model";
import { AchievementModel } from "../achievements/achievements";

class UserModel extends BaseModel {
	email!: string;

	username!: string;

	passwordHash!: string;

	passwordSalt!: string;

	mainAchievementId!: string | null;

	achievements!: AchievementModel[];

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
			achievements: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: `${DatabaseTableName.USER_ACHIEVEMENTS}.user_id`,
						to: `${DatabaseTableName.USER_ACHIEVEMENTS}.achievement_id`,
					},
					to: `${DatabaseTableName.ACHIEVEMENTS}.id`,
				},
				modelClass: AchievementModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
