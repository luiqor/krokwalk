export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.(js|ts)", "**/*.(test|spec).(js|ts)"],
	moduleNameMapper: {
		"^~/(.*)$": "<rootDir>/src/$1",
		"^shared$": "<rootDir>/../../packages/shared/src/index.ts",
	},
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "json"],
	collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
};
