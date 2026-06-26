import assert from "node:assert/strict";
import { test } from "node:test";
import { createGraphHopper, setApiKey } from "../src/auth.js";
import { client } from "../src/client/client.gen.js";

test("setApiKey installs a string key on the default client", async () => {
  setApiKey("string-key");
  const { auth } = client.getConfig();
  assert.ok(auth);
  assert.equal(await auth(), "string-key");
});

test("setApiKey accepts a resolver function", async () => {
  setApiKey(() => "fn-key");
  const { auth } = client.getConfig();
  assert.ok(auth);
  assert.equal(await auth(), "fn-key");
});

test("createGraphHopper instances are isolated from each other and the singleton", async () => {
  const gh1 = createGraphHopper({ apiKey: "A" });
  const gh2 = createGraphHopper({ apiKey: "B" });
  setApiKey("S");
  const a = gh1.getConfig().auth;
  const b = gh2.getConfig().auth;
  const s = client.getConfig().auth;
  assert.ok(a && b && s);
  assert.equal(await a(), "A");
  assert.equal(await b(), "B");
  assert.equal(await s(), "S");
});
