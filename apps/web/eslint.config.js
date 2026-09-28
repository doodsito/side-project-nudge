import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const serverOnlyImport = {
  name: "server-only",
  message:
    "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
};

// Atomic design (docs/ui.md): a level may only import from the levels below it.
// components/ui holds downloaded primitives (shadcn, motion...) and is the lowest level.
const uiLevels = ["ui", "atoms", "molecules", "organisms", "templates"];
const atomicDesignRules = uiLevels.map((level, index) => ({
  files: [`src/components/${level}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [serverOnlyImport],
        patterns: uiLevels.slice(index + 1).map((higher) => ({
          group: [`@/components/${higher}/*`, `**/${higher}/*`],
          message: `components/${level} cannot import from components/${higher}: a level may only use the levels below it (see docs/ui.md).`,
        })),
      },
    ],
  },
}));

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi", ".nitro", ".vercel", ".tanstack"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": ["error", { paths: [serverOnlyImport] }],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  ...atomicDesignRules,
  eslintPluginPrettier,
);
