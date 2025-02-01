import { v4 as uuidv4 } from "uuid";

import { type Entity } from "~/libs/types/types";

type TourEntityParameters = {
  id: null | string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

class TourEntity implements Entity {
  private id: null | string;

  private title: string;

  private description: string;

  private createdAt: string;

  private updatedAt: string;

  private constructor({
    id,
    title,
    description,
    createdAt,
    updatedAt,
  }: TourEntityParameters) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initializeNew({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): TourEntity {
    return new TourEntity({
      id: uuidv4(),
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  public static initialize({
    id,
    title,
    description,
    createdAt,
    updatedAt,
  }: TourEntityParameters): TourEntity {
    return new TourEntity({
      id,
      title,
      description,
      createdAt,
      updatedAt,
    });
  }

  public toObject(): {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { TourEntity };
