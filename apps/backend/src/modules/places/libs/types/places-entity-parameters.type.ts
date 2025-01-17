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
};

export { type PlacesEntityParameters };
