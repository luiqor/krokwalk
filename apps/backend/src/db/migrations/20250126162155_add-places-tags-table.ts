import type { Knex } from "knex";

const TableName = {
  PLACES_TAGS: "places_tags",
  PLACES: "places",
  TAGS: "tags",
} as const;

const ColumnName = {
  ID: "id",
  TAG_ID: "tag_id",
  PLACE_ID: "place_id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.PLACES_TAGS, (table) => {
    table
      .uuid(ColumnName.ID)
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid(ColumnName.PLACE_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(TableName.PLACES)
      .onDelete(DELETE_STRATEGY);
    table
      .uuid(ColumnName.TAG_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(TableName.TAGS)
      .onDelete(DELETE_STRATEGY);
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
  await knex.schema.dropTableIfExists(TableName.PLACES_TAGS);
}

export { up, down };
