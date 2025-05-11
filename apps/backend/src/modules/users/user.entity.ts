import type { Entity } from "~/libs/types/types";

import type { AchievementDto } from "./libs/types/types";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private username: string;

	private id: null | string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private mainAchievementId: string | null;

	private achievements: AchievementDto[];

	private constructor({
		createdAt,
		email,
		id,
		username,
		passwordHash,
		passwordSalt,
		updatedAt,
		mainAchievementId,
		achievements,
	}: {
		createdAt: string;
		email: string;
		id: null | string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		mainAchievementId: string | null;
		achievements: AchievementDto[];
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.username = username;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
		this.mainAchievementId = mainAchievementId;
		this.achievements = achievements;
	}

	public static initialize({
		createdAt,
		email,
		id,
		username,
		passwordHash,
		passwordSalt,
		mainAchievementId,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		mainAchievementId: string | null;
		updatedAt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			id,
			username,
			passwordHash,
			passwordSalt,
			updatedAt,
			mainAchievementId: mainAchievementId,
			achievements: [],
		});
	}

	public static initializeDetailed({
		createdAt,
		email,
		id,
		username,
		passwordHash,
		passwordSalt,
		updatedAt,
		mainAchievementId,
		achievements,
	}: {
		createdAt: string;
		email: string;
		id: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		mainAchievementId: string | null;
		achievements: AchievementDto[];
	}): UserEntity {
		return new UserEntity({
			createdAt,
			email,
			id,
			username,
			passwordHash,
			passwordSalt,
			updatedAt,
			mainAchievementId,
			achievements,
		});
	}

	public static initializeNew({
		email,
		username,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			createdAt: "",
			email,
			id: null,
			username,
			passwordHash,
			passwordSalt,
			updatedAt: "",
			mainAchievementId: null,
			achievements: [],
		});
	}

	public toNewObject(): {
		createdAt: string;
		email: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			username: this.username,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			updatedAt: this.updatedAt,
		};
	}

	public toObject(): {
		createdAt: string;
		email: string;
		username: string;
		id: string;
		mainAchievementId: string | null;
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			username: this.username,
			id: this.id as string,
			mainAchievementId: this.mainAchievementId,
			updatedAt: this.updatedAt,
		};
	}

	public toDetailedObject(): {
		createdAt: string;
		email: string;
		username: string;
		id: string;
		updatedAt: string;
		mainAchievementId: string | null;
		achievements: AchievementDto[];
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			username: this.username,
			id: this.id as string,
			updatedAt: this.updatedAt,
			mainAchievementId: this.mainAchievementId,
			achievements: this.achievements,
		};
	}
}

export { UserEntity };
