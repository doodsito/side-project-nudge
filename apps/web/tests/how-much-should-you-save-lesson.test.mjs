import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/lib/how-much-should-you-save-lesson.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  AMOUNT_OPTIONS,
  EXAMPLE_MARGIN,
  EXAMPLE_TRANSFER,
  HOW_MUCH_SHOULD_YOU_SAVE_STEPS,
  LOWER_MONTH_CAPACITY,
  LOWER_MONTH_MARGIN,
  MONTHLY_CAPACITY,
  PERCENTAGE_REFERENCES,
  PLANNED_SPENDING,
  REFERENCE_OPTIONS,
  STRESS_OPTIONS,
  TAKE_HOME_PAY,
  isLessonThreeAvailable,
} = compiledModule.exports;

test("lesson three exists only in the French track", () => {
  assert.equal(isLessonThreeAvailable("fr"), true);
  assert.equal(isLessonThreeAvailable("us"), false);
});

test("lesson three turns Alex's budget and percentages into euro amounts", () => {
  assert.equal(TAKE_HOME_PAY, 1850);
  assert.equal(PLANNED_SPENDING, 1670);
  assert.equal(MONTHLY_CAPACITY, 180);
  assert.equal(PERCENTAGE_REFERENCES[0].amount, 92.5);
  assert.equal(PERCENTAGE_REFERENCES[1].amount, 185);
  assert.equal(PERCENTAGE_REFERENCES[2].amount, 370);
});

test("lesson three leaves margin and reviews the amount when the month changes", () => {
  assert.equal(EXAMPLE_TRANSFER, 90);
  assert.equal(EXAMPLE_MARGIN, 90);
  assert.equal(LOWER_MONTH_CAPACITY, 100);
  assert.equal(LOWER_MONTH_MARGIN, 10);
  assert.equal(REFERENCE_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(AMOUNT_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(STRESS_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(HOW_MUCH_SHOULD_YOU_SAVE_STEPS.length, 8);
});
