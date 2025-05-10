export type { StopOverPlace } from "./stop-over-place.type.js";

export type {
	GetWalkTimeDto,
	GetWalkTimeParams,
	CreateTripBodyDto,
	CreateTripResDto,
	CreateTripPlace,
	CompleteTripResponseDto,
	CompleteTripRequestDto,
} from "shared";

type UnauthUserUpdateVisitStatusResult = {
	id: string;
	visitStatus: string;
};

export type { UnauthUserUpdateVisitStatusResult };
