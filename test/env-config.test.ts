import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { setApiKey } from "../src/auth.js";
import { client } from "../src/client/client.gen.js";

// Captured before any test mutates the shared singleton: the env-reading
// resolver installed at client init, and the ambient env value. Restoring both
// in beforeEach makes each test order-independent instead of relying on
// process-per-file isolation.
const defaultAuth = client.getConfig().auth;
const originalEnv = process.env.GRAPHHOPPER_API_KEY;

beforeEach(() => {
  client.setConfig({ auth: defaultAuth });
  if (originalEnv === undefined) {
    delete process.env.GRAPHHOPPER_API_KEY;
  } else {
    process.env.GRAPHHOPPER_API_KEY = originalEnv;
  }
});

test("GRAPHHOPPER_API_KEY supplies the default key", async () => {
  process.env.GRAPHHOPPER_API_KEY = "env-key";
  const { auth } = client.getConfig();
  assert.ok(auth);
  assert.equal(await auth(), "env-key");
});

test("setApiKey overrides the environment variable", async () => {
  process.env.GRAPHHOPPER_API_KEY = "env-key";
  setApiKey("explicit-key");
  const { auth } = client.getConfig();
  assert.ok(auth);
  assert.equal(await auth(), "explicit-key");
});
