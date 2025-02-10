import { PlaceTitle, TourSlug } from "../enums/enums";
import { SluggedDbData, TitledDbData } from "../types/types";

type TourPlace = {
  tourId: string;
  placeId: string;
};

const getToursPlaces = (
  places: TitledDbData[],
  tours: SluggedDbData[]
): TourPlace[] => {
  const tour = tours.find(
    (tour) => tour.slug === TourSlug.KYIV_HISTORICAL_JOURNEY
  )!;

  const toursPlaces = [
    {
      tourId: tour.id,
      placeId: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
    },
    {
      tourId: tour.id,
      placeId: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
    },
    {
      tourId: tour.id,
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
    },
    {
      tourId: tour.id,
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
    },
    {
      tourId: tour.id,
      placeId: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
    },
    {
      tourId: tour.id,
      placeId: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
    },
  ];

  return toursPlaces;
};

export { getToursPlaces };
