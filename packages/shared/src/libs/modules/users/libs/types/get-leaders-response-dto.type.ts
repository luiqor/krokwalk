import type { UserDto } from "./user-dto.type";

type LeaderUser = UserDto & {
	leaderItemsCount: number;
};

type GetLeadersResponseDto = {
	items: LeaderUser[];
};

export type { GetLeadersResponseDto };
