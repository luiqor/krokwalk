import type { AchievementDto } from "shared";

import type { Repository } from "~/libs/types/types";

import { AchievementModel } from "./achievement.model";

class AchievementRepository implements Repository {
	private model: typeof AchievementModel;

	public constructor(model: typeof AchievementModel) {
		this.model = model;
	}

	public async getAll(params?: unknown): Promise<unknown[]> {
		return await Promise.resolve([]);
	}

	public async getById(id: string): Promise<AchievementDto | null> {
		const model = await this.model.query().findById(id);

		if (!model) {
			return null;
		}

		return {
			id: model.id,
			title: model.title,
			description: model.description,
			iconLink: model.iconLink,
			achievementEvent: model.achievementEvent,
			targetCount: model.targetCount,
		};
	}

	public async getAchievementsByEvent({
		achievementEvent,
		targetCount,
	}: {
		achievementEvent: string;
		targetCount: number;
	}): Promise<AchievementDto[] | null> {
		const models = await this.model
			.query()
			.where({ achievementEvent })
			.andWhere("targetCount", "<=", targetCount)
			.orderBy("targetCount", "desc");

		if (!models || models.length === 0) {
			return null;
		}

		return models.map((model) => ({
			id: model.id,
			title: model.title,
			description: model.description,
			iconLink: model.iconLink,
			achievementEvent: model.achievementEvent,
			targetCount: model.targetCount,
		}));
	}
}

export { AchievementRepository };
