import type { Repository } from "~/libs/types/types";
import { RelationName } from "../../libs/enums/enums";

import { PlaceEntity } from "./place.entity";
import { PlaceModel } from "./place.model";
import { TagEntity } from "../tags/tag.entity";
import { TourEntity } from "../tours/tour.entity";
import { UserPlacesEntity } from "../user-places/user-places.entity";

class PlaceRepository implements Repository {
	private model: typeof PlaceModel;

	public constructor(model: typeof PlaceModel) {
		this.model = model;
	}

	public async getAll({
		tags,
		tours,
	}: {
		tags?: string[];
		tours?: string[];
	}): Promise<PlaceEntity[]> {
		let query = this.model
			.query()
			.withGraphJoined(`[${RelationName.TAGS}, ${RelationName.TOURS}]`);

		if (tags && tags.length > 0) {
			query = query.where((builder) => {
				tags.forEach((tag) => {
					builder.orWhere("tags.slug", "ILIKE", `%${tag}%`);
				});
			});
		}

		if (tours && tours.length > 0) {
			query = query.where((builder) => {
				tours.forEach((tour) => {
					builder.orWhere("tours.slug", "ILIKE", `%${tour}%`);
				});
			});
		}

		const places = await query;

		return await Promise.all(
			places.map(async (place) => {
				return PlaceEntity.initialize({
					id: place.id,
					title: place.title,
					description: place.description,
					address: place.address,
					thumbnailLink: place.thumbnailLink,
					lat: place.lat,
					lng: place.lng,
					elevation: place.elevation ?? null,
					createdAt: place.createdAt,
					updatedAt: place.updatedAt,
				});
			})
		);
	}

	public async getById(id: string): Promise<PlaceEntity | null> {
		const place = await this.model
			.query()
			.findById(id)
			.withGraphJoined(`[${RelationName.TAGS}, ${RelationName.TOURS}]`);

		if (!place) {
			return null;
		}

		return PlaceEntity.initializeDetailed({
			id: place.id,
			title: place.title,
			description: place.description,
			address: place.address,
			thumbnailLink: place.thumbnailLink,
			lat: place.lat,
			lng: place.lng,
			elevation: place.elevation ?? null,
			createdAt: place.createdAt,
			updatedAt: place.updatedAt,
			tags: place.tags!.map((tag) => {
				return TagEntity.initialize({
					id: tag.id,
					title: tag.title,
					slug: tag.slug,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				});
			}),
			tours: place.tours!.map((tour) => {
				return TourEntity.initialize({
					id: tour.id,
					title: tour.title,
					slug: tour.slug,
					description: tour.description,
					createdAt: tour.createdAt,
					updatedAt: tour.updatedAt,
				});
			}),
		});
	}

	public async getManyByCoordinates(
		coordinates: [number, number][],
		userId: string | null = null
	): Promise<PlaceEntity[]> {
		const query = this.model.query().where((builder) => {
			coordinates.forEach(([lat, lng]) => {
				builder.orWhere((subQuery) => {
					subQuery.where("lat", lat).andWhere("lng", lng);
				});
			});
		});

		if (userId) {
			query
				.withGraphJoined(
					`[${RelationName.TAGS}, ${RelationName.TOURS}, userPlaces]`
				)
				.modifyGraph("userPlaces", (builder) => {
					builder.where("userPlaces.userId", userId);
				});
		} else {
			query.withGraphJoined(`[${RelationName.TAGS}, ${RelationName.TOURS}]`);
		}

		const places = await query;

		console.log("userId", userId);
		console.log("places", places);

		return Promise.all(
			places.map(async (place) => {
				return PlaceEntity.initializeUserDetailed({
					id: place.id,
					title: place.title,
					description: place.description,
					address: place.address,
					thumbnailLink: place.thumbnailLink,
					lat: place.lat,
					lng: place.lng,
					elevation: place.elevation ?? null,
					createdAt: place.createdAt,
					updatedAt: place.updatedAt,
					tags: place.tags!.map((tag) => {
						return TagEntity.initialize({
							id: tag.id,
							title: tag.title,
							slug: tag.slug,
							createdAt: tag.createdAt,
							updatedAt: tag.updatedAt,
						});
					}),
					tours: place.tours!.map((tour) => {
						return TourEntity.initialize({
							id: tour.id,
							title: tour.title,
							slug: tour.slug,
							description: tour.description,
							createdAt: tour.createdAt,
							updatedAt: tour.updatedAt,
						});
					}),
					userPlace: place.userPlaces?.[0]
						? UserPlacesEntity.initialize({
								id: place.userPlaces[0].id,
								placeId: place.userPlaces[0].placeId,
								userId: place.userPlaces[0].userId,
								createdAt: place.userPlaces[0].createdAt,
								updatedAt: place.userPlaces[0].updatedAt,
								visitedAt: place.userPlaces[0].visitedAt,
								visitStatus: place.userPlaces[0].visitStatus,
							})
						: null,
				});
			})
		);
	}
}

export { PlaceRepository };
