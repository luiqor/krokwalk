import {
	GetLeadersRequestDto,
	type GetLeadersResponseDto,
	type GetUserProfileResponseDto,
	type UserDto,
	type UserPatchConfirmVisitResponseDto,
	type UserPatchVisitStatusResponseDto,
	UsersApiPath,
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

	async getById(id: string): Promise<GetUserProfileResponseDto> {
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

	async editMainAchievement(achievementId: string): Promise<UserDto> {
		return await this.http.load(this.getUrl(`/achievements/${achievementId}`), {
			method: "PATCH",
			hasAuth: true,
		});
	}

	async getTopUsersByConfirmedPlaces(
		params: GetLeadersRequestDto
	): Promise<GetLeadersResponseDto> {
		const queryString = params ? this.getQueryString(params) : "";
		return await this.http.load(
			this.getUrl(`${UsersApiPath.LEADERBOARD_CONFIRMED_PLACES}${queryString}`),
			{
				method: "GET",
				hasAuth: true,
			}
		);
	}

	async getTopUsersByVisitedPlaces(params: {
		limit: number;
		page?: number;
	}): Promise<GetLeadersResponseDto> {
		const queryString = params ? this.getQueryString(params) : "";
		return await this.http.load(
			this.getUrl(`${UsersApiPath.LEADERBOARD_ACHIEVEMENTS}${queryString}`),
			{
				method: "GET",
				hasAuth: true,
			}
		);
	}
}

export { UserService };
