import assert from "node:assert/strict";
import { test } from "node:test";
import { readApiKeyFromEnv } from "../src/env.js";

test("returns the key when process.env has it", () => {
  const scope = { process: { env: { GRAPHHOPPER_API_KEY: "abc" } } };
  assert.equal(readApiKeyFromEnv(scope), "abc");
});

test("returns undefined and does not throw when process is absent", () => {
  assert.doesNotThrow(() => readApiKeyFromEnv({}));
  assert.equal(readApiKeyFromEnv({}), undefined);
});

test("returns undefined when the variable is unset", () => {
  assert.equal(readApiKeyFromEnv({ process: { env: {} } }), undefined);
});
