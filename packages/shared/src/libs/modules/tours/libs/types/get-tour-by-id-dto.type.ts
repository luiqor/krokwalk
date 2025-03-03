import type { PlaceDto } from "src/libs/modules/places/places";
import type { TourDto } from "./tour-dto.type";

type GetTourByIdDto = TourDto & {
  places: Omit<PlaceDto, "tags" | "tours">[];
};

export type { GetTourByIdDto };
