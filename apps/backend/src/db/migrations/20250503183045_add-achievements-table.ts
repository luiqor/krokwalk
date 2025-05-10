import type { Knex } from "knex";

const TABLE_NAME = "achievements";

const ColumnName = {
	ID: "id",
	TITLE: "title",
	DESCRIPTION: "description",
	ICON_LINK: "icon_link",
	ACHIEVEMENT_EVENT: "achievement_event",
	TARGET_COUNT: "target_count",
	CREATED_AT: "created_at",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table
			.uuid(ColumnName.ID)
			.primary()
			.defaultTo(knex.raw("uuid_generate_v4()"));
		table.string(ColumnName.TITLE).notNullable();
		table.text(ColumnName.DESCRIPTION).nullable();
		table.string(ColumnName.ICON_LINK).nullable();
		table.string(ColumnName.ACHIEVEMENT_EVENT).nullable();
		table.integer(ColumnName.TARGET_COUNT).notNullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
