import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

function loadTs(path) {
  const compiled = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const compiledModule = { exports: {} };
  runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });
  return compiledModule.exports;
}

const lesson = loadTs("../src/lib/why-invest-lesson.ts");
const progress = loadTs("../src/lib/course-progress.ts");
const page = read("../src/app/lessons/why-invest/page.tsx");
const action = read("../src/app/lessons/why-invest/actions.ts");
const flow = read("../src/app/lessons/why-invest/why-invest-flow.tsx");
const component = read("../src/components/lessons/why-invest-lesson.tsx");
const courseWorlds = read("../src/components/dashboard/course-worlds.tsx");
const dashboard = read("../src/components/dashboard/dashboard-home.tsx");
const fr = read("../src/lib/dictionaries/fr.ts");
const us = read("../src/lib/dictionaries/us.ts");

test("World 0 presents five interactive onboarding stages using the existing examples", () => {
  assert.match(flow, /const STAGE_COUNT = 5/);
  assert.match(flow, /decisionChoices\.map/);
  assert.match(flow, /feedbackChoices/);
  assert.match(flow, /type="range"/);
  assert.match(flow, /WHY_INVEST_CORRECT_ANSWER/);
  assert.match(flow, /nudge-curious\.webp/);
  assert.match(flow, /nudge-guide\.webp/);
  assert.match(flow, /nudge-encourage\.webp/);
  assert.match(flow, /nudge-celebrate\.webp/);
  assert.match(flow, /copy\.risk\.sourceHref/);
  assert.match(flow, /copy\.complete\.sourceHref/);
  assert.doesNotMatch(flow, /\$100/);
  assert.match(
    read("../src/app/lessons/why-invest/why-invest-flow.module.css"),
    /prefers-reduced-motion: reduce/,
  );
  assert.match(flow, /formatMoney\(amount, track\)/);
  assert.equal(
    Math.round(lesson.COMPOUND_EXAMPLE.start * (1 + lesson.COMPOUND_EXAMPLE.annualRate) ** 20),
    lesson.COMPOUND_EXAMPLE.afterTwentyYears,
  );
});

test("the shared lesson model keeps the source examples and answer correct", () => {
  assert.deepEqual(Array.from(lesson.WHY_INVEST_STEPS), [
    "welcome",
    "meaning",
    "compound",
    "risk",
    "question",
    "complete",
  ]);
  assert.equal(
    Math.round(lesson.COMPOUND_EXAMPLE.start * (1 + lesson.COMPOUND_EXAMPLE.annualRate) ** 10),
    lesson.COMPOUND_EXAMPLE.afterTenYears,
  );
  assert.equal(
    Math.round(lesson.COMPOUND_EXAMPLE.start * (1 + lesson.COMPOUND_EXAMPLE.annualRate) ** 20),
    lesson.COMPOUND_EXAMPLE.afterTwentyYears,
  );
  assert.equal(
    lesson.COMPOUND_EXAMPLE.start * (1 + lesson.COMPOUND_EXAMPLE.annualRate * 20),
    lesson.COMPOUND_EXAMPLE.withoutCompounding,
  );
  assert.equal(
    lesson.COMPOUND_EXAMPLE.afterTwentyYears - lesson.COMPOUND_EXAMPLE.withoutCompounding,
    653,
  );
  assert.equal(lesson.RISK_EXAMPLE.start * 0.8, lesson.RISK_EXAMPLE.duringDrop);
  assert.ok(lesson.RISK_EXAMPLE.afterRecovery > lesson.RISK_EXAMPLE.start);
  assert.equal(lesson.WHY_INVEST_CORRECT_ANSWER, 1);
});

test("World 0 progress is independent from World 1 and neither blocks the other", () => {
  const initial = progress.readCourseProgress(null);
  const introComplete = progress.completeLesson(initial, progress.INTRO_WORLD, 1);
  assert.equal(progress.hasCompletedLesson(introComplete, progress.INTRO_WORLD, 1), true);
  assert.equal(progress.hasCompletedLesson(introComplete, progress.FOUNDATION_WORLD, 1), false);

  const foundationFirst = progress.completeLesson(initial, progress.FOUNDATION_WORLD, 1);
  assert.equal(progress.hasCompletedLesson(foundationFirst, progress.INTRO_WORLD, 1), false);
  assert.equal(progress.hasCompletedLesson(foundationFirst, progress.FOUNDATION_WORLD, 1), true);
  assert.equal(progress.completeLesson(introComplete, progress.INTRO_WORLD, 1), introComplete);

  assert.match(courseWorlds, /href="\/lessons\/why-invest"/);
  assert.match(courseWorlds, /foundationLessonHref\(/);
  assert.match(dashboard, /const introCurrent = !introComplete && completed === 0/);
});

test("the member-only lesson saves after completion and keeps replay", () => {
  assert.match(page, /requireMember\(\)/);
  assert.match(action, /requireMember\(\)/);
  assert.match(action, /completeLesson\(member\.courseProgress, INTRO_WORLD, 1\)/);
  assert.match(action, /refreshSession\(\)/);
  assert.match(action, /revalidatePath\("\/dashboard\/courses"\)/);
  assert.match(flow, /function finishQuiz\(\) \{\s*setStage\(4\)/);
  assert.match(flow, /async function continueToWorldOne\(\)/);
  assert.match(flow, /alreadyCompleted \|\| \(await saveProgress\(\)\)/);
  assert.match(flow, /router\.push\("\/dashboard"\)/);
  assert.doesNotMatch(flow.match(/function finishQuiz\(\) \{[^}]*\}/)?.[0] ?? "", /saveProgress/);
  assert.match(flow, /onClick=\{finishQuiz\}/);
  assert.match(flow, /function replay\(\)/);
  assert.match(flow, /progressStatus === "error"/);
  assert.match(component, /progressStatus === "error"/);
  assert.match(component, /feedbackRef\.current\?\.scrollIntoView/);
});

test("both tracks show long-term illustrations and explain their uncertainty", () => {
  const frLesson = fr.slice(fr.indexOf("  lesson0:"), fr.indexOf("  lesson3:"));
  const usLesson = us.slice(us.indexOf("  lesson0:"), us.indexOf("  lesson3:"));

  assert.match(frLesson, /étudiant/);
  assert.match(frLesson, /Après 20 ans/);
  assert.match(frLesson, /5 à 7 % par an/);
  assert.match(frLesson, /une perte reste possible/);
  assert.doesNotMatch(frLesson, /Ce taux régulier est fictif/);
  assert.match(frLesson, /Bonne réponse !/);
  assert.match(usLesson, /student/);
  assert.match(usLesson, /After 20 years/);
  assert.match(usLesson, /positive long-term average returns/);
  assert.match(usLesson, /loss is still possible/);
  assert.match(usLesson, /Correct!/);
});
