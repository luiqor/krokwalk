import { v4 as uuidv4 } from "uuid";

import { type Entity } from "~/libs/types/types";

type TagEntityParameters = {
  id: null | string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

class TagEntity implements Entity {
  private id: null | string;

  private title: string;

  private slug: string;

  private createdAt: string;

  private updatedAt: string;

  private constructor({
    id,
    title,
    slug,
    createdAt,
    updatedAt,
  }: TagEntityParameters) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initializeNew({ title }: { title: string }): TagEntity {
    return new TagEntity({
      id: uuidv4(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  public static initialize({
    id,
    title,
    slug,
    createdAt,
    updatedAt,
  }: TagEntityParameters): TagEntity {
    return new TagEntity({
      id,
      title,
      slug,
      createdAt,
      updatedAt,
    });
  }

  public toObject(): {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      title: this.title,
      slug: this.slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { TagEntity };
