import type { Repository } from "~/libs/types/types";

import { UserPlacesEntity } from "./user-places.entity";
import { UserPlacesModel } from "./user-places.model";
import { ValueOf, VisitStatus } from "shared";

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

	public async getById(userId: string, placeId: string) {
		const userPlace = await this.model.query().findOne({ userId, placeId });

		if (!userPlace) {
			return null;
		}

		return UserPlacesEntity.initialize({
			id: userPlace.id,
			visitedAt: userPlace.visitedAt,
			visitStatus: userPlace.visitStatus,
			userId: userPlace.userId,
			placeId: userPlace.placeId,
			createdAt: userPlace.createdAt,
			updatedAt: userPlace.updatedAt,
		});
	}

	public async create(entity: UserPlacesEntity) {
		const {
			userId,
			placeId,
			id,
			visitedAt,
			visitStatus,
			createdAt,
			updatedAt,
		} = entity.toNewObject();
		const userPlace = await this.model.query().insert({
			userId,
			placeId,
			id,
			visitedAt,
			visitStatus,
			createdAt,
			updatedAt,
		});

		return UserPlacesEntity.initialize({
			id: userPlace.id,
			visitedAt: userPlace.visitedAt,
			visitStatus: userPlace.visitStatus,
			userId: userPlace.userId,
			placeId: userPlace.placeId,
			createdAt: userPlace.createdAt,
			updatedAt: userPlace.updatedAt,
		});
	}

	public async updateStatus(
		userId: string,
		placeId: string,
		visitStatus: ValueOf<typeof VisitStatus>
	) {
		const updatedUserPlaces = await this.model
			.query()
			.patch({
				visitStatus: visitStatus as ValueOf<typeof VisitStatus>,
			})
			.where({ userId, placeId })
			.returning("*");

		const updatedUserPlace = updatedUserPlaces[0];

		return UserPlacesEntity.initialize({
			id: updatedUserPlace.id,
			visitedAt: updatedUserPlace.visitedAt,
			visitStatus: updatedUserPlace.visitStatus,
			userId: updatedUserPlace.userId,
			placeId: updatedUserPlace.placeId,
			createdAt: updatedUserPlace.createdAt,
			updatedAt: updatedUserPlace.updatedAt,
		});
	}
}

export { UserPlacesRepository };
