import { BaseService } from "../base-service/base-service.js";
import { http } from "../http/http.js";

import { actions, reducer } from "./slice.js";

const allActions = {
  ...actions,
};

const placesService = new BaseService<unknown, unknown>({
  basePath: "/places",
  http,
});

export { allActions as actions, reducer };
export { placesService };
