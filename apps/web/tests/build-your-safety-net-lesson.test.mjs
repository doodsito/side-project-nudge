import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const lessonSource = readFileSync(
  new URL("../src/lib/build-your-safety-net-lesson.ts", import.meta.url),
  "utf8",
);
const pageSource = readFileSync(
  new URL("../src/app/lessons/build-your-safety-net/page.tsx", import.meta.url),
  "utf8",
);
const flowSource = readFileSync(
  new URL(
    "../src/app/lessons/build-your-safety-net/build-your-safety-net-flow.tsx",
    import.meta.url,
  ),
  "utf8",
);
const actionSource = readFileSync(
  new URL("../src/app/lessons/build-your-safety-net/actions.ts", import.meta.url),
  "utf8",
);
const foundationSource = readFileSync(
  new URL("../src/components/dashboard/foundation-world.tsx", import.meta.url),
  "utf8",
);
const lessonFiveSource = readFileSync(
  new URL(
    "../src/app/dashboard/courses/financial-foundation/money-youll-need-soon/page.tsx",
    import.meta.url,
  ),
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
  BUFFER_AFTER_USE,
  BUILD_YOUR_SAFETY_NET_STEPS,
  CURRENT_BUFFER,
  DECISION_OPTIONS,
  DISRUPTION_COST,
  ESSENTIAL_MONTHLY_COSTS,
  FACTOR_OPTIONS,
  MONTHLY_SAVING,
  REBUILD_CONTRIBUTION,
  REBUILD_MARGIN,
  REBUILD_OPTIONS,
  TAKE_HOME_PAY,
  TIGHTER_MONTH_CAPACITY,
  isLessonFourAvailable,
} = compiledModule.exports;

test("lesson four is available in both learning tracks", () => {
  assert.equal(isLessonFourAvailable("fr"), true);
  assert.equal(isLessonFourAvailable("us"), true);
});

test("lesson four has eight screens and one correct answer per exercise", () => {
  assert.equal(BUILD_YOUR_SAFETY_NET_STEPS.length, 8);
  assert.equal(FACTOR_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(DECISION_OPTIONS.filter((option) => option.correct).length, 1);
  assert.equal(REBUILD_OPTIONS.filter((option) => option.correct).length, 1);
});

test("Alex's safety-net example stays internally consistent", () => {
  assert.equal(TAKE_HOME_PAY, 1850);
  assert.equal(ESSENTIAL_MONTHLY_COSTS, 1350);
  assert.equal(MONTHLY_SAVING, 90);
  assert.equal(CURRENT_BUFFER, 360);
  assert.equal(DISRUPTION_COST, 300);
  assert.equal(BUFFER_AFTER_USE, 60);
  assert.equal(TIGHTER_MONTH_CAPACITY, 100);
  assert.equal(REBUILD_CONTRIBUTION, 50);
  assert.equal(REBUILD_MARGIN, 50);
});

test("the server page passes only the track across the lesson client boundary", () => {
  assert.match(pageSource, /<BuildYourSafetyNetFlow track=\{member\.track\} \/>/);
  assert.doesNotMatch(pageSource, /sharedCopy=/);
  assert.match(flowSource, /getDictionary\(memberTrack\)/);
});

test("lesson four requires lesson three and saves 4 of 8 progress", () => {
  assert.match(pageSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 3\)/);
  assert.match(actionSource, /requireMember\(\)/);
  assert.match(actionSource, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 3\)/);
  assert.match(actionSource, /completeLesson\(member\.courseProgress, FOUNDATION_WORLD, 4\)/);
  assert.match(actionSource, /refreshSession\(\)/);
});

test("the world map links lesson four and the unlocked lesson-five introduction", () => {
  assert.match(foundationSource, /financial-foundation\/build-your-safety-net/);
  assert.match(foundationSource, /financial-foundation\/money-youll-need-soon/);
  assert.match(
    lessonFiveSource,
    /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 4\)/,
  );
});

test("lesson four and lesson five are localized without mixed currencies", () => {
  const frStart = frSource.indexOf("  lesson4:");
  const usStart = usSource.indexOf("  lesson4:");
  const frLessonFour = frSource.slice(frStart, frSource.indexOf("  dashboard:", frStart));
  const usLessonFour = usSource.slice(usStart, usSource.indexOf("  dashboard:", usStart));

  assert.match(frLessonFour, /Un filet de sécurité doit correspondre/);
  assert.match(frLessonFour, /L’argent dont tu auras bientôt besoin/);
  assert.doesNotMatch(frLessonFour, /\$/);
  assert.match(usLessonFour, /A safety net should fit/);
  assert.match(usLessonFour, /Money you’ll need soon/);
  assert.doesNotMatch(usLessonFour, /€/);
});
