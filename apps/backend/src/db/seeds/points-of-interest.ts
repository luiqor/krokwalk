import { Knex } from "knex";

import { DatabaseTableName } from "../../libs/modules/database/database";

import { places, tags, tours } from "./data/data";
import { getPlacesTags } from "./helpers/get-places-tags.helper";
import { getToursPlaces } from "./helpers/get-tours-places.helper";
import { getPlacesIds } from "./helpers/get-places-ids.helper";

const ColumnName = {
  ID: "id",
  TITLE: "title",
  SLUG: "slug",
} as const;

async function seed(knex: Knex): Promise<void> {
  await knex(DatabaseTableName.PLACES).del();
  await knex(DatabaseTableName.TAGS).del();
  await knex(DatabaseTableName.TOURS).del();

  await knex(DatabaseTableName.PLACES).insert(places);
  await knex(DatabaseTableName.TAGS).insert(tags);
  await knex(DatabaseTableName.TOURS).insert(tours);

  const insertedPlaces = await knex(DatabaseTableName.PLACES).select(
    ColumnName.ID,
    ColumnName.TITLE
  );
  const insertedTags = await knex(DatabaseTableName.TAGS).select(
    ColumnName.ID,
    ColumnName.SLUG
  );
  const insertedTours = await knex(DatabaseTableName.TOURS).select(
    ColumnName.ID,
    ColumnName.SLUG
  );

  const placesIds = getPlacesIds(insertedPlaces);

  const placesTags = getPlacesTags(placesIds, insertedTags);
  const toursPlaces = getToursPlaces(placesIds, insertedTours);

  await knex(DatabaseTableName.PLACES_TAGS).insert(placesTags);
  await knex(DatabaseTableName.TOURS_PLACES).insert(toursPlaces);
}

export { seed };
