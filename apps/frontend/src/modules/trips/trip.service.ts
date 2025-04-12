import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

import { TripsApiPath } from "./libs/enums/enums.js";
import type { CreateTripResDto, GetWalkTimeDto } from "./libs/types/types.js";

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
}

export { TripService };
