type Tags = {
  id: string;
  title: string;
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
  tags: Tags[];
};

export { type PlaceDto };
