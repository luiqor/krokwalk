import { v4 as uuidv4 } from "uuid";

import { type Entity } from "../../libs/types/types";
import { type TagEntity } from "../tags/tags";
import { type TourEntity } from "../tours/tours";

import { type PlacesEntityParameters } from "./libs/types/types";
import { UserPlacesEntity } from "../user-places/user-places.entity";

class PlaceEntity implements Entity {
	private id: null | string;

	private title: string;

	private description: string;

	private address: string;

	private thumbnailLink: string;

	private lat: number;

	private lng: number;

	private createdAt: string;

	private updatedAt: string;

	private tags: TagEntity[];

	private tours: TourEntity[];

	private userPlace: UserPlacesEntity | null;

	private constructor({
		id,
		title,
		description,
		address,
		thumbnailLink,
		lat,
		lng,
		createdAt,
		updatedAt,
		tags,
		tours,
		userPlace,
	}: PlacesEntityParameters) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.address = address;
		this.thumbnailLink = thumbnailLink;
		this.lat = lat;
		this.lng = lng;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.tags = tags;
		this.tours = tours;
		this.userPlace = userPlace;
	}

	public static initializeNew({
		title,
		description,
		address,
		thumbnailLink,
		lat,
		lng,
	}: {
		title: string;
		description: string;
		address: string;
		thumbnailLink: string;
		lat: number;
		lng: number;
	}): PlaceEntity {
		return new PlaceEntity({
			id: uuidv4(),
			title,
			description,
			address,
			thumbnailLink,
			lat,
			lng,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			tags: [],
			tours: [],
			userPlace: null,
		});
	}

	public static initialize({
		id,
		title,
		description,
		address,
		thumbnailLink,
		lat,
		lng,
		createdAt,
		updatedAt,
	}: Omit<
		PlacesEntityParameters,
		"tags" | "tours" | "userPlace"
	>): PlaceEntity {
		return new PlaceEntity({
			id,
			title,
			description,
			address,
			thumbnailLink,
			lat,
			lng,
			createdAt,
			updatedAt,
			tags: [],
			tours: [],
			userPlace: null,
		});
	}

	public static initializeDetailed({
		id,
		title,
		description,
		address,
		thumbnailLink,
		lat,
		lng,
		createdAt,
		updatedAt,
		tags,
		tours,
	}: Omit<PlacesEntityParameters, "userPlace">): PlaceEntity {
		return new PlaceEntity({
			id,
			title,
			description,
			address,
			thumbnailLink,
			lat,
			lng,
			createdAt,
			updatedAt,
			tags,
			tours,
			userPlace: null,
		});
	}

	public static initializeUserDetailed({
		id,
		title,
		description,
		address,
		thumbnailLink,
		lat,
		lng,
		createdAt,
		updatedAt,
		tags,
		tours,
		userPlace,
	}: PlacesEntityParameters): PlaceEntity {
		return new PlaceEntity({
			id,
			title,
			description,
			address,
			thumbnailLink,
			lat,
			lng,
			createdAt,
			updatedAt,
			tags,
			tours,
			userPlace,
		});
	}

	public toObject(): {
		id: string;
		title: string;
		description: string;
		address: string;
		thumbnailLink: string;
		lat: number;
		lng: number;
		createdAt: string;
		updatedAt: string;
	} {
		return {
			id: this.id as string,
			title: this.title,
			description: this.description,
			address: this.address,
			thumbnailLink: this.thumbnailLink,
			lat: this.lat,
			lng: this.lng,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	public toDetailedObject(): {
		id: string;
		title: string;
		description: string;
		address: string;
		thumbnailLink: string;
		lat: number;
		lng: number;
		createdAt: string;
		updatedAt: string;
		tags: ReturnType<TagEntity["toObject"]>[];
		tours: ReturnType<TourEntity["toObject"]>[];
	} {
		return {
			id: this.id as string,
			title: this.title,
			description: this.description,
			address: this.address,
			thumbnailLink: this.thumbnailLink,
			lat: this.lat,
			lng: this.lng,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			tags: this.tags.map((tag) => tag.toObject()),
			tours: this.tours.map((tour) => tour.toObject()),
		};
	}

	public toUserDetailedObject(): {
		id: string;
		title: string;
		description: string;
		address: string;
		thumbnailLink: string;
		lat: number;
		lng: number;
		createdAt: string;
		updatedAt: string;
		tags: ReturnType<TagEntity["toObject"]>[];
		tours: ReturnType<TourEntity["toObject"]>[];
		visitedAt: string | null;
		visitStatus: string | null;
	} {
		const userPlace = this.userPlace?.toUserObject();

		return {
			id: this.id as string,
			title: this.title,
			description: this.description,
			address: this.address,
			thumbnailLink: this.thumbnailLink,
			lat: this.lat,
			lng: this.lng,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			tags: this.tags.map((tag) => tag.toObject()),
			tours: this.tours.map((tour) => tour.toObject()),
			visitedAt: userPlace?.visitedAt ?? null,
			visitStatus: userPlace?.visitStatus ?? null,
		};
	}
}

export { PlaceEntity };
