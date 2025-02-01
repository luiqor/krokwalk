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
      place_id: places.find((place) => place.title === PlaceTitle.LyadskyGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Historical)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.LyadskyGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Medieval)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.LyadskyGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Fortification)!.id,
    },

    // Golden Gate
    {
      place_id: places.find((place) => place.title === PlaceTitle.GoldenGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Historical)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.GoldenGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Architectural)!.id,
    },
    {
      place_id: places.find((place) => place.title === PlaceTitle.GoldenGate)!
        .id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Reconstructed)!.id,
    },

    // St. Sophia's Cathedral
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StSophiasCathedral
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.UNESCO)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StSophiasCathedral
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Religious)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StSophiasCathedral
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ByzantineArt)!.id,
    },

    // St. Michael's Golden-Domed Monastery
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StMichaelsGoldenDomedMonastery
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Baroque)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StMichaelsGoldenDomedMonastery
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Monastery)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StMichaelsGoldenDomedMonastery
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Reconstructed)!.id,
    },

    // St. Andrew's Church
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StAndrewsChurch
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Baroque)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StAndrewsChurch
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Architectural)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.StAndrewsChurch
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.TouristAttraction)!.id,
    },

    // House with Chimeras
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.HouseWithChimeras
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.ArtNouveau)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.HouseWithChimeras
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Sculptures)!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === PlaceTitle.HouseWithChimeras
      )!.id,
      tag_id: tags.find((tag) => tag.title === TagTitle.Architectural)!.id,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
