import type { GeoPoint } from "./geo-point.type";

type CreateTripDto = {
  startingPoint: GeoPoint;
  destinationPoint: GeoPoint;
  filteredTags: string[];
  filteredTours: string[];
  maximumWalkSeconds: number;
  prioritizedTags: string[];
  prioritizedTours: string[];
};

export type { CreateTripDto };
