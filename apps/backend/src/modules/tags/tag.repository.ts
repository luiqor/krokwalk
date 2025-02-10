import { TagEntity } from "./tag.entity";
import { TagModel } from "./tag.model";

class TagRepository {
  private tagModel: typeof TagModel;

  public constructor(tagModel: typeof TagModel) {
    this.tagModel = tagModel;
  }

  public async getAll() {
    const tags = await this.tagModel.query();

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
