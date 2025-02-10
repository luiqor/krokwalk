import { PlaceTitle, TagSlug } from "../enums/enums";
import { SluggedDbData, TitledDbData } from "../types/types";

type PlaceTag = {
  placeId: string;
  tagId: string;
};

const getPlacesTags = (
  places: TitledDbData[],
  tags: SluggedDbData[]
): PlaceTag[] => {
  const medievalTagId = tags.find((tag) => tag.slug === TagSlug.MEDIEVAL)!.id;
  const reconstructedTagId = tags.find(
    (tag) => tag.slug === TagSlug.RECONSTRUCTED
  )!.id;
  const religiousTagId = tags.find((tag) => tag.slug === TagSlug.RELIGIOUS)!.id;
  const architecturalTagId = tags.find(
    (tag) => tag.slug === TagSlug.ARCHITECTURAL
  )!.id;
  const baroqueTagId = tags.find((tag) => tag.slug === TagSlug.BAROQUE)!.id;
  const fortificationTagId = tags.find(
    (tag) => tag.slug === TagSlug.FORTIFICATION
  )!.id;
  const sculpturesTagId = tags.find(
    (tag) => tag.slug === TagSlug.SCULPTURES
  )!.id;

  const placesTags = [
    // Lyadsky Gate
    {
      placeId: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
      tagId: medievalTagId,
    },
    {
      placeId: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
      tagId: fortificationTagId,
    },

    // Golden Gate
    {
      placeId: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tagId: fortificationTagId,
    },
    {
      placeId: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tagId: reconstructedTagId,
    },
    {
      placeId: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tagId: medievalTagId,
    },

    // St. Sophia's Cathedral
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tagId: religiousTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tagId: architecturalTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tagId: medievalTagId,
    },

    // St. Michael's Golden-Domed Monastery
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tagId: baroqueTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tagId: religiousTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tagId: architecturalTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tagId: reconstructedTagId,
    },

    // St. Andrew's Church
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tagId: baroqueTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tagId: religiousTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tagId: architecturalTagId,
    },

    // House with Chimeras
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
      tagId: architecturalTagId,
    },
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
      tagId: sculpturesTagId,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
