import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

import { TripsApiPath } from "./libs/enums/enums.js";
import type {
	CreateTripBodyDto,
	CreateTripResDto,
	GetWalkTimeDto,
	CompleteTripResponseDto,
	CompleteTripRequestDto,
} from "./libs/types/types.js";

class TripService extends BaseService<CreateTripResDto> {
	constructor() {
		super({
			basePath: APIPath.TRIPS,
			http,
		});
	}

	async getMinimumWalkTime(
		params: Record<string, string[] | string>
	): Promise<GetWalkTimeDto> {
		const queryString = params ? this.getQueryString(params) : "";
		return this.http.load(
			this.getUrl(`${TripsApiPath.WALK_TIME}${queryString}`),
			{
				method: "GET",
			}
		);
	}

	async create(params: CreateTripBodyDto): Promise<CreateTripResDto> {
		return this.http.load(this.getUrl(TripsApiPath.ROOT), {
			method: "POST",
			payload: JSON.stringify(params),
			hasAuth: true,
		});
	}

	async complete(
		payload: CompleteTripRequestDto
	): Promise<CompleteTripResponseDto> {
		return this.http.load(this.getUrl(TripsApiPath.COMPLETE), {
			method: "POST",
			payload: JSON.stringify(payload),
			hasAuth: true,
		});
	}
}

export { TripService };
