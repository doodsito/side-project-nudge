import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

// Atomic design (docs/ui.md): a level may only import from the levels below it.
// components/ui holds downloaded primitives (shadcn, motion...) and is the lowest level.
const uiLevels = ["ui", "atoms", "molecules", "organisms", "templates"];
const atomicDesignRules = uiLevels.map((level, index) => ({
  files: [`src/components/${level}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: uiLevels.slice(index + 1).map((higher) => ({
          group: [`@/components/${higher}/*`, `**/${higher}/*`],
          message: `components/${level} cannot import from components/${higher}: a level may only use the levels below it (see docs/ui.md).`,
        })),
      },
    ],
  },
}));

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  ...atomicDesignRules,
  eslintPluginPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
