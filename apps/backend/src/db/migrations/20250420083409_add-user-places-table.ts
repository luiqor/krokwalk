import type { Knex } from "knex";

const TableName = {
	USER_PLACES: "user_places",
	PLACES: "places",
	USERS: "users",
} as const;

const ColumnName = {
	ID: "id",
	USER_ID: "user_id",
	PLACE_ID: "place_id",
	VISIT_STATUS: "visit_status",
	VISITED_AT: "visited_at",
	CREATED_AT: "created_at",
	UPDATED_AT: "updated_at",
} as const;

const VisitStatus = {
	CONFIRMED: "confirmed",
	MARKED: "marked",
	UNVISITED: "unvisited",
} as const;

const DELETE_STRATEGY = "CASCADE";

const VISIT_STATUS_ENUM_NAME = `${ColumnName.VISIT_STATUS}_enum`;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.USER_PLACES, (table) => {
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
			.uuid(ColumnName.PLACE_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.PLACES)
			.onDelete(DELETE_STRATEGY);
		table
			.enum(ColumnName.VISIT_STATUS, Object.values(VisitStatus), {
				useNative: true,
				enumName: VISIT_STATUS_ENUM_NAME,
			})
			.notNullable()
			.defaultTo(VisitStatus.UNVISITED);
		table.dateTime(ColumnName.VISITED_AT).nullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.unique(
			[ColumnName.USER_ID, ColumnName.PLACE_ID],
			"user_place_unique"
		);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.USER_PLACES);

	await knex.raw(`DROP TYPE IF EXISTS ${VISIT_STATUS_ENUM_NAME};`);
}

export { up, down };
