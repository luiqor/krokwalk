import { TagRepository } from "./tag.repository";
import { type TagsGetAllResponseDto } from "./libs/types/types";

class TagService {
  private tagRepository: TagRepository;

  public constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  public async getAll(): Promise<TagsGetAllResponseDto> {
    const tagEntities = await this.tagRepository.getAll();

    return { items: tagEntities.map((entity) => entity.toObject()) };
  }
}

export { TagService };
