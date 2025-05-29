const TagSlug = {
	MEDIEVAL: "medieval",
	FORTIFICATION: "fortification",
	ARCHITECTURAL: "architectural",
	RECONSTRUCTED: "reconstructed",
	RELIGIOUS: "religious",
	BAROQUE: "baroque",
	SCULPTURES: "sculptures",
	TWENTYFIRST_CENTUARY: "21st-centuary",
} as const;

const PlaceTitle = {
	LYADSKY_GATE: "Lyadsky Gate",
	ST_SOPHIAS_CATHEDRAL: "St. Sophia's Cathedral",
	ST_MICHAELS_GOLDEN_DOMED_MONASTERY: "St. Michael's Golden-Domed Monastery",
	HOUSE_WITH_CHIMERAS: "House with Chimeras",
	KYIV_TRAM: "Kyiv Tram",
	KYIV_CHESTNUT: "Kyiv Chestnut",
	GOLDEN_GATE_MINIATURE: "Golden Gate Miniature",
	HEROES: "Heroes",
	GHOST_OF_KYIV: "Ghost of Kyiv",
	KYIV_ELEPHANT: "Kyiv Elephant",
	OPERA_HOUSE: "National Opera of Ukraine",
	NATIONAL_MUSEUM_OF_HISTORY: "National Museum of History of Ukraine",
	OLGA_MONUMENT: "The Monument to Grand Princess Olga",
} as const;

const TourSlug = {
	KYIV_HISTORICAL_JOURNEY: "kyiv-historical-journey",
	KYIV_MINI_SCULPTURES: "kyiv-mini-sculptures",
} as const;

export { TagSlug, PlaceTitle, TourSlug };
