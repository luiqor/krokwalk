import { APIPath } from "~/libs/enums/enums.js";
import { BaseService } from "../base-service/base-service.js";
import { http } from "../http/http.js";

import { type PlaceDto } from "./libs/types/types.js";

class PlaceService extends BaseService<PlaceDto, unknown> {
  constructor() {
    super({
      basePath: APIPath.PLACES,
      http,
    });
  }
}

export { PlaceService };
