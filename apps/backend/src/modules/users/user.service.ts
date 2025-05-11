import {
	type GetLeadersRequestDto,
	type GetLeadersResponseDto,
	HTTPCode,
	HTTPError,
	HTTPErrorMessage,
} from "shared";
import type { Encrypt } from "~/libs/modules/encrypt/encrypt";
import type { Service } from "~/libs/types/types";

import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import type {
	GetUserProfileResponseDto,
	UserDto,
	UserSignUpRequestDto,
} from "./libs/types/types.js";
import { type AchievementService } from "../achievements/achievements";

class UserService implements Service {
	private encrypt: Encrypt;
	private repository: UserRepository;
	private achievementService: AchievementService;

	public constructor({
		repository,
		achievementService,
		encrypt,
	}: {
		repository: UserRepository;
		achievementService: AchievementService;
		encrypt: Encrypt;
	}) {
		this.repository = repository;
		this.achievementService = achievementService;
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
	}: {
		id: string;
	}): Promise<GetUserProfileResponseDto> {
		const entity = await this.repository.getById(id);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toDetailedObject();
	}

	public getAll(): Promise<{
		items: null[];
	}> {
		return Promise.resolve({ items: [null] });
	}

	public async addAchievement({
		id,
		achievementId,
	}: {
		id: string;
		achievementId: string;
	}): Promise<ReturnType<UserEntity["toDetailedObject"]>> {
		const achievement = await this.achievementService.getById(achievementId);

		if (achievement === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.ACHIEVEMENTS.NOT_FOUND,
			});
		}

		const entity = await this.repository.addAchievement(id, achievementId);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toDetailedObject();
	}

	public async getAchievementById({
		id,
		achievementId,
	}: {
		id: string;
		achievementId: string;
	}): Promise<ReturnType<UserEntity["toDetailedObject"]>> {
		const entity = await this.repository.getAchievementById(id, achievementId);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toDetailedObject();
	}

	public async getAchievementsByIds({
		id,
		achievementIds,
	}: {
		id: string;
		achievementIds: string[];
	}): Promise<ReturnType<UserEntity["toDetailedObject"]>> {
		const entity = await this.repository.getAchievementsByIds(
			id,
			achievementIds
		);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toDetailedObject();
	}

	public async editUserMainAchievement({
		id,
		achievementId,
	}: {
		id: string;
		achievementId: string;
	}): Promise<ReturnType<UserEntity["toObject"]>> {
		const { achievements: userAchievements } = await this.getAchievementById({
			id,
			achievementId,
		});

		if (userAchievements.length === 0) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER_ACHIEVEMENTS.NOT_FOUND,
			});
		}

		const entity = await this.repository.editUserMainAchievement(
			id,
			achievementId
		);

		if (entity === null) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NOT_FOUND,
			});
		}

		return entity.toObject();
	}

	public async getTopUsersByConfirmedPlaces({
		monthsCount,
		limit,
		page,
	}: GetLeadersRequestDto): Promise<GetLeadersResponseDto> {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setMonth(endDate.getMonth() - monthsCount);

		const skip = page ? (page - 1) * limit : 0;

		const topUsers = await this.repository.getTopUsersByConfirmedPlaces({
			startDate,
			endDate,
			limit,
			skip,
		});

		if (topUsers.length === 0) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.USER.NO_USERS_FOUND,
			});
		}

		return {
			items: topUsers.map(({ user, confirmedPlacesCount }) => ({
				...user.toObject(),
				confirmedPlacesCount,
			})),
		};
	}
}

export { UserService };
