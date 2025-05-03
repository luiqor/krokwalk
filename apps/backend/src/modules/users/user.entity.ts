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

	private achievements: AchievementDto[];

	private constructor({
		createdAt,
		email,
		id,
		username,
		passwordHash,
		passwordSalt,
		updatedAt,
		achievements,
	}: {
		createdAt: string;
		email: string;
		id: null | string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
		achievements: AchievementDto[];
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.username = username;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
		this.achievements = achievements;
	}

	public static initialize({
		createdAt,
		email,
		id,
		username,
		passwordHash,
		passwordSalt,
		updatedAt,
	}: {
		createdAt: string;
		email: string;
		id: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
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
		achievements,
	}: {
		createdAt: string;
		email: string;
		id: string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
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
		updatedAt: string;
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			username: this.username,
			id: this.id as string,
			updatedAt: this.updatedAt,
		};
	}

	public toDetailedObject(): {
		createdAt: string;
		email: string;
		username: string;
		id: string;
		updatedAt: string;
		achievements: AchievementDto[];
	} {
		return {
			createdAt: this.createdAt,
			email: this.email,
			username: this.username,
			id: this.id as string,
			updatedAt: this.updatedAt,
			achievements: this.achievements,
		};
	}
}

export { UserEntity };
