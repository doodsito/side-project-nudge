import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/course-progress.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  FOUNDATION_WORLD,
  completeLesson,
  completedLessonCount,
  hasCompletedLesson,
  readCourseProgress,
} = compiledModule.exports;

test("invalid account metadata starts with empty course progress", () => {
  assert.equal(Object.keys(readCourseProgress(null).completedLessons).length, 0);
  assert.equal(
    Object.keys(readCourseProgress({ completedLessons: "lesson-1" }).completedLessons).length,
    0,
  );
});

test("stored progress keeps only unique positive lesson numbers", () => {
  const progress = readCourseProgress({
    completedLessons: { [FOUNDATION_WORLD]: [1, 1, -2, "2", 3] },
  });

  assert.deepEqual(Array.from(progress.completedLessons[FOUNDATION_WORLD]), [1, 3]);
});

test("completing lesson one is persistent, ordered and idempotent", () => {
  const initial = readCourseProgress({ completedLessons: { [FOUNDATION_WORLD]: [2] } });
  const completed = completeLesson(initial, FOUNDATION_WORLD, 1);
  const repeated = completeLesson(completed, FOUNDATION_WORLD, 1);

  assert.deepEqual(Array.from(completed.completedLessons[FOUNDATION_WORLD]), [1, 2]);
  assert.equal(repeated, completed);
  assert.equal(hasCompletedLesson(completed, FOUNDATION_WORLD, 1), true);
  assert.equal(completedLessonCount(completed, FOUNDATION_WORLD), 2);
});

test("lesson two adds to lesson one and unlocks the third step", () => {
  const afterOne = completeLesson(readCourseProgress(null), FOUNDATION_WORLD, 1);
  const afterTwo = completeLesson(afterOne, FOUNDATION_WORLD, 2);
  const repeated = completeLesson(afterTwo, FOUNDATION_WORLD, 2);

  assert.equal(completedLessonCount(afterOne, FOUNDATION_WORLD), 1);
  assert.equal(hasCompletedLesson(afterOne, FOUNDATION_WORLD, 1), true);
  assert.equal(hasCompletedLesson(afterOne, FOUNDATION_WORLD, 2), false);
  assert.deepEqual(Array.from(afterTwo.completedLessons[FOUNDATION_WORLD]), [1, 2]);
  assert.equal(completedLessonCount(afterTwo, FOUNDATION_WORLD), 2);
  assert.equal(hasCompletedLesson(afterTwo, FOUNDATION_WORLD, 1), true);
  assert.equal(hasCompletedLesson(afterTwo, FOUNDATION_WORLD, 2), true);
  assert.equal(hasCompletedLesson(afterTwo, FOUNDATION_WORLD, 3), false);
  assert.equal(repeated, afterTwo);
});

test("lesson three saves 3/8 progress and unlocks lesson four", () => {
  const afterOne = completeLesson(readCourseProgress(null), FOUNDATION_WORLD, 1);
  const afterTwo = completeLesson(afterOne, FOUNDATION_WORLD, 2);
  const afterThree = completeLesson(afterTwo, FOUNDATION_WORLD, 3);

  assert.equal(completedLessonCount(afterThree, FOUNDATION_WORLD), 3);
  assert.equal(hasCompletedLesson(afterThree, FOUNDATION_WORLD, 3), true);
  assert.equal(hasCompletedLesson(afterThree, FOUNDATION_WORLD, 4), false);
});

test("lesson four saves 4/8 progress and unlocks lesson five", () => {
  const afterOne = completeLesson(readCourseProgress(null), FOUNDATION_WORLD, 1);
  const afterTwo = completeLesson(afterOne, FOUNDATION_WORLD, 2);
  const afterThree = completeLesson(afterTwo, FOUNDATION_WORLD, 3);
  const afterFour = completeLesson(afterThree, FOUNDATION_WORLD, 4);

  assert.equal(completedLessonCount(afterFour, FOUNDATION_WORLD), 4);
  assert.equal(hasCompletedLesson(afterFour, FOUNDATION_WORLD, 4), true);
  assert.equal(hasCompletedLesson(afterFour, FOUNDATION_WORLD, 5), false);
  assert.deepEqual(Array.from(afterFour.completedLessons[FOUNDATION_WORLD]), [1, 2, 3, 4]);
});

test("lesson five saves 5/8 progress and unlocks lesson six", () => {
  const afterOne = completeLesson(readCourseProgress(null), FOUNDATION_WORLD, 1);
  const afterTwo = completeLesson(afterOne, FOUNDATION_WORLD, 2);
  const afterThree = completeLesson(afterTwo, FOUNDATION_WORLD, 3);
  const afterFour = completeLesson(afterThree, FOUNDATION_WORLD, 4);
  const afterFive = completeLesson(afterFour, FOUNDATION_WORLD, 5);

  assert.equal(completedLessonCount(afterFive, FOUNDATION_WORLD), 5);
  assert.equal(hasCompletedLesson(afterFive, FOUNDATION_WORLD, 5), true);
  assert.equal(hasCompletedLesson(afterFive, FOUNDATION_WORLD, 6), false);
  assert.deepEqual(Array.from(afterFive.completedLessons[FOUNDATION_WORLD]), [1, 2, 3, 4, 5]);
});
