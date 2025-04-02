import { CreateTripPlace } from "shared";

type StopOverPlace = CreateTripPlace & {
	visitedAt: string | null;
	markAsVisited: boolean;
};

export type { StopOverPlace };
