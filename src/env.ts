interface EnvScope {
  process?: { env?: Record<string, string | undefined> };
}

/**
 * Reads the GraphHopper API key from the environment, if present.
 *
 * `scope` is injectable for testing and defaults to `globalThis`. Using
 * optional chaining means this degrades to `undefined` on runtimes where
 * `process` is not defined (browsers, some edge runtimes) instead of throwing.
 */
export function readApiKeyFromEnv(
  scope: EnvScope = globalThis as unknown as EnvScope,
): string | undefined {
  return scope.process?.env?.GRAPHHOPPER_API_KEY;
}
