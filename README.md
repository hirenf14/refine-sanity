# refine-sanity

[![Build](https://github.com/hirenf14/refine-sanity/actions/workflows/nodejs.yml/badge.svg)](https://github.com/hirenf14/refine-sanity/actions/workflows/nodejs.yml)
[![NPM Version](https://img.shields.io/npm/v/refine-sanity.svg)](https://www.npmjs.com/package/refine-sanity)
[![NPM Downloads](https://img.shields.io/npm/dt/refine-sanity.svg)](https://www.npmjs.com/package/refine-sanity)
[![Github Repo Size](https://img.shields.io/github/repo-size/hirenf14/refine-sanity.svg)](https://github.com/hirenf14/refine-sanity)
[![LICENSE](https://img.shields.io/npm/l/refine-sanity.svg)](https://github.com/hirenf14/refine-sanity/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/hirenf14/refine-sanity.svg)](https://github.com/hirenf14/refine-sanity/graphs/contributors)
[![Commit](https://img.shields.io/github/last-commit/hirenf14/refine-sanity.svg)](https://github.com/hirenf14/refine-sanity/commits/master)


[![npm version](https://badge.fury.io/js/refine-sanity.svg)](https://badge.fury.io/js/refine-sanity)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`refine-sanity` is a data provider for [Refine](https://refine.dev/) that enables seamless integration with [Sanity](https://www.sanity.io/). It simplifies the management of your Sanity data within Refine-powered React applications.

## Installation

Install `refine-sanity` via npm or yarn:

```bash
npm install @sanity/client refine-sanity
# or
yarn add @sanity/client refine-sanity
```

## Usage

```tsx
import dataProvider from "refine-sanity";
import { createClient } from "@sanity/client";

const client = createClient({
    token: "EDITOR_SANITY_ACCESS_TOKEN",
    projectId: "SANITY_PROJECT_ID",
    dataset: "SANITY_DATASET"
});

const App = () => {
  return (
    <Refine
      dataProvider={dataProvider(client)}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};

```


## Documentation
- For more detailed information and usage, refer to [the refine data provider documentation](https://refine.dev/docs/api-reference/core/providers/data-provider/).
- [Refer to documentation for more info about refine](https://refine.dev/docs/)
- [Step up to refine tutorials.](https://refine.dev/docs/tutorial/introduction/index/)