import { UserPlacesEntity } from "~/modules/user-places/user-places.entity";
import {
	HTTPCode,
	HTTPError,
	HTTPErrorMessage,
	UserPatchConfirmVisitResponseDto,
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

	public async getManyByIds(
		userId: string,
		ids: string[]
	): Promise<ReturnType<UserPlacesEntity["toUserObject"]>[]> {
		const entities = await this.repository.getManyByIds(userId, ids);

		return entities.map((entity) => entity.toUserObject());
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

	private getDistanceInMeters(
		lat1: number,
		lng1: number,
		lat2: number,
		lng2: number
	): number {
		const R = 6371e3; // Earth's radius in meters
		const toRad = (value: number) => (value * Math.PI) / 180;

		const φ1 = toRad(lat1);
		const φ2 = toRad(lat2);
		const Δφ = toRad(lat2 - lat1);
		const Δλ = toRad(lng2 - lng1);

		const a =
			Math.sin(Δφ / 2) ** 2 +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	}

	public async confirmPlaceVisit({
		userId,
		placeId,
		lat,
		lng,
	}: UserPatchConfirmVisitResponseDto & {
		userId: string;
	}): Promise<UserPatchVisitStatusResponseDto> {
		const initialEntity = await this.repository.getById(userId, placeId);
		const place = await this.placeService.getById(placeId);
		const { lat: placeLat, lng: placeLng } = place;

		const distance = this.getDistanceInMeters(lat, lng, placeLat, placeLng);
		console.log(`${place.title} - ${placeLat} ${placeLng} : ${distance}m`);
		console.log(`User location: ${lat} ${lng}`);

		const DISTANCE_THRESHOLD_METERS = 115;

		if (distance > DISTANCE_THRESHOLD_METERS) {
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
