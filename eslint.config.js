import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
const config = [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.jest } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginJest.configs.recommended,
];

export default config;
