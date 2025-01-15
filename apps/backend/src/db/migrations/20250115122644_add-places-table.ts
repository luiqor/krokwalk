import { type Knex } from "knex";

const TABLE_NAME = "places";

const ColumnName = {
  ID: "id",
  TITLE: "title",
  DESCRIPTION: "description",
  ADDRESS: "address",
  PREVIEW_LINK: "preview_link",
  LANTITUDE: "latitude",
  LONGITUDE: "longitude",
  ELEVATION: "elevation",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.TITLE).notNullable();
    table.string(ColumnName.DESCRIPTION).notNullable();
    table.string(ColumnName.ADDRESS).notNullable();
    table.string(ColumnName.PREVIEW_LINK).notNullable();
    table.float(ColumnName.LANTITUDE).notNullable();
    table.float(ColumnName.LONGITUDE).notNullable();
    table.float(ColumnName.ELEVATION);
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

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

export { up, down };
