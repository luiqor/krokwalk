import { type Knex } from "knex";

const TABLE_NAME = "places";

const COLUMN_NAME = "elevation";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.float(COLUMN_NAME);
	});
}

export { up, down };
