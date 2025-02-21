import type { Repository } from "~/libs/types/types";

import { TagEntity } from "./tag.entity";
import { TagModel } from "./tag.model";

class TagRepository implements Repository {
  private model: typeof TagModel;

  public constructor(model: typeof TagModel) {
    this.model = model;
  }

  public async getAll() {
    const tags = await this.model.query();

    return await Promise.all(
      tags.map(async (tag) =>
        TagEntity.initialize({
          id: tag.id,
          title: tag.title,
          slug: tag.slug,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
        })
      )
    );
  }
}

export { TagRepository };
