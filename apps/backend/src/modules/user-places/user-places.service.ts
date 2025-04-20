import type { Service } from "~/libs/types/types";

import { UserPlacesRepository } from "./user-places.repository";
import type { UserPlacesGetAllResponseDto } from "./libs/types/types";
import { HTTPCode, HTTPError, HTTPErrorMessage } from "shared";

class UserPlacesService implements Service {
	private repository: UserPlacesRepository;

	public constructor(repository: UserPlacesRepository) {
		this.repository = repository;
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
}

export { UserPlacesService };
