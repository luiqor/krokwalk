import { Knex } from "knex";
import { places, tags } from "./data/data";
import { getPlacesTags } from "./helpers/get-places-tags.helper";
const TableName = {
  PLACES_TAGS: "places_tags",
  PLACES: "places",
  TAGS: "tags",
} as const;

async function seed(knex: Knex): Promise<void> {
  await knex(TableName.PLACES).del();
  await knex(TableName.TAGS).del();

  await knex(TableName.PLACES).insert(places);

  await knex(TableName.TAGS).insert(tags);

  const insertedPlaces = await knex(TableName.PLACES).select("id", "title");
  const insertedTags = await knex(TableName.TAGS).select("id", "title");

  const placesTags = getPlacesTags(insertedPlaces, insertedTags);

  await knex(TableName.PLACES_TAGS).insert(placesTags);
}

export { seed };
