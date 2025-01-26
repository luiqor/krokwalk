import { type Knex } from "knex";

const TABLE_NAME = "places";

const ColumnName = {
  ID: "id",
  TITLE: "title",
  DESCRIPTION: "description",
  ADDRESS: "address",
  THUMBNAIL_LINK: "thumbnail_link",
  LAT: "lat",
  LNG: "lng",
  ELEVATION: "elevation",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid(ColumnName.ID)
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string(ColumnName.TITLE).notNullable();
    table.text(ColumnName.DESCRIPTION).notNullable();
    table.string(ColumnName.ADDRESS).notNullable();
    table.string(ColumnName.THUMBNAIL_LINK, 1000).notNullable();
    table.float(ColumnName.LAT).notNullable();
    table.float(ColumnName.LNG).notNullable();
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

async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
