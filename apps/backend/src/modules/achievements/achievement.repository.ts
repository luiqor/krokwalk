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

	public async getById(id: string): Promise<unknown | null> {
		return await this.model.query().findById(id);
	}
}

export { AchievementRepository };
