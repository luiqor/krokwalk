import type { Knex } from "knex";

const TableName = {
	USERS: "users",
	ACHIEVEMENTS: "achievements",
} as const;

const ColumnName = {
	ID: "id",
	MAIN_ACHIEVEMENT: "main_achievement",
} as const;

const DELETE_STRATEGY = "CASCADE";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USERS, (table) => {
		table
			.uuid(ColumnName.MAIN_ACHIEVEMENT)
			.nullable()
			.references(ColumnName.ID)
			.inTable(TableName.ACHIEVEMENTS)
			.onDelete(DELETE_STRATEGY)
			.onUpdate(DELETE_STRATEGY);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USERS, (table) => {
		table.dropColumn(ColumnName.MAIN_ACHIEVEMENT);
	});
}
