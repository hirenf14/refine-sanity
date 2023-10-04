import { SanityClient } from "@sanity/client";
import { SanityDataProviderConfig, createClient } from "./sanity";

import {
    DataProvider,
  } from "@refinedev/core";
  
class SanityDataProvider implements DataProvider {
    client: SanityClient;
    constructor(config: SanityDataProviderConfig) {
        this.client = createClient(config);
    }
    // Methods to be added
}

export default SanityDataProvider;