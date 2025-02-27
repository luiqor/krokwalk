import type { TourDto } from "src/libs/modules/tours/tours";
import type { TagDto } from "src/libs/modules/tags/tags";

type GetWalkTimeDto = {
  minimumWalkSeconds: number;
  tags: TagDto[];
  tours: TourDto[];
  startingPoint: string;
  destinationPoint: string;
};

export type { GetWalkTimeDto };
