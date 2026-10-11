import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
