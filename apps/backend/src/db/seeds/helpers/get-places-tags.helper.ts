import { PlaceTitle, TagTitle } from "../enums/enums";
import { TitledDbData } from "../types/types";

type PlaceTag = {
  place_id: string;
  tag_id: string;
};

const getPlacesTags = (
  places: TitledDbData[],
  tags: TitledDbData[]
): PlaceTag[] => {
  const placesTags = [
    // Lyadsky Gate
    {
      place_id: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.MEDIEVAL)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.FORTIFICATION)!.id,
    },

    // Golden Gate
    {
      place_id: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.FORTIFICATION)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.RECONSTRUCTED)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.MEDIEVAL)!.id,
    },

    // St. Sophia's Cathedral
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.RELIGIOUS)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ARCHITECTURAL)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.MEDIEVAL)!.id,
    },

    // St. Michael's Golden-Domed Monastery
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.BAROQUE)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.RELIGIOUS)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ARCHITECTURAL)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.RECONSTRUCTED)!.id,
    },

    // St. Andrew's Church
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.BAROQUE)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.RELIGIOUS)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ARCHITECTURAL)!.id,
    },

    // House with Chimeras
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ARCHITECTURAL)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.SCULPTURES)!.id,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
