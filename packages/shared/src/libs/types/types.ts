type TokenPayload = {
	userId: string;
};

type ValueOf<T> = T[keyof T];

export type { TokenPayload, ValueOf };
