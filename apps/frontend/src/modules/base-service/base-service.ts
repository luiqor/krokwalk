import { ContentType, type HTTPService } from "../http/http.js";
import { ENV } from "~/modules/env/env.js";

type Identifiable = {
	id: string;
};

type Constructor = {
	baseUrl?: string;
	basePath: string;
	http: HTTPService;
};

type Multiple<T> = {
	items: T[];
};

class BaseService<T = unknown, N = unknown> {
	protected static token: string | null = null;

	protected baseUrl: string = ENV.API;

	protected basePath: string;

	protected http: HTTPService;

	constructor({ basePath, http }: Constructor) {
		this.basePath = basePath;
		this.http = http;
	}

	public getOne(): Promise<T> {
		return this.http.load(this.getUrl(), {
			method: "GET",
			hasAuth: true,
		});
	}

	public getAll<P extends Record<string, (string | number | boolean)[]>>(
		params?: P
	): Promise<Multiple<T>> {
		const queryString = params ? this.getQueryString(params) : "";
		return this.http.load(this.getUrl(queryString), {
			method: "GET",
			hasAuth: true,
		});
	}

	public getById(id: string): Promise<T> {
		return this.http.load(this.getUrl(`/${id}`), {
			method: "GET",
			hasAuth: true,
		});
	}

	public create(travel: N): Promise<T> {
		return this.http.load(this.getUrl(), {
			method: "POST",
			contentType: ContentType.JSON,
			payload: JSON.stringify(travel),
			hasAuth: true,
		});
	}

	public update(travel: Partial<T> & Identifiable): Promise<T> {
		return this.http.load(this.getUrl(`/${travel.id}`), {
			method: "PATCH",
			contentType: ContentType.JSON,
			payload: JSON.stringify(travel),
			hasAuth: true,
		});
	}

	public deleteById(id: string): Promise<boolean> {
		return this.http.load(this.getUrl(`/${id}`), {
			method: "DELETE",
			contentType: ContentType.TEXT,
			hasAuth: true,
		});
	}

	protected getUrl(path = ""): string {
		return `${this.baseUrl}${this.basePath}${path}`;
	}

	protected getQueryString(
		params: Record<
			string,
			(string | number | boolean)[] | string | number | boolean
		>
	): string {
		const queryParams = new URLSearchParams();

		for (const [key, values] of Object.entries(params)) {
			if (Array.isArray(values)) {
				values.forEach((value) => {
					queryParams.append(key, value.toString());
				});
			} else {
				queryParams.append(key, values.toString());
			}
		}

		return `?${queryParams.toString()}`;
	}
}

export { BaseService };
