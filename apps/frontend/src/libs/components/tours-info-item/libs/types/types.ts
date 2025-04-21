type DataTour = {
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
};

type ToursArr = { data: DataTour[] };

export type { ToursArr, DataTour };
