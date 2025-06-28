import type { TagDto } from "src/libs/modules/tags/tags";
import type { TourDto } from "src/libs/modules/tours/tours";

type PlaceDto = {
	id: string;
	title: string;
	description: string;
	address: string;
	thumbnailLink: string;
	lat: number;
	lng: number;
	createdAt: string;
	updatedAt: string;
	tags: TagDto[];
	tours: TourDto[];
};

export type { PlaceDto };
