type TitledDbData = {
  id: string;
  title: string;
};

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
      place_id: places.find((place) => place.title === "Lyadsky Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Historical")!.id,
    },
    {
      place_id: places.find((place) => place.title === "Lyadsky Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Medieval")!.id,
    },
    {
      place_id: places.find((place) => place.title === "Lyadsky Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Fortification")!.id,
    },

    // Golden Gate
    {
      place_id: places.find((place) => place.title === "Golden Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Historical")!.id,
    },
    {
      place_id: places.find((place) => place.title === "Golden Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Architectural")!.id,
    },
    {
      place_id: places.find((place) => place.title === "Golden Gate")!.id,
      tag_id: tags.find((tag) => tag.title === "Reconstructed")!.id,
    },

    // St. Sophia's Cathedral
    {
      place_id: places.find(
        (place) => place.title === "St. Sophia's Cathedral"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "UNESCO")!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === "St. Sophia's Cathedral"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "Religious")!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === "St. Sophia's Cathedral"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "Byzantine Art")!.id,
    },

    // St. Michael's Golden-Domed Monastery
    {
      place_id: places.find(
        (place) => place.title === "St. Michael's Golden-Domed Monastery"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "Baroque")!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === "St. Michael's Golden-Domed Monastery"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "Monastery")!.id,
    },
    {
      place_id: places.find(
        (place) => place.title === "St. Michael's Golden-Domed Monastery"
      )!.id,
      tag_id: tags.find((tag) => tag.title === "Reconstructed")!.id,
    },

    // St. Andrew's Church
    {
      place_id: places.find((place) => place.title === "St. Andrew's Church")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Baroque")!.id,
    },
    {
      place_id: places.find((place) => place.title === "St. Andrew's Church")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Architectural")!.id,
    },
    {
      place_id: places.find((place) => place.title === "St. Andrew's Church")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Tourist Attraction")!.id,
    },

    // House with Chimeras
    {
      place_id: places.find((place) => place.title === "House with Chimeras")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Art Nouveau")!.id,
    },
    {
      place_id: places.find((place) => place.title === "House with Chimeras")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Sculptures")!.id,
    },
    {
      place_id: places.find((place) => place.title === "House with Chimeras")!
        .id,
      tag_id: tags.find((tag) => tag.title === "Architectural")!.id,
    },
  ];
  return placesTags;
};

export { getPlacesTags };
