import type { VisitStatus } from "src/libs/modules/user-places/user-places";
import type { ValueOf } from "src/libs/types/types";

type CreateTripPlace = {
	id: string;
	title: string;
	lat: number;
	lng: number;
	priority: number;
	index: number;
	tags: string[];
	tours: string[];
	thumbnailLink: string;
	visitedAt: string | null;
	visitStatus: ValueOf<typeof VisitStatus> | null;
};

export type { CreateTripPlace };
