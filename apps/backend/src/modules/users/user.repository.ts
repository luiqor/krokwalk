import type { Repository } from "~/libs/types/types";

import { UserModel } from "./user.model";
import { UserEntity } from "./user.entity";
import { DatabaseTableName } from "~/libs/modules/database/database";

class UserRepository implements Repository {
	private model: typeof UserModel;

	public constructor(model: typeof UserModel) {
		this.model = model;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, username, passwordHash, passwordSalt } =
			entity.toNewObject();

		const user = await this.model
			.query()
			.insert({
				email,
				username,
				passwordHash,
				passwordSalt,
			})
			.returning("*");

		return UserEntity.initialize({
			id: user.id,
			email: user.email,
			username: user.username,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
			mainAchievementId: user.mainAchievementId,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	}

	public async getByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.model.query().where({ email }).first();

		return user
			? UserEntity.initialize({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					mainAchievementId: user.mainAchievementId,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getById(id: string): Promise<null | UserEntity> {
		const user = await this.model
			.query()
			.findById(id)
			.withGraphJoined(DatabaseTableName.ACHIEVEMENTS);

		return user
			? UserEntity.initializeDetailed({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					mainAchievementId: user.mainAchievementId,
					achievements: user.achievements.map((achievement) => ({
						id: achievement.id,
						title: achievement.title,
						description: achievement.description,
						iconLink: achievement.iconLink,
						achievementEvent: achievement.achievementEvent,
						targetCount: achievement.targetCount,
					})),
				})
			: null;
	}

	public getAll(): Promise<null[]> {
		return Promise.resolve([null]);
	}

	public async addAchievement(
		id: string,
		achievementId: string
	): Promise<null | UserEntity> {
		await this.model
			.relatedQuery(DatabaseTableName.ACHIEVEMENTS)
			.for(id)
			.relate(achievementId);

		const user = await this.model
			.query()
			.findById(id)
			.withGraphJoined("achievements")
			.modifyGraph("achievements", (builder) => {
				builder.where("id", achievementId);
			});

		return user
			? UserEntity.initializeDetailed({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					mainAchievementId: user.mainAchievementId,
					achievements: user.achievements.map((achievement) => ({
						id: achievement.id,
						title: achievement.title,
						description: achievement.description,
						iconLink: achievement.iconLink,
						achievementEvent: achievement.achievementEvent,
						targetCount: achievement.targetCount,
					})),
				})
			: null;
	}

	public async getAchievementById(
		id: string,
		achievementId: string
	): Promise<null | UserEntity> {
		const user = await this.model
			.query()
			.findById(id)
			.withGraphJoined("achievements")
			.modifyGraph("achievements", (builder) => {
				builder.where("achievements.id", achievementId);
			});

		return user
			? UserEntity.initializeDetailed({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					mainAchievementId: user.mainAchievementId,
					achievements: user.achievements.map((achievement) => ({
						id: achievement.id,
						title: achievement.title,
						description: achievement.description,
						iconLink: achievement.iconLink,
						achievementEvent: achievement.achievementEvent,
						targetCount: achievement.targetCount,
					})),
				})
			: null;
	}

	public async getAchievementsByIds(
		id: string,
		achievementIds: string[]
	): Promise<null | UserEntity> {
		const user = await this.model
			.query()
			.findById(id)
			.withGraphJoined("achievements")
			.modifyGraph("achievements", (builder) => {
				builder.whereIn("achievements.id", achievementIds);
			});

		return user
			? UserEntity.initializeDetailed({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					mainAchievementId: user.mainAchievementId,
					achievements: user.achievements.map((achievement) => ({
						id: achievement.id,
						title: achievement.title,
						description: achievement.description,
						iconLink: achievement.iconLink,
						achievementEvent: achievement.achievementEvent,
						targetCount: achievement.targetCount,
					})),
				})
			: null;
	}

	public async editUserMainAchievement(
		id: string,
		mainAchievementId: string
	): Promise<null | UserEntity> {
		const user = await this.model
			.query()
			.findById(id)
			.patch({ mainAchievementId })
			.returning("*")
			.first();

		return user
			? UserEntity.initialize({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					mainAchievementId: user.mainAchievementId,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getTopUsersByConfirmedPlaces({
		startDate,
		endDate,
		limit,
		skip = 0,
	}: {
		startDate: Date;
		endDate: Date;
		limit: number;
		skip: number;
	}): Promise<{ user: UserEntity; confirmedPlacesCount: number }[]> {
		const users = await this.model
			.query()
			.joinRelated("places")
			.whereBetween("places.visitedAt", [startDate, endDate])
			.select("users.*")
			.count("places.id as confirmedPlacesCount")
			.groupBy("users.id")
			.orderBy("confirmedPlacesCount", "desc")
			.offset(skip)
			.limit(limit);

		if (users.length === 0) {
			return [];
		}

		return users.map((user) => ({
			user: UserEntity.initialize({
				id: user.id,
				email: user.email,
				username: user.username,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				mainAchievementId: user.mainAchievementId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}),
			confirmedPlacesCount: Number(user.confirmedPlacesCount),
		}));
	}

	public async getTopUsersByAchievements({
		limit,
		skip = 0,
	}: {
		limit: number;
		skip: number;
	}): Promise<{ user: UserEntity; achievementsCount: number }[]> {
		const users = await this.model
			.query()
			.joinRelated("achievements")
			.select("users.*")
			.count("achievements.id as achievementsCount")
			.groupBy("users.id")
			.orderBy("achievementsCount", "desc")
			.offset(skip)
			.limit(limit);

		if (users.length === 0) {
			return [];
		}

		return users.map((user) => ({
			user: UserEntity.initialize({
				id: user.id,
				email: user.email,
				username: user.username,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
				mainAchievementId: user.mainAchievementId,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}),
			achievementsCount: Number(user.achievementsCount),
		}));
	}
}

export { UserRepository };
