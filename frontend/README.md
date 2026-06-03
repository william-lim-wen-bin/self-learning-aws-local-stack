# frontend

This project is powered by [sku](https://github.com/seek-oss/sku), [braid](https://github.com/seek-oss/braid-design-system) and built with [React](https://facebook.github.io/react).

## Getting Started

First of all, make sure you&#39;ve installed [pnpm](https://pnpm.io/installation).

Then, install dependencies:

```sh
$ pnpm i
```

After that, kindly update the API url in:
```ts
// in frontend/src/constants.ts
export const BASE_API_URL = ...
```

Then, feel free to run the web app with:

```sh
$ pnpm run start
```

## Workflow

Start a local development server:

```sh
$ pnpm run start
```

Run unit tests:

```sh
$ pnpm run test
```

Lint and format code:

```sh
$ pnpm run lint
$ pnpm run format
```

Build assets for production:

```sh
$ pnpm run build
```
