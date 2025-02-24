import { config } from "../config/config";
import { GeoApifyErrorMessage } from "./libs/enums/enums";
import { HTTPCode, HTTPError } from "~/libs/http/http";

import type { TimeMatrixResponse } from "./libs/types/types";

class GeoApify {
  private baseURL: string;
  private apiKey: string;

  public constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  getTimeMatrix = async (
    coordinates: number[][]
  ): Promise<TimeMatrixResponse> => {
    const queryParams = new URLSearchParams({
      apiKey: this.apiKey,
    }).toString();

    const coordinatesBody = coordinates.map((coordinate) => ({
      location: coordinate,
    }));

    const response = await fetch(`${this.baseURL}?${queryParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "walk",
        sources: coordinatesBody,
        targets: coordinatesBody,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();

      throw new HTTPError({
        status: HTTPCode.INTERNAL_SERVER_ERROR,
        message: GeoApifyErrorMessage.INVALID_COORDINATE_FORMAT,
        cause: errorBody,
      });
    }

    return await response.json();
  };
}

const geoApify = new GeoApify(config.GEO_APIFY.URL, config.GEO_APIFY.API_KEY);

export { GeoApify, geoApify };
