import type { AchievementDto } from "shared";

import type { Service } from "~/libs/types/types";

import { AchievementRepository } from "./achievement.repository";

class AchievementService implements Service {
	private repository: AchievementRepository;

	public constructor(repository: AchievementRepository) {
		this.repository = repository;
	}

	public async getAll(): Promise<{ items: unknown[] }> {
		return { items: [] };
	}

	public async getById(id: string): Promise<null | AchievementDto> {
		return this.repository.getById(id);
	}

	public async getAchievementByEvent({
		achievementEvent,
		targetCount,
	}: {
		achievementEvent: string;
		targetCount: number;
	}): Promise<null | AchievementDto[]> {
		return this.repository.getAchievementsByEvent({
			achievementEvent,
			targetCount,
		});
	}
}

export { AchievementService };
