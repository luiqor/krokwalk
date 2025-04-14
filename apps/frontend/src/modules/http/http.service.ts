import type { ValueOf } from "shared";

import { ContentType, HttpHeaders, HTTPCode } from "./libs/enums/enums.js";
import { HTTPError } from "./libs/exceptions/exceptions.js";
import { storage, StorageKey } from "../storage/storage.js";

type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";

type HTTPOptions = {
	method: HTTPMethod;
	contentType?: ValueOf<typeof ContentType>;
	payload?: BodyInit | null;
	hasAuth: boolean;
};

class HTTPService {
	public async load<T = unknown>(
		url: string,
		options: Partial<HTTPOptions> = {}
	): Promise<T> {
		const {
			method = "GET",
			payload = null,
			contentType = ContentType.JSON,
			hasAuth = false,
		} = options;

		const headers = await this.getHeaders(contentType, hasAuth);

		return fetch(url, {
			method,
			headers,
			body: payload,
		})
			.then(this.checkStatus)
			.then((res) => this.parseJSON<T>(res))
			.catch(this.handleError);
	}

	private async getHeaders(
		contentType: ValueOf<typeof ContentType> | null,
		hasAuth: boolean
	): Promise<Headers | Record<string, string>> {
		const headers: Record<string, string> = {};

		if (contentType) {
			headers[HttpHeaders.CONTENT_TYPE] = contentType;
		}

		if (hasAuth) {
			const token = await storage.get<string>(StorageKey.TOKEN);

			headers[HttpHeaders.AUTHORIZATION] = `Bearer ${token}`;
		}

		return headers;
	}

	private async checkStatus(response: Response): Promise<Response> {
		if (!response.ok) {
			const errorBody = await response.json();
			const errorMessage =
				errorBody.message || errorBody.error || JSON.stringify(errorBody);

			const error = new HTTPError({
				status: response.status as (typeof HTTPCode)[keyof typeof HTTPCode],
				message: errorMessage,
				cause: response.statusText,
			});

			throw error;
		}

		return response;
	}

	private parseJSON<T>(response: Response): Promise<T> {
		return response.json();
	}

	private handleError(error: unknown): never {
		throw error;
	}
}

export { HTTPService };
