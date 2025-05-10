import { Knex } from "knex";

import { DatabaseTableName } from "../../libs/modules/database/database";

import { achievements } from "./data/achievements.data";

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.ACHIEVEMENTS).del();

	await knex(DatabaseTableName.ACHIEVEMENTS).insert(achievements);
}

export { seed };
