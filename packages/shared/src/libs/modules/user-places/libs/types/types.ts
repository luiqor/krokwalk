import { ValueOf } from "src/libs/types/types";
import { VisitStatus } from "../enums/enums";

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

type UserPatchVisitStatusResponseDto = UserPlace;

type UserPatchVisitStatusRequestDto = {
	visitStatus: ValueOf<typeof VisitStatus>;
	placeId: string;
};

type UserPatchConfirmVisitResponseDto = {
	placeId: string;
	lat: number;
	lng: number;
};

export type {
	UserPlace,
	UserPlacesGetAllResponseDto,
	UserPatchVisitStatusResponseDto,
	UserPatchVisitStatusRequestDto,
	UserPatchConfirmVisitResponseDto,
};
