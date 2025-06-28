import type { Repository } from "~/libs/types/types";

import { TourEntity } from "./tour.entity";
import { TourModel } from "./tour.model";
import { RelationName } from "~/libs/enums/relation-name.enum";
import { PlaceEntity } from "../places/place.entity";

class TourRepository implements Repository {
	private model: typeof TourModel;

	public constructor(model: typeof TourModel) {
		this.model = model;
	}

	public async getAll() {
		const tours = await this.model.query();

		return await Promise.all(
			tours.map(async (tour) =>
				TourEntity.initialize({
					id: tour.id,
					title: tour.title,
					slug: tour.slug,
					description: tour.description,
					createdAt: tour.createdAt,
					updatedAt: tour.updatedAt,
				})
			)
		);
	}

	public async getManyBySlugs(slugs: string[]) {
		const tours = await this.model.query().whereIn("slug", slugs);

		return await Promise.all(
			tours.map(async (tour) =>
				TourEntity.initialize({
					id: tour.id,
					title: tour.title,
					slug: tour.slug,
					description: tour.description,
					createdAt: tour.createdAt,
					updatedAt: tour.updatedAt,
				})
			)
		);
	}

	public async getById(id: string) {
		const tour = await this.model
			.query()
			.findById(id)
			.withGraphJoined(RelationName.PLACES);

		if (!tour) {
			return null;
		}

		return TourEntity.initializeDetailed({
			id: tour.id,
			title: tour.title,
			slug: tour.slug,
			description: tour.description,
			createdAt: tour.createdAt,
			updatedAt: tour.updatedAt,
			places: tour.places!.map((place) => {
				return PlaceEntity.initialize({
					id: place.id,
					title: place.title,
					description: place.description,
					address: place.address,
					thumbnailLink: place.thumbnailLink,
					lat: place.lat,
					lng: place.lng,
					createdAt: place.createdAt,
					updatedAt: place.updatedAt,
				});
			}),
		});
	}
}

export { TourRepository };
