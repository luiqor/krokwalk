import { TagService } from "./tag.service.js";
import { actions, reducer } from "./tag.slice.js";

const allActions = {
  ...actions,
};

const tagService = new TagService();

export { allActions as actions, reducer };
export { tagService };
