type Repository<T = unknown> = {
  getAll(params?: unknown): Promise<T[]>;
};

export type { Repository };
