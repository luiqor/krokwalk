import { PlaceTitle } from "../enums/enums";
import { TitledDbData } from "../types/types";

const getPlacesIds = (places: TitledDbData[]): { [key: string]: string } => {
	const lyadskyGateId = places.find(
		(place) => place.title === PlaceTitle.LYADSKY_GATE
	)!.id;
	const stSophiasCathedralId = places.find(
		(place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
	)!.id;
	const stMichaelsGoldenDomedMonasteryId = places.find(
		(place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
	)!.id;
	const houseWithChimerasId = places.find(
		(place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
	)!.id;
	const kyivTramId = places.find(
		(place) => place.title === PlaceTitle.KYIV_TRAM
	)!.id;
	const kyivOperaHouseId = places.find(
		(place) => place.title === PlaceTitle.OPERA_HOUSE
	)!.id;
	const olgaMounmentId = places.find(
		(place) => place.title === PlaceTitle.OLGA_MONUMENT
	)!.id;
	const nationalMuseumOfHistoryId = places.find(
		(place) => place.title === PlaceTitle.NATIONAL_MUSEUM_OF_HISTORY
	)!.id;

	const kyivChestnutId = places.find(
		(place) => place.title === PlaceTitle.KYIV_CHESTNUT
	)!.id;
	const goldenGateMiniatureId = places.find(
		(place) => place.title === PlaceTitle.GOLDEN_GATE_MINIATURE
	)!.id;
	const heroesId = places.find(
		(place) => place.title === PlaceTitle.HEROES
	)!.id;
	const ghostOfKyivId = places.find(
		(place) => place.title === PlaceTitle.GHOST_OF_KYIV
	)!.id;
	const kyivElephantId = places.find(
		(place) => place.title === PlaceTitle.KYIV_ELEPHANT
	)!.id;

	return {
		LYADSKY_GATE: lyadskyGateId,
		ST_SOPHIAS_CATHEDRAL: stSophiasCathedralId,
		ST_MICHAELS_GOLDEN_DOMED_MONASTERY: stMichaelsGoldenDomedMonasteryId,
		HOUSE_WITH_CHIMERAS: houseWithChimerasId,
		KYIV_TRAM: kyivTramId,
		KYIV_CHESTNUT: kyivChestnutId,
		GOLDEN_GATE_MINIATURE: goldenGateMiniatureId,
		HEROES: heroesId,
		GHOST_OF_KYIV: ghostOfKyivId,
		KYIV_ELEPHANT: kyivElephantId,
		OPERA_HOUSE: kyivOperaHouseId,
		OLGA_MONUMENT: olgaMounmentId,
		NATIONAL_MUSEUM_OF_HISTORY: nationalMuseumOfHistoryId,
	};
};

export { getPlacesIds };
