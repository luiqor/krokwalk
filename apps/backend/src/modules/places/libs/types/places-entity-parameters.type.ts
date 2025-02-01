import { type TagEntity } from "~/modules/tags/tags";
import { TourEntity } from "~/modules/tours/tours";

type PlacesEntityParameters = {
  id: string | null;
  title: string;
  description: string;
  address: string;
  thumbnailLink: string;
  lat: number;
  lng: number;
  elevation: number | null;
  createdAt: string;
  updatedAt: string;
  tags: TagEntity[];
  tours: TourEntity[];
};

export { type PlacesEntityParameters };
