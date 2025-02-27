import { TagController } from "./tag.controller";
import { TagModel } from "./tag.model";
import { TagRepository } from "./tag.repository";
import { TagService } from "./tag.service";

const tagRepository = new TagRepository(TagModel);
const tagService = new TagService(tagRepository);
const tagController = new TagController(tagService);

const tagRouter = tagController.router;

export { tagRouter, tagService, type TagService };
export { type TagEntity } from "./tag.entity";
