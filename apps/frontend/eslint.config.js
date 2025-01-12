import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import baseConfig from "../../eslint.config.js";

/** @typedef {import("eslint").Linter.Config} */
let Config;

/** @type {Config} */
const reactConfig = {
  ignores: ["dist"],
  files: ["**/*.{ts,tsx}"],
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

/** @type {Config[]} */
const config = [...baseConfig, reactConfig];

export default config;
