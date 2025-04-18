import type { Repository } from "~/libs/types/types";

import { UserModel } from "./user.model";
import { UserEntity } from "./user.entity";

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
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public async getById(id: string): Promise<null | UserEntity> {
		const user = await this.model.query().findById(id);

		return user
			? UserEntity.initialize({
					id: user.id,
					email: user.email,
					username: user.username,
					passwordHash: user.passwordHash,
					passwordSalt: user.passwordSalt,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				})
			: null;
	}

	public getAll(): Promise<null[]> {
		return Promise.resolve([null]);
	}
}

export { UserRepository };
