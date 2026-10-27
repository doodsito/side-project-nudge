import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const lessonSource = readFileSync(
  new URL("../src/lib/cash-isnt-risk-free-lesson.ts", import.meta.url),
  "utf8",
);
const pageSource = readFileSync(
  new URL("../src/app/lessons/cash-isnt-risk-free/page.tsx", import.meta.url),
  "utf8",
);
const flowSource = readFileSync(
  new URL("../src/app/lessons/cash-isnt-risk-free/cash-isnt-risk-free-flow.tsx", import.meta.url),
  "utf8",
);
const actionSource = readFileSync(
  new URL("../src/app/lessons/cash-isnt-risk-free/actions.ts", import.meta.url),
  "utf8",
);
const componentSource = readFileSync(
  new URL("../src/components/lessons/cash-isnt-risk-free-lesson.tsx", import.meta.url),
  "utf8",
);
const entrySource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/cash-isnt-risk-free/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const lessonEightSource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/savings-vs-investing/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const foundationSource = readFileSync(
  new URL("../src/components/dashboard/foundation-world.tsx", import.meta.url),
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
  BALANCE_OPTIONS,
  CASH_AFTER_YEAR,
  CASH_ISNT_RISK_FREE_STEPS,
  CASH_PURCHASING_GAP,
  CASH_RATE,
  INFLATION_OPTIONS,
  INFLATION_RATE,
  INTEREST_OPTIONS,
  LONG_TERM_OPTIONS,
  LONG_TERM_YEARS,
  NEAR_TERM_MONTHS,
  NEAR_TERM_OPTIONS,
  PRICE_AFTER_INFLATION,
  SAVINGS_AFTER_YEAR,
  SAVINGS_PURCHASING_GAP,
  SAVINGS_RATE,
  STARTING_CASH,
  isLessonSevenAvailable,
} = compiledModule.exports;

test("lesson seven is available in both learning tracks", () => {
  assert.equal(isLessonSevenAvailable("fr"), true);
  assert.equal(isLessonSevenAvailable("us"), true);
});

test("lesson seven has eleven screens and one correct answer per exercise", () => {
  assert.equal(CASH_ISNT_RISK_FREE_STEPS.length, 11);
  assert.equal(INFLATION_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(BALANCE_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(INTEREST_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(NEAR_TERM_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(LONG_TERM_OPTIONS.filter((option) => option.correct).length, 1);
});

test("the inflation examples stay internally consistent", () => {
  assert.equal(STARTING_CASH, 1000);
  assert.equal(INFLATION_RATE, 3);
  assert.equal(CASH_RATE, 0);
  assert.equal(SAVINGS_RATE, 2);
  assert.equal(PRICE_AFTER_INFLATION, 1030);
  assert.equal(CASH_AFTER_YEAR, 1000);
  assert.equal(CASH_PURCHASING_GAP, 30);
  assert.equal(SAVINGS_AFTER_YEAR, 1020);
  assert.equal(SAVINGS_PURCHASING_GAP, 10);
  assert.equal(NEAR_TERM_MONTHS, 2);
  assert.equal(LONG_TERM_YEARS, 10);
});

test("the server page passes only the track across the lesson client boundary", () => {
  assert.match(pageSource, /<CashIsntRiskFreeFlow track=\{member\.track\} \/>/);
  assert.doesNotMatch(pageSource, /sharedCopy=/);
  assert.match(flowSource, /getDictionary\(memberTrack\)/);
});

test("lesson seven requires lesson six and saves 7 of 8 progress", () => {
  assert.match(pageSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 6\)/);
  assert.match(actionSource, /requireMember\(\)/);
  assert.match(actionSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 6\)/);
  assert.match(actionSource, /completeLesson\(member\.courseProgress, FOUNDATION_WORLD, 7\)/);
  assert.match(actionSource, /refreshSession\(\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses"\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses\/financial-foundation"\)/);
});

test("lesson seven moves focus between screens and supports replay and save retry", () => {
  assert.match(flowSource, /querySelector\("h1"\)/);
  assert.match(flowSource, /focus\(\{ preventScroll: true \}\)/);
  assert.match(flowSource, /onRetryProgress=\{\(\) => void saveProgress\(\)\}/);
  assert.match(componentSource, /props\.progressStatus === "error"/);
  assert.match(componentSource, /onClick=\{props\.onRestart\}/);
});

test("the World 1 entry redirects to lesson seven and unlocks lesson eight", () => {
  assert.match(entrySource, /redirect\("\/lessons\/cash-isnt-risk-free"\)/);
  assert.match(foundationSource, /financial-foundation\/cash-isnt-risk-free/);
  assert.match(foundationSource, /financial-foundation\/savings-vs-investing/);
  assert.match(
    lessonEightSource,
    /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 7\)/,
  );
});

test("lesson seven is localized without mixed currencies", () => {
  const frStart = frSource.indexOf("  lesson7:");
  const usStart = usSource.indexOf("  lesson7:");
  const frLessonSeven = frSource.slice(frStart, frSource.indexOf("  dashboard:", frStart));
  const usLessonSeven = usSource.slice(usStart, usSource.indexOf("  dashboard:", usStart));

  assert.match(frLessonSeven, /L’inflation est un risque à comprendre/);
  assert.doesNotMatch(frLessonSeven, /\$/);
  assert.match(usLessonSeven, /Inflation is a risk to understand/);
  assert.doesNotMatch(usLessonSeven, /€/);
  assert.match(componentSource, /formatMoney\(amount, props\.track\)/);
  assert.match(componentSource, /fill\(copy\.interestExample\.title, values\)/);
});
