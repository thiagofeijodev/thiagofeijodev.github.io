/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:react/recommended", "prettier"),

    plugins: {
        prettier,
        import: fixupPluginRules(_import),
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "no-console": "off",
        eqeqeq: 0,
        "no-plusplus": 0,
        "no-underscore-dangle": 0,
        "react/jsx-props-no-spreading": 0,
        "react-hooks/exhaustive-deps": 0,
        "react/prop-types": 0,
        "react/display-name": 0,

        "react/no-unknown-property": [0, {
            ignore: [
                "clip-rule",
                "fill-rule",
                "stop-opacity",
                "stroke-width",
                "stroke-linejoin",
                "stroke-miterlimit",
            ],
        }],

        "react/react-in-jsx-scope": "off",
        "import/prefer-default-export": 0,

        "import/no-extraneous-dependencies": ["warn", {
            devDependencies: [
                "**/*test.js",
                ".config/**", 
                "tests/setupTests.js",
                "eslint.config.mjs"
            ],
            optionalDependencies: true,
            peerDependencies: false,
            packageDir: "./",
        }],

        "react/jsx-filename-extension": [1, {
            extensions: [".js", ".jsx", ".svg"],
        }],
    },
}]);