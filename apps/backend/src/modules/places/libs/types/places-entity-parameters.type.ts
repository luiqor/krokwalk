import { type TagEntity } from "~/modules/tags/tags";
import { TourEntity } from "~/modules/tours/tours";
import { UserPlacesEntity } from "~/modules/user-places/user-places.entity";

type PlacesEntityParameters = {
	id: string | null;
	title: string;
	description: string;
	address: string;
	thumbnailLink: string;
	lat: number;
	lng: number;
	createdAt: string;
	updatedAt: string;
	tags: TagEntity[];
	tours: TourEntity[];
	userPlace: UserPlacesEntity | null;
};

export { type PlacesEntityParameters };
