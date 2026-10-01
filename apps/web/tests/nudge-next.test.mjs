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
  const result = { exports: {} };
  runInNewContext(compiled, {
    module: result,
    exports: result.exports,
    require: (path) => {
      assert.ok(["./brand", "./practice-case"].includes(path));
      return load(path.slice(2));
    },
  });
  return result.exports;
}

const { caseResult, formatters, nudgeCopy } = load("nudge-next-copy");

test("a contribution never becomes a market return", () => {
  for (const [choice, expected] of [
    [null, 9000],
    ["wait", 9000],
    ["planned", 9500],
    ["more", 10000],
  ]) {
    const result = caseResult(choice);
    assert.equal(result.afterFall, 9000);
    assert.equal(result.total, expected);
    assert.equal(result.total - result.added, 9000);
  }
});

test("French covers every English copy key, including nested topics and choices", () => {
  function compare(en, fr, path = "") {
    assert.deepEqual(Object.keys(en), Object.keys(fr), path);
    for (const key of Object.keys(en)) {
      if (typeof en[key] === "object") compare(en[key], fr[key], `${path}.${key}`);
      else assert.ok(typeof fr[key] === "string" && fr[key].length > 0, `${path}.${key}`);
    }
  }
  compare(nudgeCopy.en, nudgeCopy.fr);
});

test("case amounts are interpolated in the selected locale", () => {
  const en = formatters("en");
  const fr = formatters("fr");
  assert.equal(en.money(9500), "€9,500");
  assert.match(fr.money(9500), /9\s500\s€/u);
  assert.match(fr.percent(-0.1), /-10\s%/u);
  for (const locale of ["en", "fr"]) {
    const formatted = formatters(locale).interpolate(nudgeCopy[locale].caseBody);
    assert.ok(!formatted.includes("{"));
    assert.ok(formatted.includes(formatters(locale).money(10000)));
  }
});
