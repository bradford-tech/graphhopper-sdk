import type { CreateClientConfig } from "./client/client.gen.js";
import { readApiKeyFromEnv } from "./env.js";

/**
 * Runtime configuration hook wired via `runtimeConfigPath` in
 * `openapi-ts.config.ts`. Called once on client initialization; installs a
 * default `auth` resolver that reads `GRAPHHOPPER_API_KEY` from the
 * environment, so the SDK authenticates with zero configuration when the
 * variable is set. The read is lazy (per request); `setApiKey()` replaces this
 * resolver entirely, so an explicit key always wins.
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  auth: () => readApiKeyFromEnv(),
});
