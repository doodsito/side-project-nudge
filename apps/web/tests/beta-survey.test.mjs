import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/beta-survey.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const { parseBetaSurveyAnswers } = compiledModule.exports;

const VALID = {
  device: "mobile",
  disappointment: "very",
  nps: 0,
  appearanceScore: 1,
  coursesScore: 4,
  usefulnessScore: 2,
};

test("the required answers are enough and empty text becomes null", () => {
  const answers = parseBetaSurveyAnswers({ ...VALID, friction: "   ", appearanceWhy: " Joli " });
  assert.equal(answers.nps, 0);
  assert.equal(answers.friction, null);
  assert.equal(answers.appearanceWhy, "Joli");
  assert.equal(answers.overallAudioPath, null);
});

test("a missing or out-of-scale answer is refused", () => {
  assert.equal(parseBetaSurveyAnswers(null), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, device: "fridge" }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, disappointment: undefined }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, nps: 11 }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, nps: "8" }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, appearanceScore: 5 }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, coursesScore: 0 }), null);
});

test("text has a length limit and the overall answer is text or audio, never both", () => {
  assert.equal(parseBetaSurveyAnswers({ ...VALID, friction: "a".repeat(2001) }), null);
  assert.equal(parseBetaSurveyAnswers({ ...VALID, friction: 12 }), null);
  assert.equal(
    parseBetaSurveyAnswers({ ...VALID, overallMessage: "Top", overallAudioPath: "a/b.webm" }),
    null,
  );
  assert.equal(
    parseBetaSurveyAnswers({ ...VALID, overallAudioPath: "a/b.webm" }).overallAudioPath,
    "a/b.webm",
  );
});

test("the friction answer is text or audio, never both", () => {
  assert.equal(
    parseBetaSurveyAnswers({ ...VALID, friction: "Long", frictionAudioPath: "a/b.webm" }),
    null,
  );
  assert.equal(parseBetaSurveyAnswers({ ...VALID, frictionAudioPath: 12 }), null);
  assert.equal(parseBetaSurveyAnswers(VALID).frictionAudioPath, null);
  assert.equal(
    parseBetaSurveyAnswers({ ...VALID, friction: " ", frictionAudioPath: "a/b.webm" })
      .frictionAudioPath,
    "a/b.webm",
  );
});
