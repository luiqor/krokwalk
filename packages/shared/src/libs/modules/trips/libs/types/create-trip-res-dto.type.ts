import type { CreateTripPlace } from "./create-trip-place.type";

type CreateTripResDto = {
	path: number[];
	totalTime: number;
	visitedPlaces: CreateTripPlace[];
	startingPoint: [number, number];
	destinationPoint: [number, number];
};

export type { CreateTripResDto };
