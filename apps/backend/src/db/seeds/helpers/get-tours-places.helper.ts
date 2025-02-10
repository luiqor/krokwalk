import { TourSlug } from "../enums/enums";
import { SluggedDbData } from "../types/types";

type TourPlace = {
  tourId: string;
  placeId: string;
};

const getToursPlaces = (
  placesIds: { [key: string]: string },
  tours: SluggedDbData[]
): TourPlace[] => {
  const kyivHistoricalJourneyId = tours.find(
    (tour) => tour.slug === TourSlug.KYIV_HISTORICAL_JOURNEY
  )!.id;
  const kyivMiniSculpturesId = tours.find(
    (tour) => tour.slug === TourSlug.KYIV_MINI_SCULPTURES
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

  const toursPlaces = [
    {
      tourId: kyivHistoricalJourneyId,
      placeId: LYADSKY_GATE,
    },
    {
      tourId: kyivHistoricalJourneyId,
      placeId: GOLDEN_GATE,
    },
    {
      tourId: kyivHistoricalJourneyId,
      placeId: ST_SOPHIAS_CATHEDRAL,
    },
    {
      tourId: kyivHistoricalJourneyId,
      placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
    },
    {
      tourId: kyivHistoricalJourneyId,
      placeId: ST_ANDREWS_CHURCH,
    },
    {
      tourId: kyivHistoricalJourneyId,
      placeId: HOUSE_WITH_CHIMERAS,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: KYIV_TRAM,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: KYIV_CHESTNUT,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: GOLDEN_GATE_MINIATURE,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: HEROES,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: GHOST_OF_KYIV,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: PALIANYTSIA,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: KYIV_CHESS,
    },
    {
      tourId: kyivMiniSculpturesId,
      placeId: KYIV_ELEPHANT,
    },
  ];

  return toursPlaces;
};

export { getToursPlaces };
