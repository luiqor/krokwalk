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
    (tour) => tour.title === TourTitle.KyivHistoricalJourney
  )!;

  const toursPlaces = [
    {
      tour_id: tour.id,
      place_id: places.find((place) => place.title === PlaceTitle.LyadskyGate)!
        .id,
    },
    {
      tour_id: tour.id,
      place_id: places.find((place) => place.title === PlaceTitle.GoldenGate)!
        .id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.StSophiasCathedral
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.StMichaelsGoldenDomedMonastery
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.StAndrewsChurch
      )!.id,
    },
    {
      tour_id: tour.id,
      place_id: places.find(
        (place) => place.title === PlaceTitle.HouseWithChimeras
      )!.id,
    },
  ];

  return toursPlaces;
};

export { getToursPlaces };
