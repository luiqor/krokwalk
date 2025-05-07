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

	public async getById(id: string): Promise<null | unknown> {
		return this.repository.getById(id);
	}
}

export { AchievementService };
