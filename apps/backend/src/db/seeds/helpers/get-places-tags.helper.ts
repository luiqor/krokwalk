import { TagSlug } from "../enums/enums";
import { SluggedDbData } from "../types/types";

type PlaceTag = {
	placeId: string;
	tagId: string;
};

const getPlacesTags = (
	placesIds: { [key: string]: string },
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

	const placesTags = [
		// Lyadsky Gate
		{
			placeId: LYADSKY_GATE,
			tagId: medievalTagId,
		},
		{
			placeId: LYADSKY_GATE,
			tagId: fortificationTagId,
		},
		{
			placeId: LYADSKY_GATE,
			tagId: sculpturesTagId,
		},

		// St. Sophia's Cathedral
		{
			placeId: ST_SOPHIAS_CATHEDRAL,
			tagId: religiousTagId,
		},
		{
			placeId: ST_SOPHIAS_CATHEDRAL,
			tagId: architecturalTagId,
		},
		{
			placeId: ST_SOPHIAS_CATHEDRAL,
			tagId: medievalTagId,
		},

		// St. Michael's Golden-Domed Monastery
		{
			placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
			tagId: baroqueTagId,
		},
		{
			placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
			tagId: religiousTagId,
		},
		{
			placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
			tagId: architecturalTagId,
		},
		{
			placeId: ST_MICHAELS_GOLDEN_DOMED_MONASTERY,
			tagId: reconstructedTagId,
		},

		// House with Chimeras
		{
			placeId: HOUSE_WITH_CHIMERAS,
			tagId: architecturalTagId,
		},
		{
			placeId: HOUSE_WITH_CHIMERAS,
			tagId: sculpturesTagId,
		},

		// Kyiv Tram
		{
			placeId: KYIV_TRAM,
			tagId: twentyFirstCentuaryTagId,
		},
		{
			placeId: KYIV_TRAM,
			tagId: sculpturesTagId,
		},

		// Kyiv Chestnut
		{
			placeId: KYIV_CHESTNUT,
			tagId: twentyFirstCentuaryTagId,
		},
		{
			placeId: KYIV_CHESTNUT,
			tagId: sculpturesTagId,
		},

		// Golden Gate Miniature
		{
			placeId: GOLDEN_GATE_MINIATURE,
			tagId: sculpturesTagId,
		},
		{
			placeId: GOLDEN_GATE_MINIATURE,
			tagId: twentyFirstCentuaryTagId,
		},

		// Heroes
		{
			placeId: HEROES,
			tagId: sculpturesTagId,
		},
		{
			placeId: HEROES,
			tagId: twentyFirstCentuaryTagId,
		},

		// Ghost of Kyiv
		{
			placeId: GHOST_OF_KYIV,
			tagId: sculpturesTagId,
		},
		{
			placeId: GHOST_OF_KYIV,
			tagId: twentyFirstCentuaryTagId,
		},

		// Kyiv Elephant
		{
			placeId: KYIV_ELEPHANT,
			tagId: sculpturesTagId,
		},
		{
			placeId: KYIV_ELEPHANT,
			tagId: twentyFirstCentuaryTagId,
		},

		// Opera House
		{
			placeId: OPERA_HOUSE,
			tagId: architecturalTagId,
		},

		// The Monument to Grand Princess Olga
		{
			placeId: OLGA_MONUMENT,
			tagId: sculpturesTagId,
		},

		// National Museum of History of Ukraine
		{
			placeId: NATIONAL_MUSEUM_OF_HISTORY,
			tagId: architecturalTagId,
		},
	];
	return placesTags;
};

export { getPlacesTags };
