import { APIPath } from "~/libs/enums/enums.js";
import { http } from "../http/http.js";
import { BaseService } from "../base-service/base-service.js";

import { TagDto } from "./libs/types/types.js";

class TagService extends BaseService<TagDto, unknown> {
  constructor() {
    super({
      basePath: APIPath.TAGS,
      http,
    });
  }
}

export { TagService };
