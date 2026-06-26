// Type-check smoke test: verify types resolve correctly for consumers.
// Run with: npx tsc --noEmit

import type { GetGeocodeData, Route } from "@bradford-tech/graphhopper-sdk";
import {
  createGraphHopper,
  postRoute,
  setApiKey,
} from "@bradford-tech/graphhopper-sdk";

// Verify the public auth helpers resolve with correct types
setApiKey("test-key");
setApiKey(() => "test-key");
const _gh = createGraphHopper({ apiKey: "test-key" });

// Verify SDK function is callable with correct types
const _call: Promise<unknown> = postRoute();

// Verify data types are accessible
type _RouteType = Route;
type _RequestData = GetGeocodeData;
