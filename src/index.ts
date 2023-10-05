import { SanityClient } from "@sanity/client";

import {
    DataProvider,
  } from "@refinedev/core";
  
class SanityDataProvider<T> implements DataProvider<T> {
    constructor(private client: SanityClient) {
    }
}

export default SanityDataProvider;