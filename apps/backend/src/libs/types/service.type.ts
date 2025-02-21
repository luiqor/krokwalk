type Service<T = unknown> = {
  getAll(params?: unknown): Promise<{ items: T[] }>;
};

export type { Service };
