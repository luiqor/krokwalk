import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private createdAt: string;

	private email: string;

	private username: string;

	private id: null | string;

	private passwordHash: string;

	private passwordSalt: string;

	private updatedAt: string;

	private constructor({
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
		id: null | string;
		username: string;
		passwordHash: string;
		passwordSalt: string;
		updatedAt: string;
	}) {
		this.createdAt = createdAt;
		this.id = id;
		this.email = email;
		this.username = username;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.updatedAt = updatedAt;
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
}

export { UserEntity };
