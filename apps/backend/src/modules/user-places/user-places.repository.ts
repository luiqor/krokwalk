import type { Repository } from "~/libs/types/types";

import { UserPlacesEntity } from "./user-places.entity";
import { UserPlacesModel } from "./user-places.model";

class UserPlacesRepository implements Repository {
	private model: typeof UserPlacesModel;

	public constructor(model: typeof UserPlacesModel) {
		this.model = model;
	}

	public async getAll(userId: string) {
		const userPlaces = await this.model.query().where({ userId });

		return await Promise.all(
			userPlaces.map(async (userPlace) =>
				UserPlacesEntity.initialize({
					id: userPlace.id,
					visitedAt: userPlace.visitedAt,
					visitStatus: userPlace.visitStatus,
					userId: userPlace.userId,
					placeId: userPlace.placeId,
					createdAt: userPlace.createdAt,
					updatedAt: userPlace.updatedAt,
				})
			)
		);
	}
}

export { UserPlacesRepository };
