import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { TagDto } from "./libs/types/types.js";
import { name as sliceName } from "./tag.slice.js";

const loadTags = createAsyncThunk<TagDto[], void, AsyncThunkConfig>(
  `${sliceName}/load-tags`,
  async (_, { extra }) => {
    const { tagService } = extra;

    const { items } = await tagService.getAll();

    return items;
  }
);

export { loadTags };
