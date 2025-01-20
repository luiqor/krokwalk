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

class BaseService<T, N> {
  private static token: string | null = null;

  private baseUrl: string = ENV.API;

  private basePath: string;

  private http: HTTPService;

  constructor({ basePath, http }: Constructor) {
    this.basePath = basePath;
    this.http = http;
  }

  public static updateToken(newToken: string | null): void {
    BaseService.token = newToken;
  }

  public static getToken(): string | null {
    return BaseService.token;
  }

  public getOne(): Promise<T> {
    return this.http.load(this.getUrl(), {
      method: "GET",
      token: BaseService.token,
    });
  }

  public getAll(): Promise<Multiple<T>> {
    return this.http.load(this.getUrl(), {
      method: "GET",
      token: BaseService.token,
    });
  }

  public getById(id: string): Promise<T> {
    return this.http.load(this.getUrl(`/${id}`), {
      method: "GET",
      token: BaseService.token,
    });
  }

  public create(travel: N): Promise<T> {
    return this.http.load(this.getUrl(), {
      method: "POST",
      contentType: ContentType.JSON,
      payload: JSON.stringify(travel),
      token: BaseService.token,
    });
  }

  public update(travel: Partial<T> & Identifiable): Promise<T> {
    return this.http.load(this.getUrl(`/${travel.id}`), {
      method: "PATCH",
      contentType: ContentType.JSON,
      payload: JSON.stringify(travel),
      token: BaseService.token,
    });
  }

  public deleteById(id: string): Promise<boolean> {
    return this.http.load(this.getUrl(`/${id}`), {
      method: "DELETE",
      contentType: ContentType.TEXT,
      token: BaseService.token,
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { BaseService };
