type CreateTripPlace = {
	id: string;
	title: string;
	lat: number;
	lng: number;
	priority: number;
	index: number;
	tags: string[];
	tours: string[];
	thumbnailLink: string;
};

export type { CreateTripPlace };
