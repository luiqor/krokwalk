import { DataTour } from "~/libs/components/tour-info-item/libs/types/types.js";

type RecvestTour = {
	id: string;
	title: string;
	slug: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	places: DataTour[];
};

export type { RecvestTour };
