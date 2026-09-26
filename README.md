<div align="center">

# Sky configs

**Collection of configs and linters that I use in my projects.**

[![Latest Stable Version](https://img.shields.io/npm/v/@softsky/configs.svg)](https://www.npmjs.com/package/@softsky/configs)
[![NPM Downloads](https://img.shields.io/npm/dm/@softsky/configs.svg)](https://www.npmjs.com/package/@softsky/configs)
[![NPM Downloads](https://img.shields.io/npm/dt/@softsky/configs.svg)](https://www.npmjs.com/package/@softsky/configs)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/minzip/@softsky/configs.svg)](https://www.npmjs.com/package/@softsky/configs)

`npm i -D @softsky/configs`

A bunch of configs for TypeScript environments.
</div>

# Contribute

I don't know why would you want to, but feel free to.

# Setup

## Oxlint

Create `oxlint.config.ts` and put

```ts
import { defineConfig } from "oxlint";
import skyConfig from "@softsky/configs/oxlint.config.js";

export default defineConfig({
  extends: [skyConfig],
});
```

## Oxfmt

Create `oxfmt.config.ts` and put

```ts
import { defineConfig } from "oxfmt";
import skyConfig from "@softsky/configs/oxfmt.config.js";

export default defineConfig({
  ...skyConfig,
});
```

## TSConfig

Create `tsconfig.json` and put

```json
{
  "extends": "@softsky/configs/tsconfig.json"
}
```

Also you can use `@softsky/configs/tsconfig.emit.json` to enable TSC emitting build.

## Prettier

Create `prettier.config.mjs` and put

```js
// @ts-check
import skyPrettierConfig from "@softsky/configs/prettier.config.mjs";

/** @type {import("prettier").Config} */
export default { ...skyPrettierConfig };
```

## Stylelint

Create `stylelint.config.mjs` and put

```js
// @ts-check

/** @type {import("stylelint").Config} */
export default {
  extends: ["@softsky/configs/stylelint.config.mjs"],
};
```
