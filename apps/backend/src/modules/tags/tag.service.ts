import type { Service } from "~/libs/types/types";

import { TagRepository } from "./tag.repository";
import { type TagsGetAllResponseDto } from "./libs/types/types";

class TagService implements Service {
  private repository: TagRepository;

  public constructor(repository: TagRepository) {
    this.repository = repository;
  }

  public async getAll(): Promise<TagsGetAllResponseDto> {
    const tagEntities = await this.repository.getAll();

    return { items: tagEntities.map((entity) => entity.toObject()) };
  }

  public async getManyBuSlugs(slugs: string[]): Promise<TagsGetAllResponseDto> {
    const tagEntities = await this.repository.getManyBySlugs(slugs);

    return { items: tagEntities.map((entity) => entity.toObject()) };
  }
}

export { TagService };
