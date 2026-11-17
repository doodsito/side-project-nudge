import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const source = read("../src/lib/investment-basics-lesson.ts");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const {
  CORRECT_OPTIONS,
  INVESTMENT_BASICS_STEPS,
  MATCHING_ANSWERS,
  MATCHING_ITEMS,
  QUESTION_OPTIONS,
  newQuestionOrder,
  shuffleOptions,
} = compiledModule.exports;

test("the six steps and every answer use stable semantic identifiers", () => {
  assert.deepEqual(Array.from(INVESTMENT_BASICS_STEPS), [
    "hook",
    "discovery",
    "mechanisms",
    "matching",
    "value",
    "quiz",
  ]);
  for (const [question, options] of Object.entries(QUESTION_OPTIONS)) {
    assert.equal(options.length, 3);
    assert.equal(new Set(options).size, 3);
    assert.ok(options.includes(CORRECT_OPTIONS[question]));
  }
  assert.deepEqual(
    Array.from(MATCHING_ITEMS).map((item) => MATCHING_ANSWERS[item]),
    ["own", "lend", "fund"],
  );
});

test("Fisher–Yates reaches all six orders with equal position opportunities", () => {
  const seen = new Set();
  const positions = [0, 0, 0];
  for (let first = 0; first < 3; first++) {
    for (let second = 0; second < 2; second++) {
      const draws = [first / 3, second / 2];
      const order = shuffleOptions(["right", "b", "c"], () => draws.shift());
      seen.add(order.join(","));
      positions[order.indexOf("right")]++;
    }
  }
  assert.equal(seen.size, 6);
  assert.deepEqual(positions, [2, 2, 2]);
});

test("new attempts draw independently, keep source options intact and allow repeats", () => {
  const sourceOptions = ["right", "b", "c"];
  const first = shuffleOptions(sourceOptions, () => 0);
  const second = shuffleOptions(sourceOptions, () => 0);
  assert.deepEqual(sourceOptions, ["right", "b", "c"]);
  assert.notEqual(first, sourceOptions);
  assert.deepEqual(first, second); // no forced balancing across attempts

  let draw = 0;
  const draws = [0, 0, 0.99, 0.99, ...Array(6).fill(0.5)];
  const attemptA = newQuestionOrder(() => draws[draw++]);
  const attemptB = newQuestionOrder(() => 0.5);
  assert.equal(Object.keys(attemptA).length, 5);
  assert.equal(Object.keys(attemptB).length, 5);
  for (const question of Object.keys(QUESTION_OPTIONS)) {
    assert.deepEqual([...attemptA[question]].sort(), [...QUESTION_OPTIONS[question]].sort());
  }
});

test("V2 access requires an isolated opt-in and rejects production", () => {
  const accessSource = read("../src/lib/v2-lesson-access.ts");
  const accessCode = ts.transpileModule(accessSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  function accessWith(env) {
    const accessModule = { exports: {} };
    runInNewContext(accessCode, {
      module: accessModule,
      exports: accessModule.exports,
      require: () => undefined,
      process: { env },
    });
    return accessModule.exports.canUseV2Lessons();
  }
  assert.equal(accessWith({ V2_LESSONS_ENABLED: "true" }), false);
  assert.equal(accessWith({ V2_LESSONS_ENABLED: "true", V2_DATA_ISOLATED: "true" }), true);
  assert.equal(
    accessWith({
      VERCEL_ENV: "production",
      V2_LESSONS_ENABLED: "true",
      V2_DATA_ISOLATED: "true",
    }),
    false,
  );
});

test("the lesson remains hidden from beta and never saves from its local preview", () => {
  const route = read("../src/app/lessons/investment-basics/page.tsx");
  const action = read("../src/app/lessons/investment-basics/actions.ts");
  const preview = read("../src/app/dev/investment-basics-preview/page.tsx");
  const flow = read("../src/app/lessons/investment-basics/investment-basics-flow.tsx");
  assert.match(route, /requireMember\(\)/);
  assert.match(route, /canUseV2Lessons\(\)/);
  assert.match(action, /requireMember\(\)/);
  assert.match(action, /canUseV2Lessons\(\)/);
  assert.match(action, /hasCompletedLesson\(member\.courseProgress, FOUNDATION_WORLD, 8\)/);
  assert.match(preview, /NODE_ENV !== "development"/);
  assert.match(preview, /localhost/);
  assert.match(flow, /if \(!preview\) void saveProgress\(\)/);
});
