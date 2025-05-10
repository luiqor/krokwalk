import { AchievementDto } from "./achievement-dto.type";
import { UserDto } from "./user-dto.type";

type GetUserProfileResponseDto = UserDto & {
	achievements: AchievementDto[];
};

export { type GetUserProfileResponseDto };
