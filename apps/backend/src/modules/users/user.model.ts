// import { Model, type RelationMappings } from "objection";

import { BaseModel } from "../../libs/modules/model/model";
import { DatabaseTableName } from "../../libs/modules/database/database";

class UserModel extends BaseModel {
	email!: string;

	username!: string;

	passwordHash!: string;

	passwordSalt!: string;

	// static get relationMappings(): RelationMappings {
	// 	return {
	// 	};
	// }

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };
