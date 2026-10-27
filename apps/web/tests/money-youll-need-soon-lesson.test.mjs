import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const lessonSource = readFileSync(
  new URL("../src/lib/money-youll-need-soon-lesson.ts", import.meta.url),
  "utf8",
);
const pageSource = readFileSync(
  new URL("../src/app/lessons/money-youll-need-soon/page.tsx", import.meta.url),
  "utf8",
);
const flowSource = readFileSync(
  new URL(
    "../src/app/lessons/money-youll-need-soon/money-youll-need-soon-flow.tsx",
    import.meta.url,
  ),
  "utf8",
);
const actionSource = readFileSync(
  new URL("../src/app/lessons/money-youll-need-soon/actions.ts", import.meta.url),
  "utf8",
);
const componentSource = readFileSync(
  new URL("../src/components/lessons/money-youll-need-soon-lesson.tsx", import.meta.url),
  "utf8",
);
const entrySource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/money-youll-need-soon/page.tsx",
    import.meta.url,
  ),
  "utf8",
);
const lessonSixSource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/debt-vs-investing/page.tsx",
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
  ALREADY_SAVED,
  CHANGE_OPTIONS,
  EARLIER_MONTHLY_AMOUNT,
  EARLIER_MONTHLY_SHORTFALL,
  EARLIER_MONTHS_UNTIL_NEEDED,
  MONEY_YOULL_NEED_SOON_STEPS,
  MONTHLY_OTHER_PRIORITIES,
  MONTHLY_PLANNED_AMOUNT,
  MONTHLY_SAVING,
  MONTHS_UNTIL_NEEDED,
  PLANNED_COST,
  PLANNED_GAP,
  ROLE_OPTIONS,
  STABILITY_OPTIONS,
  isLessonFiveAvailable,
} = compiledModule.exports;

test("lesson five is available in both learning tracks", () => {
  assert.equal(isLessonFiveAvailable("fr"), true);
  assert.equal(isLessonFiveAvailable("us"), true);
});

test("lesson five has eight screens and one correct answer per exercise", () => {
  assert.equal(MONEY_YOULL_NEED_SOON_STEPS.length, 8);
  assert.equal(ROLE_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(STABILITY_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(CHANGE_OPTIONS.filter((option) => option.correct).length, 1);
});

test("Alex's planned expense, horizons and monthly amounts stay consistent", () => {
  assert.equal(MONTHLY_SAVING, 90);
  assert.equal(PLANNED_COST, 540);
  assert.equal(ALREADY_SAVED, 180);
  assert.equal(PLANNED_GAP, 360);
  assert.equal(MONTHS_UNTIL_NEEDED, 6);
  assert.equal(MONTHLY_PLANNED_AMOUNT, 60);
  assert.equal(MONTHLY_OTHER_PRIORITIES, 30);
  assert.equal(EARLIER_MONTHS_UNTIL_NEEDED, 3);
  assert.equal(EARLIER_MONTHLY_AMOUNT, 120);
  assert.equal(EARLIER_MONTHLY_SHORTFALL, 30);
});

test("the server page passes only the track across the lesson client boundary", () => {
  assert.match(pageSource, /<MoneyYoullNeedSoonFlow track=\{member\.track\} \/>/);
  assert.doesNotMatch(pageSource, /sharedCopy=/);
  assert.match(flowSource, /getDictionary\(memberTrack\)/);
});

test("lesson five requires lesson four and saves 5 of 8 progress", () => {
  assert.match(pageSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 4\)/);
  assert.match(actionSource, /requireMember\(\)/);
  assert.match(actionSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 4\)/);
  assert.match(actionSource, /completeLesson\(member\.courseProgress, FOUNDATION_WORLD, 5\)/);
  assert.match(actionSource, /refreshSession\(\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses"\)/);
  assert.match(actionSource, /revalidatePath\("\/dashboard\/courses\/financial-foundation"\)/);
});

test("lesson five moves focus between screens and supports replay and save retry", () => {
  assert.match(flowSource, /querySelector\("h1"\)/);
  assert.match(flowSource, /focus\(\{ preventScroll: true \}\)/);
  assert.match(flowSource, /onRetryProgress=\{\(\) => void saveProgress\(\)\}/);
  assert.match(componentSource, /props\.progressStatus === "error"/);
  assert.match(componentSource, /onClick=\{props\.onRestart\}/);
});

test("the World 1 entry redirects to lesson five and unlocks lesson six", () => {
  assert.match(entrySource, /redirect\("\/lessons\/money-youll-need-soon"\)/);
  assert.match(foundationSource, /financial-foundation\/money-youll-need-soon/);
  assert.match(foundationSource, /financial-foundation\/debt-vs-investing/);
  assert.match(
    lessonSixSource,
    /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 5\)/,
  );
});

test("lesson five is localized without mixed currencies", () => {
  const frStart = frSource.indexOf("  lesson5:");
  const usStart = usSource.indexOf("  lesson5:");
  const frLessonFive = frSource.slice(frStart, frSource.indexOf("  lesson6:", frStart));
  const usLessonFive = usSource.slice(usStart, usSource.indexOf("  lesson6:", usStart));

  assert.match(frLessonFive, /prévoit de déménager/);
  assert.doesNotMatch(frLessonFive, /\$/);
  assert.doesNotMatch(
    frLessonFive,
    /A date changes the job|Planned expense|Moving costs|Debt vs investing|Lesson complete/,
  );
  assert.match(usLessonFive, /plans to move/);
  assert.doesNotMatch(usLessonFive, /€/);
  assert.doesNotMatch(
    usLessonFive,
    /Une date change le rôle|Dépense planifiée|Frais de déménagement|Rembourser une dette ou investir|Leçon terminée/,
  );
  assert.match(componentSource, /formatMoney\(amount, props\.track\)/);
});
