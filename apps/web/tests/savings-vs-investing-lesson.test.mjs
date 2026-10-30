import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const lessonSource = read("../src/lib/savings-vs-investing-lesson.ts");
const pageSource = read("../src/app/lessons/savings-vs-investing/page.tsx");
const entrySource = read(
  "../src/app/dashboard/courses/financial-foundation/savings-vs-investing/page.tsx",
);
const actionSource = read("../src/app/lessons/savings-vs-investing/actions.ts");
const flowSource = read("../src/app/lessons/savings-vs-investing/savings-vs-investing-flow.tsx");
const componentSource = read("../src/components/lessons/savings-vs-investing-lesson.tsx");
const feedbackSource = read("../src/components/shared/feedback-widget.tsx");
const worldSource = read("../src/components/dashboard/foundation-world.tsx");
const frSource = read("../src/lib/dictionaries/fr.ts");
const usSource = read("../src/lib/dictionaries/us.ts");

const compiled = ts.transpileModule(lessonSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  EXAMPLE_AMOUNT,
  SAVINGS_VS_INVESTING_OPTIONS,
  SAVINGS_VS_INVESTING_STEPS,
  isLessonEightAvailable,
} = compiledModule.exports;

test("lesson eight keeps the approved eight-screen sequence in both tracks", () => {
  assert.deepEqual(Array.from(SAVINGS_VS_INVESTING_STEPS), [
    "welcome",
    "difference",
    "same-amount",
    "alex",
    "near-term",
    "long-term",
    "reflection",
    "complete",
  ]);
  assert.equal(EXAMPLE_AMOUNT, 500);
  assert.equal(isLessonEightAvailable("fr"), true);
  assert.equal(isLessonEightAvailable("us"), true);
});

test("practice questions each have one sound answer; personal reflection has none", () => {
  for (const question of ["same-amount", "near-term", "long-term"]) {
    assert.equal(
      SAVINGS_VS_INVESTING_OPTIONS[question].filter((option) => option.correct).length,
      1,
    );
    assert.equal(SAVINGS_VS_INVESTING_OPTIONS[question].length, 3);
  }
  assert.equal(SAVINGS_VS_INVESTING_OPTIONS.reflection.length, 4);
  assert.equal(
    SAVINGS_VS_INVESTING_OPTIONS.reflection.every((option) => option.correct === null),
    true,
  );
});

test("lesson eight is gated behind lesson seven and records 8 of 8", () => {
  assert.match(pageSource, /requireMember\(\)/);
  assert.match(pageSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 7\)/);
  assert.match(entrySource, /redirect\("\/lessons\/savings-vs-investing"\)/);
  assert.match(actionSource, /requireMember\(\)/);
  assert.match(actionSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 7\)/);
  assert.match(actionSource, /completeLesson\(member\.courseProgress, FOUNDATION_WORLD, 8\)/);
  assert.match(actionSource, /refreshSession\(\)/);
  for (const path of [
    "/dashboard",
    "/dashboard/courses",
    "/dashboard/courses/financial-foundation",
  ]) {
    assert.ok(actionSource.includes(`revalidatePath("${path}")`));
  }
});

test("saving controls celebration, retry, replay and feedback", () => {
  assert.match(flowSource, /result\.status === "saved"/);
  assert.match(flowSource, /if \(!celebrated\.current\)/);
  assert.match(flowSource, /useRef\(alreadyCompleted\)/);
  assert.match(componentSource, /props\.progressStatus !== "saved"/);
  assert.match(componentSource, /props\.progressStatus === "error"/);
  assert.match(componentSource, /onClick=\{props\.onRestart\}/);
  assert.match(componentSource, /props\.showConfetti && <Confetti \/>/);
  assert.match(componentSource, /<FeedbackHeaderButton/);
  assert.match(pageSource, /showFloatingTrigger=\{false\}/);
  assert.match(feedbackSource, /submitFeedback/);
  assert.match(worldSource, /rewardCompleteTitle/);
});

test("feedback follows checking, focus moves between screens and copy stays localized", () => {
  assert.match(componentSource, /answer \? \(/);
  assert.match(componentSource, /checked && selectedIndex >= 0/);
  assert.match(componentSource, /shared\.answer/);
  assert.match(flowSource, /querySelector\("h1"\)/);
  assert.match(flowSource, /focus\(\{ preventScroll: true \}\)/);
  const frLesson = frSource.slice(
    frSource.indexOf("  lesson8:"),
    frSource.indexOf("  dashboard:", frSource.indexOf("  lesson8:")),
  );
  const usLesson = usSource.slice(
    usSource.indexOf("  lesson8:"),
    usSource.indexOf("  dashboard:", usSource.indexOf("  lesson8:")),
  );
  assert.match(frLesson, /Épargner ou investir/);
  assert.match(usLesson, /Savings vs investing/);
  assert.doesNotMatch(frLesson, /\$/);
  assert.doesNotMatch(usLesson, /€/);
  assert.match(componentSource, /formatMoney\(EXAMPLE_AMOUNT, props\.track\)/);
});
