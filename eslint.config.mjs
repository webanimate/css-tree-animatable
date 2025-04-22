import { defineConfig, globalIgnores } from "eslint/config";
import json from "eslint-plugin-json";
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

export default defineConfig([globalIgnores([
    "**/node_modules",
    "**/coverage",
    "**/dist",
    "**/*.*",
    "!**/*.html",
    "!**/generate.js",
    "!**/*.json",
    "**/.idea",
    "**/.vscode",
    "**/*.suo",
    "**/*.ntvs*",
    "**/*.njsproj",
    "**/*.sln",
]), {
    extends: compat.extends("eslint:recommended", "plugin:json/recommended-legacy", "prettier"),

    plugins: {
        json,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },
}]);