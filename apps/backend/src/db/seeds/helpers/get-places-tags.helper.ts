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
  const twentyFirstCentuaryTagId = tags.find(
    (tag) => tag.slug === TagSlug.TWENTYFIRST_CENTUARY
  )!.id;

  const lyadskyGateId = places.find(
    (place) => place.title === PlaceTitle.LYADSKY_GATE
  )!.id;
  const goldenGateId = places.find(
    (place) => place.title === PlaceTitle.GOLDEN_GATE
  )!.id;
  const stSophiasCathedralId = places.find(
    (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
  )!.id;
  const stMichaelsGoldenDomedMonasteryId = places.find(
    (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
  )!.id;
  const stAndrewsChurchId = places.find(
    (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
  )!.id;
  const houseWithChimerasPlaceId = places.find(
    (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
  )!.id;

  const placesTags = [
    // Lyadsky Gate
    {
      placeId: lyadskyGateId,
      tagId: medievalTagId,
    },
    {
      placeId: lyadskyGateId,
      tagId: fortificationTagId,
    },

    // Golden Gate
    {
      placeId: goldenGateId,
      tagId: fortificationTagId,
    },
    {
      placeId: goldenGateId,
      tagId: reconstructedTagId,
    },
    {
      placeId: goldenGateId,
      tagId: medievalTagId,
    },

    // St. Sophia's Cathedral
    {
      placeId: stSophiasCathedralId,
      tagId: religiousTagId,
    },
    {
      placeId: stSophiasCathedralId,
      tagId: architecturalTagId,
    },
    {
      placeId: stSophiasCathedralId,
      tagId: medievalTagId,
    },

    // St. Michael's Golden-Domed Monastery
    {
      placeId: stMichaelsGoldenDomedMonasteryId,
      tagId: baroqueTagId,
    },
    {
      placeId: stMichaelsGoldenDomedMonasteryId,
      tagId: religiousTagId,
    },
    {
      placeId: stMichaelsGoldenDomedMonasteryId,
      tagId: architecturalTagId,
    },
    {
      placeId: stMichaelsGoldenDomedMonasteryId,
      tagId: reconstructedTagId,
    },

    // St. Andrew's Church
    {
      placeId: stAndrewsChurchId,
      tagId: baroqueTagId,
    },
    {
      placeId: stAndrewsChurchId,
      tagId: religiousTagId,
    },
    {
      placeId: stAndrewsChurchId,
      tagId: architecturalTagId,
    },

    // House with Chimeras
    {
      placeId: houseWithChimerasPlaceId,
      tagId: architecturalTagId,
    },
    {
      placeId: houseWithChimerasPlaceId,
      tagId: sculpturesTagId,
    },

    // Kyiv Tram
    {
      placeId: places.find((place) => place.title === PlaceTitle.KYIV_TRAM)!.id,
      tagId: twentyFirstCentuaryTagId,
    },

    // Kyiv Chestnut
    {
      placeId: places.find((place) => place.title === PlaceTitle.KYIV_CHESTNUT)!
        .id,
      tagId: twentyFirstCentuaryTagId,
    },

    // Golden Gate Miniature
    {
      placeId: places.find(
        (place) => place.title === PlaceTitle.GOLDEN_GATE_MINIATURE
      )!.id,
      tagId: sculpturesTagId,
    },

    // Heroes
    {
      placeId: places.find((place) => place.title === PlaceTitle.HEROES)!.id,
      tagId: sculpturesTagId,
    },

    // Ghost of Kyiv
    {
      placeId: places.find((place) => place.title === PlaceTitle.GHOST_OF_KYIV)!
        .id,
      tagId: sculpturesTagId,
    },

    // Palianytsia
    {
      placeId: places.find((place) => place.title === PlaceTitle.PALIANYTSIA)!
        .id,
      tagId: sculpturesTagId,
    },

    // Kyiv Chess
    {
      placeId: places.find((place) => place.title === PlaceTitle.KYIV_CHESS)!
        .id,
      tagId: sculpturesTagId,
    },

    // Kyiv Elephant
    {
      placeId: places.find((place) => place.title === PlaceTitle.KYIV_ELEPHANT)!
        .id,
      tagId: sculpturesTagId,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
