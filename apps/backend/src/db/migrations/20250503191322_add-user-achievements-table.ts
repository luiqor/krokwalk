import type { Knex } from "knex";

const TableName = {
	USER_ACHIEVEMENTS: "user_achievements",
	ACHIEVEMENTS: "achievements",
	USERS: "users",
} as const;

const ColumnName = {
	ID: "id",
	USER_ID: "user_id",
	ACHIEVEMENT_ID: "achievement_id",
	CREATED_AT: "created_at",
	UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.USER_ACHIEVEMENTS, (table) => {
		table
			.uuid(ColumnName.ID)
			.primary()
			.defaultTo(knex.raw("uuid_generate_v4()"));
		table
			.uuid(ColumnName.USER_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.onDelete(DELETE_STRATEGY);
		table
			.uuid(ColumnName.ACHIEVEMENT_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.ACHIEVEMENTS)
			.onDelete(DELETE_STRATEGY);
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.unique(
			[ColumnName.USER_ID, ColumnName.ACHIEVEMENT_ID],
			"user_achievement_unique"
		);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.USER_ACHIEVEMENTS);
}

export { up, down };
