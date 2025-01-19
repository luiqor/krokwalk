import { ContentType, HttpHeaders } from "./libs/enums/enums.js";
import { HTTPError } from "./libs/exceptions/exceptions.js";

type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ValueOf<T> = T[keyof T];

type HTTPOptions = {
  method: HTTPMethod;
  contentType?: ValueOf<typeof ContentType>;
  payload?: BodyInit | null;
  token: string | null;
};

class HTTPService {
  public async load<T = unknown>(
    url: string,
    options: Partial<HTTPOptions> = {}
  ): Promise<T> {
    const {
      method = "GET",
      payload = null,
      contentType = null,
      token = null,
    } = options;

    const headers = this.getHeaders(contentType, token);

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.handleError);
  }

  private getHeaders(
    contentType: ValueOf<typeof ContentType> | null,
    token: string | null
  ): Headers | Record<string, string> {
    const headers: Record<string, string> = {};

    if (contentType) {
      headers[HttpHeaders.CONTENT_TYPE] = contentType;
    }

    if (token) {
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
        status: response.status,
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
