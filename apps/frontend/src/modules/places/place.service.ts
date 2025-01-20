import { BaseService } from "../base-service/base-service.js";
import { http } from "../http/http.js";

import { type PlaceDto } from "./libs/types/types.js";

class PlaceService extends BaseService<PlaceDto, unknown> {
  constructor() {
    super({
      basePath: "/places",
      http,
    });
  }
}

export { PlaceService };
