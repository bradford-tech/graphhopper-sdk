// Smoke test: verify the published package shape works at runtime.
// Run after: npm pack
//            npm install ../bradford-tech-graphhopper-sdk-*.tgz

import assert from "node:assert/strict";

const sdk = await import("@bradford-tech/graphhopper-sdk");

// Verify key exports exist
assert.equal(
  typeof sdk.postRoute,
  "function",
  "postRoute should be a function",
);
assert.equal(
  typeof sdk.getGeocode,
  "function",
  "getGeocode should be a function",
);
assert.equal(typeof sdk.client, "object", "client should be an object");
assert.equal(
  typeof sdk.client.setConfig,
  "function",
  "client.setConfig should be a function",
);
assert.equal(
  typeof sdk.client.get,
  "function",
  "client.get should be a function",
);
assert.equal(
  typeof sdk.setApiKey,
  "function",
  "setApiKey should be a function",
);
assert.equal(
  typeof sdk.createGraphHopper,
  "function",
  "createGraphHopper should be a function",
);
assert.equal(
  typeof sdk.createGraphHopper({ apiKey: "test-key" }).get,
  "function",
  "createGraphHopper(...) should return a client",
);

console.log(
  "Smoke test passed: all exports present and correctly typed at runtime.",
);
