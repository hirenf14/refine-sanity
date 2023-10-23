import { LiveEvent } from "@refinedev/core";

// it converts the Sanity event type to refine live event type
export const liveTypes: Record<string, LiveEvent['type']> = {
  'update': 'updated',
  'appear': 'created',
  'disappear': 'deleted',
  '*': '*',
}