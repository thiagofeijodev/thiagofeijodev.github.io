import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import eslint from "@eslint/js";

const config = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/docs/**",
      "**/build/**",
      "**/release/**",
      "**/*.d.ts",
      "**/coverage/**",
      "**/.cache/**",
      "**/bun.lock",
      "**/package-lock.json",
    ],
  },

  eslint.configs.recommended,
  prettier,

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  {
    files: [
      "eslint.config.js",
      ".config/**/*.{js,mjs}",
      "commitlint.config.js",
      "jest.config.mjs",
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off",
    },
  },

  {
    files: ["src/**/*.{js,jsx}"],
    ...react.configs.flat.recommended,
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
        process: "readonly",
      },
      parserOptions: {
        ...react.configs.flat.recommended.languageOptions?.parserOptions,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      ...react.configs.flat.recommended.plugins,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
    },
  },

  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off",
    },
  },
];

export default config;
