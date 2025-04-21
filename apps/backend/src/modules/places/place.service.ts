import type { Service } from "~/libs/types/types";
import { ensureArray } from "~/libs/helpers/helpers";
import { HTTPError, HTTPCode, HTTPErrorMessage } from "~/libs/http/http";

import { PlaceRepository } from "./place.repository";
import type {
	PlacesGetAllQueryParams,
	PlacesGetAllResponseDto,
	GetPlaceByIdDto,
} from "./libs/types/types";
import { PlaceEntity } from "./place.entity";

class PlaceService implements Service {
	private repository: PlaceRepository;

	public constructor(repository: PlaceRepository) {
		this.repository = repository;
	}

	public async getAll({
		tags,
		tours,
	}: PlacesGetAllQueryParams): Promise<PlacesGetAllResponseDto> {
		const placeEntities = await this.repository.getAll({
			tags: ensureArray(tags),
			tours: ensureArray(tours),
		});

		return { items: placeEntities.map((entity) => entity.toObject()) };
	}

	public async getById(id: string): Promise<GetPlaceByIdDto | null> {
		const placeEntity = await this.repository.getById(id);

		if (!placeEntity) {
			throw new HTTPError({
				status: HTTPCode.NOT_FOUND,
				message: HTTPErrorMessage.NOT_FOUND,
			});
		}

		return placeEntity.toDetailedObject();
	}

	public async getManyByCoordinates(
		coordinates: [number, number][],
		userId: string | null = null
	): Promise<ReturnType<PlaceEntity["toUserDetailedObject"]>[]> {
		const placeEntities = await this.repository.getManyByCoordinates(
			coordinates,
			userId
		);

		return placeEntities.map((entity) => entity.toUserDetailedObject());
	}
}

export { PlaceService };
