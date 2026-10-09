import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/lib/first-paycheque-lesson.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  BUDGET_ITEMS,
  CONCEPT_OPTIONS,
  LESSON_STEPS,
  REMAINING,
  SALARY,
  TOTAL_SPENT,
  TRANSFER_OPTIONS,
  isExpenseAnswerCorrect,
} = compiledModule.exports;

test("Alex's budget adds up to the €100 used throughout the lesson", () => {
  assert.equal(SALARY, 1850);
  assert.equal(TOTAL_SPENT, 1750);
  assert.equal(REMAINING, 100);
  assert.equal(
    BUDGET_ITEMS.reduce((sum, item) => sum + item.amount, 0),
    TOTAL_SPENT,
  );
});

test("every practice question has one clear explained answer", () => {
  assert.equal(CONCEPT_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(TRANSFER_OPTIONS.filter((option) => option.correct).length, 1);
  BUDGET_ITEMS.forEach((item, index) => {
    assert.ok(item.note);
    assert.equal(isExpenseAnswerCorrect(index, item.type), true);
    assert.equal(
      isExpenseAnswerCorrect(index, item.type === "essential" ? "flexible" : "essential"),
      false,
    );
  });
});

test("the lesson keeps one focused concept across eight short screens", () => {
  assert.deepEqual(Array.from(LESSON_STEPS), [
    "welcome",
    "story",
    "budget",
    "result",
    "concept-check",
    "concept",
    "transfer",
    "complete",
  ]);
});
