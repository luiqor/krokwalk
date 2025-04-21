import { UserDto } from "shared";
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
		return this.http.load(this.getUrl(`/${id}`), {
			method: "GET",
		});
	}
}

export { UserService };
