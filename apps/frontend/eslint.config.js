import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import baseConfig from "../../eslint.config.js";

const reactConfig = {
  ignores: ["dist"],
  files: ["src/**/*.{ts,tsx}"],
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

const config = [...baseConfig, reactConfig];

export default config;
