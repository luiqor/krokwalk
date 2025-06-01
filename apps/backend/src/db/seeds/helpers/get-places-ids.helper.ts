import { PlaceTitle } from "../enums/enums";
import { TitledDbData } from "../types/types";

const getPlacesIds = (places: TitledDbData[]): { [key: string]: string } => {
  const lyadskyGateId = places.find(
    (place) => place.title === PlaceTitle.LYADSKY_GATE
  )!.id;
  const goldenGateId = places.find(
    (place) => place.title === PlaceTitle.GOLDEN_GATE
  )!.id;
  const stSophiasCathedralId = places.find(
    (place) => place.title === PlaceTitle.ST_SOPHIAS_CATHEDRAL
  )!.id;
  const stMichaelsGoldenDomedMonasteryId = places.find(
    (place) => place.title === PlaceTitle.ST_MICHAELS_GOLDEN_DOMED_MONASTERY
  )!.id;
  const stAndrewsChurchId = places.find(
    (place) => place.title === PlaceTitle.ST_ANDREWS_CHURCH
  )!.id;
  const houseWithChimerasId = places.find(
    (place) => place.title === PlaceTitle.HOUSE_WITH_CHIMERAS
  )!.id;
  const kyivTramId = places.find(
    (place) => place.title === PlaceTitle.KYIV_TRAM
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
  const palianytsiaId = places.find(
    (place) => place.title === PlaceTitle.PALIANYTSIA
  )!.id;
  const kyivChessId = places.find(
    (place) => place.title === PlaceTitle.KYIV_CHESS
  )!.id;
  const kyivElephantId = places.find(
    (place) => place.title === PlaceTitle.KYIV_ELEPHANT
  )!.id;

  return {
    LYADSKY_GATE: lyadskyGateId,
    GOLDEN_GATE: goldenGateId,
    ST_SOPHIAS_CATHEDRAL: stSophiasCathedralId,
    ST_MICHAELS_GOLDEN_DOMED_MONASTERY: stMichaelsGoldenDomedMonasteryId,
    ST_ANDREWS_CHURCH: stAndrewsChurchId,
    HOUSE_WITH_CHIMERAS: houseWithChimerasId,
    KYIV_TRAM: kyivTramId,
    KYIV_CHESTNUT: kyivChestnutId,
    GOLDEN_GATE_MINIATURE: goldenGateMiniatureId,
    HEROES: heroesId,
    GHOST_OF_KYIV: ghostOfKyivId,
    PALIANYTSIA: palianytsiaId,
    KYIV_CHESS: kyivChessId,
    KYIV_ELEPHANT: kyivElephantId,
  };
};

export { getPlacesIds };
