import { TagSlug } from "../enums/enums";
import { SluggedDbData } from "../types/types";

type PlaceTag = {
  placeId: string;
  tagId: string;
};

const getPlacesTags = (
  placesIds: { [key: string]: string },
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
  const twentyFirstCentuaryTagId = tags.find(
    (tag) => tag.slug === TagSlug.TWENTYFIRST_CENTUARY
  )!.id;

  const {
    LYADSKY_GATE,
    GOLDEN_GATE,
    ST_SOPHIAS_CATHEDRAL,
    ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
    ST_ANDREWS_CHURCH,
    HOUSE_WITH_CHIMERAS,
    KYIV_TRAM,
    KYIV_CHESTNUT,
    GOLDEN_GATE_MINIATURE,
    HEROES,
    GHOST_OF_KYIV,
    PALIANYTSIA,
    KYIV_CHESS,
    KYIV_ELEPHANT,
  } = placesIds;

  const placesTags = [
    // Lyadsky Gate
    {
      placeId: LYADSKY_GATE,
      tagId: medievalTagId,
    },
    {
      placeId: LYADSKY_GATE,
      tagId: fortificationTagId,
    },

    // Golden Gate
    {
      placeId: GOLDEN_GATE,
      tagId: fortificationTagId,
    },
    {
      placeId: GOLDEN_GATE,
      tagId: reconstructedTagId,
    },
    {
      placeId: GOLDEN_GATE,
      tagId: medievalTagId,
    },

    // St. Sophia's Cathedral
    {
      placeId: ST_SOPHIAS_CATHEDRAL,
      tagId: religiousTagId,
    },
    {
      placeId: ST_SOPHIAS_CATHEDRAL,
      tagId: architecturalTagId,
    },
    {
      placeId: ST_SOPHIAS_CATHEDRAL,
      tagId: medievalTagId,
    },

    // St. Michael's Golden-Domed Monastery
    {
      placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
      tagId: baroqueTagId,
    },
    {
      placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
      tagId: religiousTagId,
    },
    {
      placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
      tagId: architecturalTagId,
    },
    {
      placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
      tagId: reconstructedTagId,
    },

    // St. Andrew's Church
    {
      placeId: ST_ANDREWS_CHURCH,
      tagId: baroqueTagId,
    },
    {
      placeId: ST_ANDREWS_CHURCH,
      tagId: religiousTagId,
    },
    {
      placeId: ST_ANDREWS_CHURCH,
      tagId: architecturalTagId,
    },

    // House with Chimeras
    {
      placeId: HOUSE_WITH_CHIMERAS,
      tagId: architecturalTagId,
    },
    {
      placeId: HOUSE_WITH_CHIMERAS,
      tagId: sculpturesTagId,
    },

    // Kyiv Tram
    {
      placeId: KYIV_TRAM,
      tagId: twentyFirstCentuaryTagId,
    },

    // Kyiv Chestnut
    {
      placeId: KYIV_CHESTNUT,
      tagId: twentyFirstCentuaryTagId,
    },

    // Golden Gate Miniature
    {
      placeId: GOLDEN_GATE_MINIATURE,
      tagId: sculpturesTagId,
    },

    // Heroes
    {
      placeId: HEROES,
      tagId: sculpturesTagId,
    },

    // Ghost of Kyiv
    {
      placeId: GHOST_OF_KYIV,
      tagId: sculpturesTagId,
    },

    // Palianytsia
    {
      placeId: PALIANYTSIA,
      tagId: sculpturesTagId,
    },

    // Kyiv Chess
    {
      placeId: KYIV_CHESS,
      tagId: sculpturesTagId,
    },

    // Kyiv Elephant
    {
      placeId: KYIV_ELEPHANT,
      tagId: sculpturesTagId,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
