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

test("the short introduction explains growth, risk and a decision before completion", () => {
  assert.deepEqual(Array.from(lesson.WHY_INVEST_STEPS), [
    "welcome",
    "meaning",
    "compound",
    "risk",
    "question",
    "complete",
  ]);
  assert.equal(
    Math.round(lesson.COMPOUND_EXAMPLE.start * 1.1),
    lesson.COMPOUND_EXAMPLE.afterOneYear,
  );
  assert.equal(
    Math.round(lesson.COMPOUND_EXAMPLE.afterOneYear * 1.1),
    lesson.COMPOUND_EXAMPLE.afterTwoYears,
  );
  assert.equal(lesson.COMPOUND_EXAMPLE.start * 0.8, lesson.COMPOUND_EXAMPLE.afterDrop);
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
  assert.match(dashboard, /completed === 0 && !hasCompletedLesson\(progress, INTRO_WORLD, 1\)/);
});

test("the lesson is member-only and saves a single World 0 completion", () => {
  assert.match(page, /requireMember\(\)/);
  assert.match(action, /requireMember\(\)/);
  assert.match(action, /completeLesson\(member\.courseProgress, INTRO_WORLD, 1\)/);
  assert.match(action, /refreshSession\(\)/);
  assert.match(action, /revalidatePath\("\/dashboard\/courses"\)/);
  assert.match(flow, /if \(target === "complete" && !alreadyCompleted\) void saveProgress\(\)/);
  assert.match(component, /progressStatus === "error"/);
  assert.match(component, /feedbackRef\.current\?\.scrollIntoView/);
});

test("both tracks warn that returns and long horizons are uncertain", () => {
  const frLesson = fr.slice(fr.indexOf("  lesson0:"), fr.indexOf("  lesson3:"));
  const usLesson = us.slice(us.indexOf("  lesson0:"), us.indexOf("  lesson3:"));

  assert.match(frLesson, /étudiant/);
  assert.match(frLesson, /fictif/);
  assert.match(frLesson, /Même après dix ans, une perte reste possible/);
  assert.match(usLesson, /student/);
  assert.match(usLesson, /fictional/);
  assert.match(usLesson, /Even after ten years, a loss is possible/);
});
