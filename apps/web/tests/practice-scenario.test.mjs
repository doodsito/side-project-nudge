// Run from the repository root: node --test apps/web/tests/practice-scenario.test.mjs
// Use the existing TypeScript compiler and Node test runner; no new dependency.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

function load(name) {
  const source = readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const compiledModule = { exports: {} };
  runInNewContext(compiled, {
    module: compiledModule,
    exports: compiledModule.exports,
    require: (path) => {
      assert.equal(path, "./practice-case");
      return load("practice-case");
    },
  });
  return compiledModule.exports;
}

const { isCompleteProfile, updateProfile, resolveStep, makeFeedback } = load("practice-scenario");
const { DECISIONS, PRACTICE_CASE } = load("practice-case");
const complete = { horizon: "medium", savings: "some", reaction: "medium", style: "none" };

test("feedback never invents profile facts across all 243 combinations", () => {
  let count = 0;
  for (const horizon of ["short", "medium", "long"])
    for (const savings of ["limited", "some", "strong"])
      for (const reaction of ["low", "medium", "high"])
        for (const style of ["regular", "occasional", "none"])
          for (const { value } of DECISIONS) {
            const profile = { horizon, savings, reaction, style };
            assert.ok(isCompleteProfile(profile));
            const result = makeFeedback(profile, value);
            assert.equal(result.body.includes("within three years"), horizon === "short");
            assert.equal(result.body.includes("less than one month"), savings === "limited");
            assert.equal(result.body.includes("would feel intolerable"), reaction === "low");
            assert.equal(result.close.includes("described a regular routine"), style === "regular");
            assert.equal(
              result.close.includes("described occasional contributions"),
              style === "occasional",
            );
            assert.equal(result.close.includes("do not have a plan yet"), style === "none");
            assert.doesNotMatch(
              result.body,
              /Your horizon is long|stronger savings buffer|regular investing routine/,
            );
            assert.ok(result.title && result.body && result.close);
            count++;
          }
  assert.equal(count, 243);
});

test("the reported medium-horizon / no-plan regression remains truthful", () => {
  const result = makeFeedback(complete, "planned");
  assert.match(result.close, /do not have a plan yet/);
  assert.doesNotMatch(result.title, /consistent with the plan you described/);
  const limited = makeFeedback({ ...complete, savings: "limited", reaction: "high" }, "split");
  assert.match(limited.body, /less than one month/);
  assert.doesNotMatch(limited.body, /intolerable|sensitive response/);
});

test("partial, malformed and mismatched profile answers cannot pass validation", () => {
  for (const invalid of [
    null,
    undefined,
    [],
    {},
    "profile",
    { ...complete, savings: undefined },
    { ...complete, horizon: "regular" },
  ]) {
    assert.equal(isCompleteProfile(invalid), false);
  }
  assert.equal(isCompleteProfile(complete), true);
  assert.equal(updateProfile(complete, "horizon", "regular"), complete);
  assert.equal(updateProfile(complete, "horizon", "long").horizon, "long");
  assert.equal(complete.horizon, "medium");
});

test("navigation guards reject unavailable steps after reset, refresh or replay", () => {
  assert.equal(resolveStep("scenario", {}, null), "scenario");
  for (const step of ["feedback", "summary", "profile"])
    assert.equal(resolveStep(step, {}, null), "scenario");
  assert.equal(resolveStep("summary", complete, null), "scenario");
  assert.equal(resolveStep("feedback", complete, null), "scenario");
  assert.equal(resolveStep("summary", {}, "wait"), "summary");
  assert.equal(resolveStep("profile", {}, "wait"), "profile");
  assert.equal(resolveStep("summary", complete, "wait"), "summary");
  assert.equal(resolveStep("unexpected", complete, "planned"), "scenario");
});

test("each action has a distinct cash consequence and the checkpoint has one explained answer", () => {
  assert.equal(new Set(DECISIONS.map((option) => option.consequence)).size, 3);
  assert.match(DECISIONS.find((option) => option.value === "planned").consequence, /€100 leaves/);
  assert.match(DECISIONS.find((option) => option.value === "wait").consequence, /€200 to €300/);
  assert.match(DECISIONS.find((option) => option.value === "split").consequence, /€250.*€50/);
  assert.equal(PRACTICE_CASE.checkpoint.options.filter((option) => option.correct).length, 1);
  assert.ok(PRACTICE_CASE.checkpoint.options.every((option) => option.explanation));
});
