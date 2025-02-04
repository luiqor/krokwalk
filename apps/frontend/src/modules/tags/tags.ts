import { loadTags } from "./actions.js";
import { TagService } from "./tag.service.js";
import { actions, reducer } from "./tag.slice.js";

const allActions = {
  ...actions,
  loadTags,
};

const tagService = new TagService();

export { allActions as actions, reducer };
export { tagService };
