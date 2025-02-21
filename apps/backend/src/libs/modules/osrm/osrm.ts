import { config } from "../config/config";
import { OsrmErrorMessage } from "./libs/enums/enums";
import { HTTPCode, HTTPError } from "~/libs/http/http";

import type { TimeMatrixResponse } from "./libs/types/types";

class Osrm {
  private baseURL: string;

  public constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getTimeMatrix = async (
    coordinates: string[]
  ): Promise<TimeMatrixResponse> => {
    const link = `${this.baseURL}table/v1/foot/${coordinates.join(
      ";"
    )}?annotations=duration`;

    console.log(link);
    const response = await fetch(link);

    if (!response.ok) {
      const errorBody = await response.json();
      console.log(errorBody);

      throw new HTTPError({
        status: HTTPCode.INTERNAL_SERVER_ERROR,
        message: OsrmErrorMessage.INVALID_COORDINATE_FORMAT,
        cause: errorBody,
      });
    }

    return await response.json();
  };
}

const osrm = new Osrm(config.OSRM.URL);

export { Osrm, osrm };
