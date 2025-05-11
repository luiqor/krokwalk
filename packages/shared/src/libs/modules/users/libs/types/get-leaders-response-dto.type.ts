import type { UserDto } from "./user-dto.type";

type LeaderUser = UserDto & {
	confirmedPlacesCount: number;
};

type GetLeadersResponseDto = {
	items: LeaderUser[];
};

export type { GetLeadersResponseDto };
