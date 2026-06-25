# @bradford-tech/graphhopper-sdk

A fully-typed, tree-shakeable TypeScript client for the [GraphHopper Directions API](https://docs.graphhopper.com/), generated from its OpenAPI spec.

## Install

```bash
npm install @bradford-tech/graphhopper-sdk
```

Also works with `pnpm add`, `yarn add`, or `bun add`. From [jsr](https://jsr.io/@bradford-tech/graphhopper-sdk):

```bash
deno add jsr:@bradford-tech/graphhopper-sdk
```

The client is ESM-only and runs on Node 20+, Deno, Bun, and edge runtimes (it uses the platform `fetch`, with no runtime dependencies).

## Usage

Set your API key once on the shared `client`, then call any operation. The base URL (`https://graphhopper.com/api/1`) is preconfigured.

```ts
import { client, getGeocode } from "@bradford-tech/graphhopper-sdk";

client.setConfig({ auth: () => process.env.GRAPHHOPPER_API_KEY });

const { data } = await getGeocode({ query: { q: "Berlin" } });
console.log(data?.hits?.[0]?.point);
// => { lat: 52.5170365, lng: 13.3888599 }
```

Every operation returns `{ data, error, response }` — `data` is the typed response body, `error` is the typed error body on a non-2xx status, and `response` is the raw `Response`. Pass `{ throwOnError: true }` to throw instead.

## Authentication

GraphHopper authenticates with an API key passed as the `key` query parameter. The `auth` callback you set on the client supplies that key for every request:

```ts
client.setConfig({ auth: () => "your-api-key" });
```

The callback runs per request, so it composes with secret managers or rotation. [Sign up](https://graphhopper.com/dashboard/signup) and [create a key](https://support.graphhopper.com/a/solutions/articles/44001976027) to get started. Responses include `X-RateLimit-*` headers describing your remaining credit balance; a `429` means the daily or per-minute limit is exhausted.

## Coverage

All 20 operations from the spec are generated as standalone, tree-shakeable functions — import only what you use.

| Area               | Functions                                                                              |
| ------------------ | -------------------------------------------------------------------------------------- |
| Routing            | `postRoute`, `getRoute`                                                                |
| Matrix             | `postMatrix`, `getMatrix`, `calculateMatrix`, `getMatrixSolution`                      |
| Isochrone          | `getIsochrone`                                                                         |
| Geocoding          | `getGeocode`                                                                           |
| Map Matching       | `postGpx`                                                                              |
| Route Optimization | `solveVrp`, `asyncVrp`, `getSolution`                                                  |
| Clustering         | `solveClusteringProblem`, `asyncClusteringProblem`, `getClusterSolution`               |
| Custom Profiles    | `postProfile`, `getProfile`, `calculateProfile`, `getProfileSolution`, `deleteProfile` |

## More examples

Point arrays are `[longitude, latitude]`, matching the GraphHopper convention.

Route between two points:

```ts
import { postRoute } from "@bradford-tech/graphhopper-sdk";

const { data } = await postRoute({
  body: {
    profile: "car",
    points: [
      [13.388, 52.517], // Berlin
      [13.397, 52.529],
    ],
  },
});

console.log(data?.paths?.[0]?.distance, data?.paths?.[0]?.time);
// => 2675.2 (meters), 327000 (milliseconds)
```

Compute a travel-time matrix between origins and destinations:

```ts
import { postMatrix } from "@bradford-tech/graphhopper-sdk";

const { data } = await postMatrix({
  body: {
    profile: "car",
    from_points: [[13.388, 52.517]],
    to_points: [
      [13.397, 52.529],
      [13.428, 52.523],
    ],
    out_arrays: ["times"],
  },
});

console.log(data?.times);
// => [[327, 681]]  (seconds, one row per origin)
```

## Compared to the official client

GraphHopper publishes [`@graphhopper/directions-api-js-client`](https://www.npmjs.com/package/@graphhopper/directions-api-js-client). The two take different approaches:

|                     | `@bradford-tech/graphhopper-sdk`                     | `@graphhopper/directions-api-js-client`             |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| Source              | Generated from the OpenAPI spec                      | Hand-written JS classes                             |
| Types               | Full TypeScript types for every request and response | None (no `.d.ts`)                                   |
| Module format       | ESM, tree-shakeable per operation                    | Webpack UMD bundle, single import                   |
| Endpoint coverage   | All 8 API areas (20 operations)                      | 6 areas — no Clustering or Custom Profiles          |
| Runtime deps        | None (platform `fetch`)                              | Bundled                                             |
| Convenience helpers | None                                                 | Polyline decoding, turn-sign labels, default params |

If you want typed responses, modern bundling, and the newer endpoints, use this SDK. If you rely on the official client's built-in helpers (such as polyline decoding), it still serves that case well.

## Development

```bash
git clone https://github.com/bradford-tech/graphhopper-sdk.git
cd graphhopper-sdk
npm install
npm run build
```

### Common commands

```bash
npm run generate     # regenerate the client from spec/openapi.json
npm run type-check   # tsc --noEmit
npm run lint         # eslint (zero warnings tolerance)
npm run fix          # prettier + eslint auto-fix, then type-check
```

The client in `src/client` is generated by [`@hey-api/openapi-ts`](https://heyapi.dev) from `spec/openapi.json`. A daily GitHub Actions workflow pulls the latest [GraphHopper spec](https://docs.graphhopper.com/_bundle/openapi.json), regenerates the client, and opens a PR if anything changed.

## Contributing

Bug reports and pull requests are welcome on [GitHub](https://github.com/bradford-tech/graphhopper-sdk).

## License

[MIT](./LICENSE)
