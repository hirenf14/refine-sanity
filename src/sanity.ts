import { createClient as createSanityClient } from "@sanity/client";

export interface SanityDataProviderConfig {
    projectId: string,
    dataset: string,
    apiVersion?: string,
    secretToken: string
}

const padWithZero = (d: number | string, length: number) => {
    return String(d).padStart(length, "0");
}

const getLatestApiVersion = (): string => {
    // use current date (YYYY-MM-DD) to target the latest API version
    const date = new Date();
    return `${date.getUTCFullYear()}-${padWithZero(date.getUTCMonth(), 2)}-${padWithZero(date.getUTCDate(), 2)}`;

}

export const createClient = (config: SanityDataProviderConfig) => {
    if (!config.secretToken) {
        throw new Error("Sanity Token is required to update content.");
    }
    return createSanityClient({
        projectId: config.projectId,
        dataset: config.dataset,
        useCdn: false, // As this is admin panel, caching should be kept disabled
        apiVersion: config.apiVersion || getLatestApiVersion(),
        token: config.secretToken
    });
}