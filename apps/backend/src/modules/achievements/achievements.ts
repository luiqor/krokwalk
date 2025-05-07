import { AchievementModel } from "./achievement.model";
import { AchievementRepository } from "./achievement.repository";
import { AchievementService } from "./achievement.service";

const achievementRepository = new AchievementRepository(AchievementModel);
const achievementService = new AchievementService(achievementRepository);

export { achievementService, AchievementModel, type AchievementService };
export { AchievementEvent } from "./libs/enums/enums";
