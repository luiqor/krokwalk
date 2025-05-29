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
		ST_SOPHIAS_CATHEDRAL,
		ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
		HOUSE_WITH_CHIMERAS,
		KYIV_TRAM,
		KYIV_CHESTNUT,
		GOLDEN_GATE_MINIATURE,
		HEROES,
		GHOST_OF_KYIV,
		KYIV_ELEPHANT,
		OPERA_HOUSE,
		OLGA_MONUMENT,
		NATIONAL_MUSEUM_OF_HISTORY,
	} = placesIds;

	const toursPlaces = [
		{
			tourId: kyivHistoricalJourneyId,
			placeId: LYADSKY_GATE,
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
			placeId: HOUSE_WITH_CHIMERAS,
		},
		{
			tourId: kyivHistoricalJourneyId,
			placeId: OPERA_HOUSE,
		},
		{
			tourId: kyivHistoricalJourneyId,
			placeId: NATIONAL_MUSEUM_OF_HISTORY,
		},
		{
			tourId: kyivHistoricalJourneyId,
			placeId: OLGA_MONUMENT,
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
			placeId: KYIV_ELEPHANT,
		},
	];

	return toursPlaces;
};

export { getToursPlaces };
