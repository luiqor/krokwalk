const TagSlug = {
  MEDIEVAL: "medieval",
  FORTIFICATION: "fortification",
  ARCHITECTURAL: "architectural",
  RECONSTRUCTED: "reconstructed",
  RELIGIOUS: "religious",
  BAROQUE: "baroque",
  SCULPTURES: "sculptures",
} as const;

const PlaceTitle = {
  LYADSKY_GATE: "Lyadsky Gate",
  GOLDEN_GATE: "Golden Gate",
  ST_SOPHIAS_CATHEDRAL: "St. Sophia's Cathedral",
  ST_MICHAELS_GOLDEN_DOMED_MONASTERY: "St. Michael's Golden-Domed Monastery",
  ST_ANDREWS_CHURCH: "St. Andrew's Church",
  HOUSE_WITH_CHIMERAS: "House with Chimeras",
} as const;

const TourSlug = {
  KYIV_HISTORICAL_JOURNEY: "kyiv-historical-journey",
} as const;

export { TagSlug, PlaceTitle, TourSlug };
