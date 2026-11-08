import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/feedback-audio.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports });

const { feedbackAudioExtension, isFeedbackAudioPath } = compiledModule.exports;

const MEMBER = "11111111-1111-4111-8111-111111111111";
const OTHER = "22222222-2222-4222-8222-222222222222";
const FILE = "33333333-3333-4333-8333-333333333333";

test("only the recorded audio formats get an extension", () => {
  assert.equal(feedbackAudioExtension("audio/webm"), "webm");
  assert.equal(feedbackAudioExtension("audio/mp4"), "mp4");
  assert.equal(feedbackAudioExtension("audio/webm;codecs=opus"), undefined);
  assert.equal(feedbackAudioExtension("text/html"), undefined);
  assert.equal(feedbackAudioExtension("constructor"), undefined);
});

test("an audio path must be a generated file in the member's own folder", () => {
  assert.equal(isFeedbackAudioPath(`${MEMBER}/${FILE}.webm`, MEMBER), true);
  assert.equal(isFeedbackAudioPath(`${MEMBER}/${FILE}.mp4`, MEMBER), true);
  assert.equal(isFeedbackAudioPath(`${OTHER}/${FILE}.webm`, MEMBER), false);
  assert.equal(isFeedbackAudioPath(`${MEMBER}/${FILE}.exe`, MEMBER), false);
  assert.equal(isFeedbackAudioPath(`${MEMBER}/../${OTHER}/${FILE}.webm`, MEMBER), false);
  assert.equal(isFeedbackAudioPath(`${MEMBER}/nested/${FILE}.webm`, MEMBER), false);
  assert.equal(isFeedbackAudioPath(MEMBER, MEMBER), false);
});
