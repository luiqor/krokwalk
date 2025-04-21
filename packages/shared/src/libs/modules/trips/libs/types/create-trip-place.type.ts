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
	visitedAt: string | null;
	visitStatus: string | null;
};

export type { CreateTripPlace };
