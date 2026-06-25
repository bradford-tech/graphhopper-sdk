// Type-check smoke test: verify types resolve correctly for consumers.
// Run with: npx tsc --noEmit

import type { GetGeocodeData, Route } from "@bradford-tech/graphhopper-sdk";
import { client, postRoute } from "@bradford-tech/graphhopper-sdk";

// Verify client config accepts auth callback (API key sent as `key` query param)
client.setConfig({
  auth: () => "test-key",
});

// Verify SDK function is callable with correct types
const _call: Promise<unknown> = postRoute();

// Verify data types are accessible
type _RouteType = Route;
type _RequestData = GetGeocodeData;
