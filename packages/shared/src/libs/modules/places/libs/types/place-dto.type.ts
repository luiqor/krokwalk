import { TagDto } from "src/libs/modules/tags/tags";

type Tour = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type PlaceDto = {
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
  tags: TagDto[];
  tours: Tour[];
};

export { type PlaceDto };
