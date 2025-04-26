import { UserPlacesEntity } from "~/modules/user-places/user-places.entity";
import {
	HTTPCode,
	HTTPError,
	HTTPErrorMessage,
	UserPatchVisitStatusRequestDto,
	UserPatchVisitStatusResponseDto,
	VisitStatus,
} from "shared";

import type { Service } from "~/libs/types/types";
import { PlaceService } from "../places/place.service";

import { UserPlacesRepository } from "./user-places.repository";
import type { UserPlacesGetAllResponseDto } from "./libs/types/types";

class UserPlacesService implements Service {
	private repository: UserPlacesRepository;

	private placeService: PlaceService;

	public constructor(
		repository: UserPlacesRepository,
		placeService: PlaceService
	) {
		this.repository = repository;
		this.placeService = placeService;
	}

	public async getAll({
		userId,
		currentUserId,
	}: {
		userId: string;
		currentUserId: string;
	}): Promise<UserPlacesGetAllResponseDto> {
		if (userId !== currentUserId) {
			throw new HTTPError({
				status: HTTPCode.FORBIDDEN,
				message: HTTPErrorMessage.AUTH.FORBIDDEN,
			});
		}

		const entities = await this.repository.getAll(userId);

		return {
			items: entities.map((entity) => entity.toUserObject()),
			userId,
		};
	}

	public async updateVisitStatus({
		userId,
		placeId,
		visitStatus,
	}: UserPatchVisitStatusRequestDto & {
		userId: string;
	}): Promise<UserPatchVisitStatusResponseDto> {
		let updatedVisitStatus = visitStatus;

		const initialEntity = await this.repository.getById(userId, placeId);

		if (initialEntity === null) {
			const place = await this.placeService.getById(placeId);

			const newUserPlace = UserPlacesEntity.initializeNew({
				visitStatus,
				userId,
				placeId: place.id,
			});

			const entity = await this.repository.create(newUserPlace);

			return entity.toObject();
		}

		const { visitedAt: initialVisitedAt, userId: initialUserId } =
			initialEntity.toObject();

		if (initialUserId !== userId) {
			throw new HTTPError({
				status: HTTPCode.FORBIDDEN,
				message: HTTPErrorMessage.AUTH.FORBIDDEN,
			});
		}

		if (visitStatus === VisitStatus.MARKED && initialVisitedAt !== null) {
			updatedVisitStatus = VisitStatus.CONFIRMED;
		}

		const entity = await this.repository.updateStatus(
			userId,
			placeId,
			updatedVisitStatus
		);

		return entity.toObject();
	}

	public async confirmPlaceVisit({
		userId,
		placeId,
		lat,
		lng,
	}: {
		userId: string;
		placeId: string;
		lat: number;
		lng: number;
	}): Promise<UserPatchVisitStatusResponseDto> {
		const initialEntity = await this.repository.getById(userId, placeId);

		const place = await this.placeService.getById(placeId);

		const { lat: placeLat, lng: placeLng } = place;

		const distance = Math.sqrt(
			Math.pow(placeLat - lat, 2) + Math.pow(placeLng - lng, 2)
		);
		const DISTANCE_THRESHOLD = 0.01; // 0.01 degrees is approximately 1 km

		if (distance > DISTANCE_THRESHOLD) {
			throw new HTTPError({
				status: HTTPCode.BAD_REQUEST,
				message: HTTPErrorMessage.PLACE.TOO_FAR,
			});
		}

		if (initialEntity === null) {
			const newUserPlace = UserPlacesEntity.initializeNew({
				visitStatus: VisitStatus.CONFIRMED,
				userId,
				placeId: place.id,
				visitedAt: new Date().toISOString(),
			});

			const entity = await this.repository.create(newUserPlace);

			return entity.toObject();
		}

		const { userId: initialUserId } = initialEntity.toObject();

		if (initialUserId !== userId) {
			throw new HTTPError({
				status: HTTPCode.FORBIDDEN,
				message: HTTPErrorMessage.AUTH.FORBIDDEN,
			});
		}

		const updatedEntity = await this.repository.updateStatus(
			userId,
			placeId,
			VisitStatus.CONFIRMED
		);

		return updatedEntity.toObject();
	}
}

export { UserPlacesService };
