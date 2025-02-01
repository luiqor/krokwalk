import type { Knex } from "knex";

const TableName = {
  TOURS_PLACES: "tours_places",
  PLACES: "places",
  TOURS: "tours",
} as const;

const ColumnName = {
  ID: "id",
  TOUR_ID: "tour_id",
  PLACE_ID: "place_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.TOURS_PLACES, (table) => {
    table
      .uuid(ColumnName.ID)
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid(ColumnName.TOUR_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(TableName.TOURS)
      .onDelete(DELETE_STRATEGY);
    table
      .uuid(ColumnName.PLACE_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(TableName.PLACES)
      .onDelete(DELETE_STRATEGY);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.TOURS_PLACES);
}

export { up, down };
