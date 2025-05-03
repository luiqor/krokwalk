import {
	type UserDto,
	UserPatchConfirmVisitResponseDto,
	type UserPatchVisitStatusResponseDto,
	type ValueOf,
	VisitStatus,
} from "shared";

import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

class UserService extends BaseService {
	constructor() {
		super({
			basePath: APIPath.USERS,
			http,
		});
	}

	async getById(id: string): Promise<UserDto> {
		return await this.http.load(this.getUrl(`/${id}`), {
			method: "GET",
		});
	}

	async updatePlaceVisitStatus(
		placeId: string,
		visitStatus: ValueOf<typeof VisitStatus>
	): Promise<UserPatchVisitStatusResponseDto> {
		return await this.http.load(
			this.getUrl(`/places/${placeId}/visit-status`),
			{
				method: "PATCH",
				payload: JSON.stringify({ visitStatus }),
				hasAuth: true,
			}
		);
	}

	async confirmPlaceVisit({
		placeId,
		lat,
		lng,
	}: UserPatchConfirmVisitResponseDto): Promise<UserPatchVisitStatusResponseDto> {
		return await this.http.load(this.getUrl(`/places/${placeId}/confirm`), {
			method: "PATCH",
			payload: JSON.stringify({ lat, lng }),
			hasAuth: true,
		});
	}
}

export { UserService };
