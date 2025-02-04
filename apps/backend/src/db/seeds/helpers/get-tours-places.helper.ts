import { PlaceTitle, TourTitle } from "../enums/enums";
import { TitledDbData } from "../types/types";

type TourPlace = {
  tour_id: string;
  place_id: string;
};

const getToursPlaces = (
  places: TitledDbData[],
  tours: TitledDbData[]
): TourPlace[] => {
  const tour = tours.find(
    (tour) => tour.title === TourTitle.KYIV_HISTORICAL_JOURNEY
  )!;

  const toursPlaces = [
    {
      tour_id: tour.id,
      place_id: places.find((place) => place.title === PlaceTitle.LYADSKY_GATE)!
        .id,
    },
    {
      tour_id: tour.id,
      place_id: places.find((place) => place.title === PlaceTitle.GOLDEN_GATE)!
        .id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
      )!.id,
    },
  ];

  return toursPlaces;
};

export { getToursPlaces };
