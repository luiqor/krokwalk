import { v4 as uuidv4 } from "uuid";

import { type Entity } from "~/libs/types/types";

type TagEntityParameters = {
  id: null | string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

class TagEntity implements Entity {
  private id: null | string;

  private title: string;

  private createdAt: string;

  private updatedAt: string;

  private constructor({
    id,
    title,
    createdAt,
    updatedAt,
  }: TagEntityParameters) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initializeNew({ title }: { title: string }): TagEntity {
    return new TagEntity({
      id: uuidv4(),
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  public toObject(): {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { TagEntity };
