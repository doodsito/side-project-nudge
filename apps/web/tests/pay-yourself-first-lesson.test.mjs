import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/lib/pay-yourself-first-lesson.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  CHANGE_OPTIONS,
  EXAMPLE_TRANSFER,
  EXTRA_ELECTRICITY,
  FLEXIBLE_BALANCE,
  HABIT_OPTIONS,
  ORDER_OPTIONS,
  PAY_YOURSELF_FIRST_STEPS,
  POTENTIAL_CAPACITY,
  PREVIOUS_REMAINDER,
  REVISED_CAPACITY,
  TRANSPORT_PASS,
} = compiledModule.exports;

test("lesson two continues Alex's budget without treating the pass as free money", () => {
  assert.equal(PREVIOUS_REMAINDER, 100);
  assert.equal(TRANSPORT_PASS, 65);
  assert.equal(POTENTIAL_CAPACITY, 35);
  assert.equal(EXAMPLE_TRANSFER, 20);
  assert.equal(FLEXIBLE_BALANCE, 15);
  assert.equal(EXTRA_ELECTRICITY, 25);
  assert.equal(REVISED_CAPACITY, 10);
});

test("decision and changed-budget questions have one answer while habit choice stays flexible", () => {
  assert.equal(ORDER_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(CHANGE_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(HABIT_OPTIONS.length, 2);
  assert.equal(PAY_YOURSELF_FIRST_STEPS.length, 8);
});
