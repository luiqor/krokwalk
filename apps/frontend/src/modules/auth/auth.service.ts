import { AuthApiPath, UserDto } from "shared";

import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

class AuthService extends BaseService {
	constructor() {
		super({
			basePath: APIPath.AUTH,
			http,
		});
	}

	async signIn(
		email: string,
		password: string
	): Promise<{ token: string; user: UserDto }> {
		return this.http.load(this.getUrl(AuthApiPath.SIGN_IN), {
			method: "POST",
			payload: JSON.stringify({ email, password }),
		});
	}

	async signUp({
		email,
		username,
		password,
	}: {
		email: string;
		username: string;
		password: string;
	}): Promise<{ token: string; user: UserDto }> {
		return this.http.load(this.getUrl(AuthApiPath.SIGN_UP), {
			method: "POST",
			payload: JSON.stringify({ email, username, password }),
		});
	}

	async getUser(): Promise<UserDto> {
		return this.http.load(this.getUrl(AuthApiPath.ROOT), {
			method: "GET",
			hasAuth: true,
		});
	}
}

export { AuthService };
