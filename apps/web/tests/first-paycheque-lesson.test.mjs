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
  SAM,
  SKIP_QUIZ,
  TOTAL_SPENT,
  TRANSFER_OPTIONS,
  formatMoney,
  isExpenseAnswerCorrect,
  scoreSkipQuiz,
} = compiledModule.exports;

const dollars = (amount) => formatMoney(amount, "us");

test("Alex's budget adds up to the 100 used throughout the lesson", () => {
  assert.equal(SALARY, 1850);
  assert.equal(TOTAL_SPENT, 1750);
  assert.equal(REMAINING, 100);
  assert.equal(
    BUDGET_ITEMS.reduce((sum, item) => sum + item.amount, 0),
    TOTAL_SPENT,
  );
});

test("US learners see dollars and French learners see euros", () => {
  assert.equal(formatMoney(1850, "us"), "$1,850");
  assert.equal(formatMoney(1850, "fr"), "1\u202f850\u00a0€");
  assert.equal(formatMoney(0, "us"), "$0");
  assert.equal(formatMoney(0, "fr"), "0\u00a0€");
});

test("every expense is a need or a want", () => {
  BUDGET_ITEMS.forEach((item, index) => {
    assert.ok(["need", "want"].includes(item.type));
    assert.equal(isExpenseAnswerCorrect(index, item.type), true);
    assert.equal(isExpenseAnswerCorrect(index, item.type === "need" ? "want" : "need"), false);
  });
});

test("every lesson question has one right answer", () => {
  for (const options of [CONCEPT_OPTIONS, TRANSFER_OPTIONS]) {
    assert.equal(options.filter((option) => option.correct).length, 1);
  }
});

test("Sam's case is a new situation whose free money is what is left minus the bill", () => {
  assert.equal(SAM.earned - SAM.spent, 125);
  const right = TRANSFER_OPTIONS.find((option) => option.correct);
  assert.equal(right.amount, SAM.earned - SAM.spent - SAM.bill);
  assert.equal(right.amount, 100);
  assert.notEqual(SAM.earned, SALARY);
});

test("the skip quiz has 3 questions, each with exactly one right option", () => {
  assert.equal(SKIP_QUIZ.length, 3);
  SKIP_QUIZ.forEach((question) => {
    assert.equal(question.options.filter((option) => option.value === question.answer).length, 1);
  });
});

test("the skip quiz's sums are right", () => {
  assert.equal(SKIP_QUIZ[0].answer, String(1200 - 1000));
  assert.equal(SKIP_QUIZ[2].answer, String(200 - 50));
});

test("only 3 out of 3 skips the lesson", () => {
  const allRight = Object.fromEntries(SKIP_QUIZ.map((question) => [question.id, question.answer]));
  const passed = scoreSkipQuiz(allRight);
  assert.equal(passed.passed, true);
  assert.deepEqual(Array.from(passed.missed), []);

  const oneWrong = scoreSkipQuiz({ ...allRight, [SKIP_QUIZ[1].id]: "streaming" });
  assert.equal(oneWrong.passed, false);
  assert.deepEqual(Array.from(oneWrong.missed), [SKIP_QUIZ[1].id]);

  assert.equal(scoreSkipQuiz({}).passed, false);
});

test("the lesson keeps one focused idea across eight short screens", () => {
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
