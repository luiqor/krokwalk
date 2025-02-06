import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

import { TourDto } from "./libs/types/types.js";

class TourService extends BaseService<TourDto, unknown> {
  constructor() {
    super({
      basePath: APIPath.TOURS,
      http,
    });
  }
}

export { TourService };
