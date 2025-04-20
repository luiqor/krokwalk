import { HTTPCode, HTTPError, HTTPErrorMessage } from "shared";
import type { Encrypt } from "~/libs/modules/encrypt/encrypt";
import type { Service } from "~/libs/types/types";

import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import type { UserDto, UserSignUpRequestDto } from "./libs/types/types.js";

class UserService implements Service {
	private repository: UserRepository;
	private encrypt: Encrypt;

	public constructor(repository: UserRepository, encrypt: Encrypt) {
		this.repository = repository;
		this.encrypt = encrypt;
	}

	public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
		const { hash, salt } = await this.encrypt.encrypt(payload.password);

		const user = await this.repository.create(
			UserEntity.initializeNew({
				email: payload.email,
				username: payload.username,
				passwordHash: hash,
				passwordSalt: salt,
			})
		);

		return user.toObject();
	}

	public getByEmail(email: string): Promise<null | UserEntity> {
		return this.repository.getByEmail(email);
	}

	public getById(id: string): Promise<null | UserEntity> {
		return this.repository.getById(id);
	}

	public async getProfile({
		id,
		currentUserId,
	}: {
		id: string;
		currentUserId: string;
	}): Promise<UserDto> {
		if (id !== currentUserId) {
			throw new HTTPError({
				status: HTTPCode.FORBIDDEN,
				message: HTTPErrorMessage.AUTH.FORBIDDEN,
			});
		}

		const entity = await this.repository.getById(id);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toObject();
	}

	public getAll(): Promise<{
		items: null[];
	}> {
		return Promise.resolve({ items: [null] });
	}
}

export { UserService };
