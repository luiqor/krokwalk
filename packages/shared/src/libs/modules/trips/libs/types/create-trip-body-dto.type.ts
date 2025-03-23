import type { GeoPoint } from "./geo-point.type";

type CreateTripBodyDto = {
	startingPoint: GeoPoint;
	destinationPoint: GeoPoint;
	filteredTags: string[];
	filteredTours: string[];
	maximumWalkSeconds: number;
	prioritizedTags: string[];
	prioritizedTours: string[];
};

export type { CreateTripBodyDto };
