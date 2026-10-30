import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const lessonSource = readFileSync(
  new URL("../src/lib/debt-vs-investing-lesson.ts", import.meta.url),
  "utf8",
);
const pageSource = readFileSync(
  new URL("../src/app/lessons/debt-vs-investing/page.tsx", import.meta.url),
  "utf8",
);
const flowSource = readFileSync(
  new URL("../src/app/lessons/debt-vs-investing/debt-vs-investing-flow.tsx", import.meta.url),
  "utf8",
);
const actionSource = readFileSync(
  new URL("../src/app/lessons/debt-vs-investing/actions.ts", import.meta.url),
  "utf8",
);
const componentSource = readFileSync(
  new URL("../src/components/lessons/debt-vs-investing-lesson.tsx", import.meta.url),
  "utf8",
);
const entrySource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/debt-vs-investing/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const lessonSevenSource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/cash-isnt-risk-free/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const foundationSource = readFileSync(
  new URL("../src/components/dashboard/foundation-world.tsx", import.meta.url),
  "utf8",
);
const courseWorldsSource = readFileSync(
  new URL("../src/lib/course-worlds.ts", import.meta.url),
  "utf8",
);
const frSource = readFileSync(new URL("../src/lib/dictionaries/fr.ts", import.meta.url), "utf8");
const usSource = readFileSync(new URL("../src/lib/dictionaries/us.ts", import.meta.url), "utf8");

const compiled = ts.transpileModule(lessonSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  ANNUAL_RATE,
  CHANGE_OPTIONS,
  DEBT_BALANCE,
  DECISION_OPTIONS,
  DEBT_VS_INVESTING_STEPS,
  EXTRA_MONTHLY,
  FULL_YEAR_COST_EXAMPLE,
  INVESTMENT_YEARS,
  LOWER_RATE,
  LOWER_RATE_MONTHS,
  RATE_OPTIONS,
  isLessonSixAvailable,
} = compiledModule.exports;

test("lesson six is available in both learning tracks", () => {
  assert.equal(isLessonSixAvailable("fr"), true);
  assert.equal(isLessonSixAvailable("us"), true);
});

test("lesson six has ten screens and one correct answer per exercise", () => {
  assert.equal(DEBT_VS_INVESTING_STEPS.length, 10);
  assert.equal(RATE_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(DECISION_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(CHANGE_OPTIONS.filter((option) => option.correct).length, 1);
});

test("the annual-rate example stays internally consistent", () => {
  assert.equal(EXTRA_MONTHLY, 100);
  assert.equal(DEBT_BALANCE, 600);
  assert.equal(ANNUAL_RATE, 12);
  assert.equal(INVESTMENT_YEARS, 10);
  assert.equal(FULL_YEAR_COST_EXAMPLE, 72);
  assert.equal(LOWER_RATE, 0);
  assert.equal(LOWER_RATE_MONTHS, 9);
});

test("the server page passes only the track across the lesson client boundary", () => {
  assert.match(pageSource, /<DebtVsInvestingFlow track=\{member\.track\} \/>/);
  assert.doesNotMatch(pageSource, /sharedCopy=/);
  assert.match(flowSource, /getDictionary\(memberTrack\)/);
});

test("lesson six requires lesson five and saves 6 of 8 progress", () => {
  assert.match(pageSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 5\)/);
  assert.match(actionSource, /requireMember\(\)/);
  assert.match(actionSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 5\)/);
  assert.match(actionSource, /completeLesson\(member\.courseProgress, FOUNDATION_WORLD, 6\)/);
  assert.match(actionSource, /refreshSession\(\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses"\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses\/financial-foundation"\)/);
});

test("lesson six moves focus between screens and supports replay and save retry", () => {
  assert.match(flowSource, /querySelector\("h1"\)/);
  assert.match(flowSource, /focus\(\{ preventScroll: true \}\)/);
  assert.match(flowSource, /onRetryProgress=\{\(\) => void saveProgress\(\)\}/);
  assert.match(componentSource, /props\.progressStatus === "error"/);
  assert.match(componentSource, /onClick=\{props\.onRestart\}/);
});

test("the World 1 entry redirects to lesson six and unlocks lesson seven", () => {
  assert.match(entrySource, /redirect\("\/lessons\/debt-vs-investing"\)/);
  assert.match(foundationSource, /foundationLessonHref/);
  assert.match(courseWorldsSource, /financial-foundation\/debt-vs-investing/);
  assert.match(courseWorldsSource, /financial-foundation\/cash-isnt-risk-free/);
  assert.match(
    lessonSevenSource,
    /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 6\)/,
  );
});

test("lesson six explains annual rates in both tracks without mixed currencies", () => {
  const frStart = frSource.indexOf("  lesson6:");
  const usStart = usSource.indexOf("  lesson6:");
  const frLessonSix = frSource.slice(frStart, frSource.indexOf("  dashboard:", frStart));
  const usLessonSix = usSource.slice(usStart, usSource.indexOf("  dashboard:", usStart));

  assert.match(frLessonSix, /TAEG fixe : \{rate\} %/);
  assert.match(frLessonSix, /base annuelle/);
  assert.match(frLessonSix, /12 % de \{debt\}/);
  assert.doesNotMatch(frLessonSix, /\$/);
  assert.match(usLessonSix, /APR: \{rate\}%/);
  assert.match(usLessonSix, /annual basis/);
  assert.match(usLessonSix, /12% of \{debt\}/);
  assert.doesNotMatch(usLessonSix, /€/);
  assert.match(componentSource, /formatMoney\(amount, props\.track\)/);
});
