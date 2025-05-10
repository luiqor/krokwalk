import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";
import { UserModel } from "../users/user.model";

class AchievementModel extends BaseModel {
	title!: string;

	description!: string;

	iconLink!: string;

	achievementEvent!: string;

	targetCount!: number;

	static get relationMappings(): RelationMappings {
		return {
			users: {
				join: {
					from: `${DatabaseTableName.ACHIEVEMENTS}.id`,
					through: {
						from: `${DatabaseTableName.USER_ACHIEVEMENTS}.achievement_id`,
						to: `${DatabaseTableName.USER_ACHIEVEMENTS}.user_id`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.ACHIEVEMENTS;
	}
}

export { AchievementModel };
