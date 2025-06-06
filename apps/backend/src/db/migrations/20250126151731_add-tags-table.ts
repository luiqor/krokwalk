import type { Knex } from "knex";

const TABLE_NAME = "tags";

const ColumnName = {
  ID: "id",
  TITLE: "title",
  SLUG: "slug",
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
    table.string(ColumnName.SLUG).notNullable();
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
