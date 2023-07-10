import { CombinedError } from '@urql/core';
import { createPubSub } from 'graphql-yoga';

export type PubSub = ReturnType<typeof createPubSub>;

export type Context = {
  pubSub: PubSub;
};
