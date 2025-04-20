type UserPlace = {
	id: string;
	userId: string;
	placeId: string;
	visitedAt: string | null;
	visitStatus: string;
	createdAt: string;
	updatedAt: string;
};

type UserPlacesGetAllResponseDto = {
	userId: string;
	items: Omit<UserPlace, "userId">[];
};

export type { UserPlace, UserPlacesGetAllResponseDto };
