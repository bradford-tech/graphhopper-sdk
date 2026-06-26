import { client } from "./client/client.gen.js";
import {
  type Client,
  createClient,
  createConfig,
} from "./client/client/index.js";

const BASE_URL = "https://graphhopper.com/api/1";

/**
 * Sets the GraphHopper API key on the shared default client. Accepts a string,
 * or a resolver (sync or async) for rotation and secret managers. The resolver
 * runs per request. Overrides any key supplied via `GRAPHHOPPER_API_KEY`.
 */
export function setApiKey(
  key: string | (() => string | Promise<string>),
): void {
  client.setConfig({ auth: typeof key === "function" ? key : () => key });
}

/**
 * Creates an isolated client bound to its own API key. Use this for
 * multi-tenant servers, concurrent requests with different keys, or test
 * isolation — anywhere mutating the shared default client is unsafe. Pass the
 * returned client per call: `getGeocode({ client: gh, query: { q } })`.
 */
export function createGraphHopper(opts: {
  apiKey: string;
  baseUrl?: string;
}): Client {
  return createClient(
    createConfig({
      baseUrl: opts.baseUrl ?? BASE_URL,
      auth: () => opts.apiKey,
    }),
  );
}
