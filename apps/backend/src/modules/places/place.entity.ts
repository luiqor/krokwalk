import { v4 as uuidv4 } from "uuid";

import { type Entity } from "../../libs/types/types";
import { type TagEntity } from "../tags/tags";
import { type TourEntity } from "../tours/tours";

import { type PlacesEntityParameters } from "./libs/types/types";

class PlaceEntity implements Entity {
  private id: null | string;

  private title: string;

  private description: string;

  private address: string;

  private thumbnailLink: string;

  private lat: number;

  private lng: number;

  private elevation: null | number;

  private createdAt: string;

  private updatedAt: string;

  private tags: TagEntity[];

  private tours: TourEntity[];

  private constructor({
    id,
    title,
    description,
    address,
    thumbnailLink,
    lat,
    lng,
    elevation,
    createdAt,
    updatedAt,
    tags,
    tours,
  }: PlacesEntityParameters) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.address = address;
    this.thumbnailLink = thumbnailLink;
    this.lat = lat;
    this.lng = lng;
    this.elevation = elevation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tags = tags;
    this.tours = tours;
  }

  public static initializeNew({
    title,
    description,
    address,
    thumbnailLink,
    lat,
    lng,
    elevation,
  }: {
    title: string;
    description: string;
    address: string;
    thumbnailLink: string;
    lat: number;
    lng: number;
    elevation?: number;
  }): PlaceEntity {
    return new PlaceEntity({
      id: uuidv4(),
      title,
      description,
      address,
      thumbnailLink,
      lat,
      lng,
      elevation: elevation ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      tours: [],
    });
  }

  public static initialize({
    id,
    title,
    description,
    address,
    thumbnailLink,
    lat,
    lng,
    elevation,
    createdAt,
    updatedAt,
    tags,
    tours,
  }: PlacesEntityParameters): PlaceEntity {
    return new PlaceEntity({
      id,
      title,
      description,
      address,
      thumbnailLink,
      lat,
      lng,
      elevation,
      createdAt,
      updatedAt,
      tags,
      tours,
    });
  }

  public toObject(): {
    id: string;
    title: string;
    description: string;
    address: string;
    thumbnailLink: string;
    lat: number;
    lng: number;
    elevation: number | null;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as string,
      title: this.title,
      description: this.description,
      address: this.address,
      thumbnailLink: this.thumbnailLink,
      lat: this.lat,
      lng: this.lng,
      elevation: this.elevation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toDetailedObject(): {
    id: string;
    title: string;
    description: string;
    address: string;
    thumbnailLink: string;
    lat: number;
    lng: number;
    elevation: number | null;
    createdAt: string;
    updatedAt: string;
    tags: ReturnType<TagEntity["toObject"]>[];
    tours: ReturnType<TourEntity["toObject"]>[];
  } {
    return {
      id: this.id as string,
      title: this.title,
      description: this.description,
      address: this.address,
      thumbnailLink: this.thumbnailLink,
      lat: this.lat,
      lng: this.lng,
      elevation: this.elevation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags.map((tag) => tag.toObject()),
      tours: this.tours.map((tour) => tour.toObject()),
    };
  }
}

export { PlaceEntity };
